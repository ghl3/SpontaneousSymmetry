#!/usr/bin/env python3
"""
Convert the Connect Four TensorFlow 1.x checkpoint to TensorFlow.js format.

This script recreates the exact model architecture from the checkpoint
and loads the trained weights.

Usage:
    cd /path/to/SpontaneousSymmetry
    source venv/bin/activate
    python scripts/convert_connectfour_model.py
"""

import os
import numpy as np

# Suppress TF warnings
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'

import tensorflow as tf
from tensorflow import keras
from tensorflow.keras.layers import (
    Input, Dense, Reshape, Conv2D, Flatten, Concatenate
)
from tensorflow.keras.models import Model


def build_model():
    """
    Recreate the exact architecture from the checkpoint.
    
    Based on the checkpoint variable shapes:
    - conv2d_1: [5, 5, 1, 12]
    - conv2d_2: [4, 4, 1, 12]
    - conv2d_3: [3, 3, 1, 12]
    - conv2d_4: [6, 1, 1, 8]
    - conv2d_5: [1, 6, 1, 8]
    - conv2d_6: [4, 2, 1, 8]
    - conv2d_7: [2, 4, 1, 8]
    - conv2d_8: [5, 3, 1, 8]
    - conv2d_9: [3, 5, 1, 8]
    - conv2d_10: [1, 4, 1, 4]
    - conv2d_11: [4, 1, 1, 4]
    - conv2d_12: [2, 2, 1, 4]
    - dense_1: [1388, 512] (conv branch)
    - dense_2: [512, 256] (conv branch)
    - dense_3: [42, 512] (direct branch)
    - dense_4: [512, 256] (direct branch)
    - dense_5: [512, 128] (combined)
    - dense_6: [128, 48] (combined)
    - dense_7: [48, 12] (combined)
    - preds: [12, 3]
    """
    
    # Input layer - flattened board (7 columns x 6 rows = 42)
    board_input = Input(shape=(42,), name='board')
    
    # Reshape for convolutions: (7, 6, 1) - columns x rows x channels
    rs = Reshape((7, 6, 1))(board_input)
    
    # Convolution settings
    conv_kwargs = {
        'activation': 'relu',
        'padding': 'valid',
        'kernel_initializer': 'random_uniform',
        'bias_initializer': 'zeros',
    }
    
    # Convolutions matching checkpoint exactly (using name= to help with weight loading)
    c1 = Flatten()(Conv2D(12, kernel_size=(5, 5), name='conv2d_1', **conv_kwargs)(rs))   # output: (3, 2, 12) -> 72
    c2 = Flatten()(Conv2D(12, kernel_size=(4, 4), name='conv2d_2', **conv_kwargs)(rs))   # output: (4, 3, 12) -> 144
    c3 = Flatten()(Conv2D(12, kernel_size=(3, 3), name='conv2d_3', **conv_kwargs)(rs))   # output: (5, 4, 12) -> 240
    c4 = Flatten()(Conv2D(8, kernel_size=(6, 1), name='conv2d_4', **conv_kwargs)(rs))    # output: (2, 6, 8) -> 96
    c5 = Flatten()(Conv2D(8, kernel_size=(1, 6), name='conv2d_5', **conv_kwargs)(rs))    # output: (7, 1, 8) -> 56
    c6 = Flatten()(Conv2D(8, kernel_size=(4, 2), name='conv2d_6', **conv_kwargs)(rs))    # output: (4, 5, 8) -> 160
    c7 = Flatten()(Conv2D(8, kernel_size=(2, 4), name='conv2d_7', **conv_kwargs)(rs))    # output: (6, 3, 8) -> 144
    c8 = Flatten()(Conv2D(8, kernel_size=(5, 3), name='conv2d_8', **conv_kwargs)(rs))    # output: (3, 4, 8) -> 96
    c9 = Flatten()(Conv2D(8, kernel_size=(3, 5), name='conv2d_9', **conv_kwargs)(rs))    # output: (5, 2, 8) -> 80
    c10 = Flatten()(Conv2D(4, kernel_size=(1, 4), name='conv2d_10', **conv_kwargs)(rs))  # output: (7, 3, 4) -> 84
    c11 = Flatten()(Conv2D(4, kernel_size=(4, 1), name='conv2d_11', **conv_kwargs)(rs))  # output: (4, 6, 4) -> 96
    c12 = Flatten()(Conv2D(4, kernel_size=(2, 2), name='conv2d_12', **conv_kwargs)(rs))  # output: (6, 5, 4) -> 120
    
    # Total conv output: 72+144+240+96+56+160+144+96+80+84+96+120 = 1388 ✓
    
    # Concatenate all conv outputs
    conv_combined = Concatenate()([c1, c2, c3, c4, c5, c6, c7, c8, c9, c10, c11, c12])
    
    dense_kwargs = {
        'activation': 'relu',
        'kernel_initializer': 'random_uniform',
        'bias_initializer': 'zeros',
    }
    
    # Conv branch dense layers
    cd1 = Dense(512, name='dense_1', **dense_kwargs)(conv_combined)  # [1388, 512]
    cd2 = Dense(256, name='dense_2', **dense_kwargs)(cd1)            # [512, 256]
    
    # Direct branch dense layers
    d1 = Dense(512, name='dense_3', **dense_kwargs)(board_input)     # [42, 512]
    d2 = Dense(256, name='dense_4', **dense_kwargs)(d1)              # [512, 256]
    
    # Combine both branches
    combined = Concatenate()([cd2, d2])  # 256 + 256 = 512
    
    # Final dense layers
    x = Dense(128, name='dense_5', **dense_kwargs)(combined)  # [512, 128]
    x = Dense(48, name='dense_6', **dense_kwargs)(x)          # [128, 48]
    x = Dense(12, name='dense_7', **dense_kwargs)(x)          # [48, 12]
    
    # Output: probabilities for [win, lose, draw]
    preds = Dense(3, activation='softmax', name='preds')(x)   # [12, 3]
    
    model = Model(inputs=board_input, outputs=preds)
    return model


def load_weights_from_checkpoint(model, checkpoint_path):
    """
    Load weights from TF1 checkpoint into the Keras model.
    """
    
    # Read checkpoint
    reader = tf.train.load_checkpoint(checkpoint_path)
    var_to_shape_map = reader.get_variable_to_shape_map()
    
    print("\nLoading weights by layer name matching...")
    
    weights_loaded = 0
    
    for layer in model.layers:
        if not layer.weights:
            continue
        
        layer_name = layer.name
        layer_weights = []
        all_found = True
        
        for weight in layer.weights:
            weight_type = 'kernel' if 'kernel' in weight.name else 'bias'
            ckpt_var_name = f"{layer_name}/{weight_type}"
            
            if ckpt_var_name in var_to_shape_map:
                tensor = reader.get_tensor(ckpt_var_name)
                layer_weights.append(tensor)
                weights_loaded += 1
                print(f"  ✓ {ckpt_var_name}: {tensor.shape}")
            else:
                print(f"  ✗ {ckpt_var_name}: NOT FOUND")
                all_found = False
                layer_weights.append(weight.numpy())
        
        if all_found:
            layer.set_weights(layer_weights)
    
    print(f"\nLoaded {weights_loaded} weight tensors from checkpoint")
    return weights_loaded > 0


def main():
    # Paths
    model_dir = "apps/connectfour/models/gen2-cov2d_beta_2017_11_05_114919"
    output_dir = "public/models/connectfour"
    
    print(f"Building model architecture...")
    model = build_model()
    model.summary()
    
    print(f"\nLoading weights from: {model_dir}")
    checkpoint_path = os.path.join(model_dir, "model")
    
    success = load_weights_from_checkpoint(model, checkpoint_path)
    
    if not success:
        print("\nERROR: Could not load weights properly.")
        return
    
    # Create output directory
    os.makedirs(output_dir, exist_ok=True)
    
    # Save as TF SavedModel format first
    saved_model_path = os.path.join(output_dir, "saved_model")
    print(f"\nSaving model to SavedModel format: {saved_model_path}")
    model.export(saved_model_path)
    
    # Convert SavedModel to TensorFlow.js graph model format
    print(f"\nConverting to TensorFlow.js format: {output_dir}")
    
    try:
        import subprocess
        result = subprocess.run([
            'tensorflowjs_converter',
            '--input_format=tf_saved_model',
            '--output_format=tfjs_graph_model',
            '--signature_name=serving_default',
            saved_model_path,
            output_dir
        ], capture_output=True, text=True)
        
        if result.returncode != 0:
            print(f"Converter output: {result.stdout}")
            print(f"Converter error: {result.stderr}")
            raise Exception(result.stderr)
        
        print("Conversion complete!")
        print(f"Model saved to: {output_dir}")
        
        # Remove the SavedModel directory
        import shutil
        shutil.rmtree(saved_model_path)
        
        # List output files
        print("\nOutput files:")
        for f in sorted(os.listdir(output_dir)):
            fpath = os.path.join(output_dir, f)
            size = os.path.getsize(fpath)
            print(f"  {f}: {size:,} bytes")
            
    except Exception as e:
        print(f"Error during TF.js conversion: {e}")
        import traceback
        traceback.print_exc()
        print(f"\nSavedModel saved to: {saved_model_path}")
        print("You can try converting manually with:")
        print(f"  tensorflowjs_converter --input_format=tf_saved_model --output_format=tfjs_graph_model {saved_model_path} {output_dir}")


if __name__ == "__main__":
    main()

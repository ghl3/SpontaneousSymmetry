#!/usr/bin/env python3
"""
Script to convert the TensorFlow 1.x checkpoint to TensorFlow.js format.

Prerequisites:
    pip install tensorflow tensorflowjs

Usage:
    python scripts/convert_tf_model.py

This will:
1. Load the TensorFlow checkpoint from apps/connectfour/models/
2. Export it as a SavedModel
3. Convert to TensorFlow.js format in public/models/connectfour/
"""

import os
import sys
import shutil

# Add the project root to path so we can import alphafour
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

def main():
    try:
        import tensorflow as tf
        import tensorflowjs as tfjs
    except ImportError:
        print("Error: Please install tensorflow and tensorflowjs")
        print("  pip install tensorflow tensorflowjs")
        sys.exit(1)

    # Paths
    model_dir = "apps/connectfour/models/gen2-cov2d_beta_2017_11_05_114919"
    output_dir = "public/models/connectfour"
    temp_saved_model = "temp_saved_model"

    print(f"Loading model from: {model_dir}")

    # Create output directory
    os.makedirs(output_dir, exist_ok=True)

    try:
        # Try to load using the alphafour package
        from alphafour import ai
        
        # Load the model
        model = ai.load_model(model_name=model_dir)
        
        # Get the underlying Keras model if available
        if hasattr(model, 'model'):
            keras_model = model.model
        else:
            print("Cannot extract Keras model from loaded model")
            print("You may need to manually load and convert the checkpoint")
            sys.exit(1)
        
        # Save as TensorFlow.js
        print(f"Converting to TensorFlow.js format: {output_dir}")
        tfjs.converters.save_keras_model(keras_model, output_dir)
        
        print("Conversion complete!")
        print(f"Model saved to: {output_dir}")
        
    except ImportError:
        print("alphafour package not found. Attempting direct checkpoint loading...")
        
        # Try direct checkpoint loading (TF1-style)
        try:
            # This is a fallback approach - may need adjustment based on model structure
            print("Note: Direct checkpoint loading requires knowing the model architecture.")
            print("Please ensure the alphafour package is installed:")
            print("  pip install -e git+https://github.com/ghl3/AlphaFour.git#egg=AlphaFour")
            sys.exit(1)
            
        except Exception as e:
            print(f"Error loading checkpoint: {e}")
            sys.exit(1)
    
    except Exception as e:
        print(f"Error during conversion: {e}")
        import traceback
        traceback.print_exc()
        sys.exit(1)
    
    finally:
        # Clean up temp directory
        if os.path.exists(temp_saved_model):
            shutil.rmtree(temp_saved_model)


if __name__ == "__main__":
    main()



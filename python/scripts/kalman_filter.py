#!/usr/bin/env python3
"""
Kalman Filter demonstration for tracking position and velocity.

This script demonstrates how a Kalman Filter can be used to estimate
the true state (position and velocity) from noisy measurements. It
generates synthetic data, runs the filter, and produces a visualization.

Referenced by blog post: posts/2018-05-02-filter.markdown

Output: python/output/kalman_filter.png
"""

import os
import math
import numpy as np
import matplotlib.pyplot as plt
from dataclasses import dataclass
from typing import List, Tuple

# Output directory
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
OUTPUT_DIR = os.path.join(SCRIPT_DIR, '..', 'output')


@dataclass
class KalmanState:
    """State of the Kalman Filter at a given time step."""
    time: int
    position: float
    position_std: float
    velocity: float
    velocity_std: float


class KalmanFilter:
    """
    Simple Kalman Filter for tracking position and velocity.
    
    State vector: [position, velocity]
    Dynamics: position_{t+1} = position_t + velocity_t * dt
              velocity_{t+1} = velocity_t  (constant velocity model)
    """
    
    def __init__(self, prior_std: float = 1000.0):
        """Initialize with a diffuse prior (high uncertainty)."""
        self.mu = np.zeros((2, 1))  # [position, velocity]
        self.sigma = np.eye(2) * prior_std**2
    
    def predict(self, dt: float) -> None:
        """Predict step: propagate state forward in time."""
        # Transition matrix for constant velocity model
        T = np.array([
            [1.0, dt],
            [0.0, 1.0]
        ])
        
        self.mu = T @ self.mu
        self.sigma = T @ self.sigma @ T.T
    
    def update(self, measurement: np.ndarray, measurement_cov: np.ndarray) -> None:
        """Update step: incorporate new measurement."""
        # Kalman gain
        S = self.sigma + measurement_cov
        K = self.sigma @ np.linalg.inv(S)
        
        # Update state
        innovation = measurement - self.mu
        self.mu = self.mu + K @ innovation
        self.sigma = (np.eye(2) - K) @ self.sigma
    
    def get_state(self, time: int) -> KalmanState:
        """Get current state as a KalmanState object."""
        return KalmanState(
            time=time,
            position=self.mu[0, 0],
            position_std=math.sqrt(self.sigma[0, 0]),
            velocity=self.mu[1, 0],
            velocity_std=math.sqrt(self.sigma[1, 1])
        )


def generate_data(
    n_steps: int = 24,
    dt: float = 1.0,
    initial_position: float = 0.0,
    initial_velocity: float = 2.0,
    position_noise_std: float = 5.0,
    velocity_noise_std: float = 8.0,
    seed: int = 42
) -> Tuple[List[Tuple], List[Tuple]]:
    """
    Generate synthetic truth and noisy measurements.
    
    Returns:
        truth: List of (time, dt, position, velocity) tuples
        measurements: List of (time, dt, measured_pos, pos_std, measured_vel, vel_std) tuples
    """
    np.random.seed(seed)
    
    truth = []
    measurements = []
    
    for i in range(1, n_steps + 1):
        # True state (constant velocity motion)
        true_pos = initial_position + initial_velocity * i
        true_vel = initial_velocity
        truth.append((i, dt, true_pos, true_vel))
        
        # Noisy measurements
        measured_pos = true_pos + np.random.normal(0, position_noise_std)
        measured_vel = true_vel + np.random.normal(0, velocity_noise_std)
        measurements.append((i, dt, measured_pos, position_noise_std, measured_vel, velocity_noise_std))
    
    return truth, measurements


def run_filter(measurements: List[Tuple]) -> List[KalmanState]:
    """Run Kalman Filter on measurements and return inferred states."""
    kf = KalmanFilter()
    
    # Record initial state
    states = [kf.get_state(0)]
    
    for i, dt, measured_pos, pos_std, measured_vel, vel_std in measurements:
        # Predict step
        kf.predict(dt)
        
        # Update step with measurement
        measurement = np.array([[measured_pos], [measured_vel]])
        measurement_cov = np.array([
            [pos_std**2, 0],
            [0, vel_std**2]
        ])
        kf.update(measurement, measurement_cov)
        
        # Record state
        states.append(kf.get_state(i))
        print(f"{i}: X={kf.mu[0,0]:.2f} (±{math.sqrt(kf.sigma[0,0]):.2f}) "
              f"V={kf.mu[1,0]:.2f} (±{math.sqrt(kf.sigma[1,1]):.2f})")
    
    return states


def plot_results(
    truth: List[Tuple],
    measurements: List[Tuple],
    inferred: List[KalmanState],
    output_path: str
) -> None:
    """Create visualization comparing measurements, filter output, and truth."""
    fig, axes = plt.subplots(1, 2, figsize=(14, 6))
    
    # Left plot: Position
    ax = axes[0]
    
    # Measured positions with error bars
    times = [m[0] for m in measurements]
    positions = [m[2] for m in measurements]
    pos_errors = [m[3] for m in measurements]
    ax.errorbar(times, positions, yerr=pos_errors, fmt='o', alpha=0.4,
                color='black', label='Measured', capsize=3)
    
    # Filtered positions with uncertainty band
    inf_times = [s.time for s in inferred]
    inf_pos = [s.position for s in inferred]
    inf_pos_std = [s.position_std for s in inferred]
    ax.fill_between(inf_times,
                    [p - s for p, s in zip(inf_pos, inf_pos_std)],
                    [p + s for p, s in zip(inf_pos, inf_pos_std)],
                    alpha=0.5, label='Filtered ±1σ')
    ax.plot(inf_times, inf_pos, 'b-', linewidth=1.5)
    
    # True positions
    true_times = [t[0] for t in truth]
    true_pos = [t[2] for t in truth]
    ax.plot(true_times, true_pos, 'g-', linewidth=2, label='Truth')
    
    ax.set_xlabel('Time')
    ax.set_ylabel('Position')
    ax.set_title('Position Tracking')
    ax.legend(loc='best')
    ax.grid(True, alpha=0.3)
    
    # Right plot: Velocity
    ax = axes[1]
    
    # Measured velocities with error bars
    velocities = [m[4] for m in measurements]
    vel_errors = [m[5] for m in measurements]
    ax.errorbar(times, velocities, yerr=vel_errors, fmt='o', alpha=0.4,
                color='black', label='Measured', capsize=3)
    
    # Filtered velocities with uncertainty band
    inf_vel = [s.velocity for s in inferred]
    inf_vel_std = [s.velocity_std for s in inferred]
    ax.fill_between(inf_times,
                    [v - s for v, s in zip(inf_vel, inf_vel_std)],
                    [v + s for v, s in zip(inf_vel, inf_vel_std)],
                    alpha=0.5, label='Filtered ±1σ')
    ax.plot(inf_times, inf_vel, 'b-', linewidth=1.5)
    
    # True velocity
    true_vel = [t[3] for t in truth]
    ax.plot(true_times, true_vel, 'g-', linewidth=2, label='Truth')
    
    ax.set_xlabel('Time')
    ax.set_ylabel('Velocity')
    ax.set_title('Velocity Tracking')
    ax.legend(loc='best')
    ax.grid(True, alpha=0.3)
    
    plt.tight_layout()
    plt.savefig(output_path, dpi=150, bbox_inches='tight')
    print(f"\nSaved plot to: {output_path}")


def main():
    """Run the Kalman Filter demonstration."""
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    
    print("Kalman Filter Demonstration")
    print("=" * 50)
    print("\nGenerating synthetic data...")
    
    truth, measurements = generate_data()
    
    print("\nRunning Kalman Filter...")
    print("-" * 50)
    inferred = run_filter(measurements)
    
    print("\n" + "=" * 50)
    print("The filter converges: velocity uncertainty drops from")
    print(f"±{inferred[0].velocity_std:.2f} to ±{inferred[-1].velocity_std:.2f}")
    
    output_path = os.path.join(OUTPUT_DIR, "kalman_filter.png")
    plot_results(truth, measurements, inferred, output_path)


if __name__ == '__main__':
    main()


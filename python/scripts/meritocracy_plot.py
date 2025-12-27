#!/usr/bin/env python3
"""
Generate the meritocracy comparison plot for the blog post:
posts/2014-10-19-meritocracy.markdown

Compares income quantiles at age 40 between poor college graduates
and rich high school dropouts.
"""

import os
import matplotlib.pyplot as plt
from matplotlib.ticker import FuncFormatter, MaxNLocator

# Output directory (relative to this script)
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
OUTPUT_DIR = os.path.join(SCRIPT_DIR, '..', 'output')


def to_percent(y, position):
    return f"{y:.0f}%"


def main():
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    
    quantiles = range(1, 6)

    poor = [16, 17, 26, 21, 20]
    rich = [16, 35, 30, 5, 14]

    plt.figure(figsize=(10, 6))
    plt.plot(quantiles, poor, alpha=0.5, linewidth=4, label='Poor College Grads')
    plt.plot(quantiles, rich, alpha=0.5, linewidth=4, label='Rich High School Dropouts', color='g')

    plt.legend(loc='best')

    # Set the Y axis to be a percentage
    formatter = FuncFormatter(to_percent)
    plt.gca().yaxis.set_major_formatter(formatter)
    plt.ylim(0, 50)

    # Set the x axis to be integers
    plt.gca().xaxis.set_major_locator(MaxNLocator(integer=True))
    plt.gca().set_xlabel('Income Quantile at age 40')

    output_path = os.path.join(OUTPUT_DIR, "Poor-Grads-Rich-Dropouts-Mine.png")
    plt.savefig(output_path, dpi=150, bbox_inches='tight')
    print(f"Saved plot to: {output_path}")
    
    # Also show instructions for copying to public assets
    print(f"\nTo update the blog asset, copy to:")
    print(f"  cp {output_path} public/assets/images/")


if __name__ == '__main__':
    main()

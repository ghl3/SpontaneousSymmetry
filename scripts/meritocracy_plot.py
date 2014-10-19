

import matplotlib.pyplot as plt

from matplotlib.ticker import FuncFormatter
from matplotlib.ticker import MaxNLocator


def to_percent(y, position):
    return "{:.0f}%".format(y)

def to_percent(y, position):
    return "{:.0f}%".format(y)


def main():

    quantiles = range(1, 6)

    poor = [16, 17, 26, 21, 20]
    rich = [16, 35, 30, 5, 14]

    plt.plot(quantiles, poor, alpha=0.5, linewidth=4, label='Poor College Grads')
    plt.plot(quantiles, rich, alpha=0.5, linewidth=4, label='Rich High School Dropouts', color='g')

    plt.legend(loc='best')

    # Set the Y axis to be a percentage and integers
    formatter = FuncFormatter(to_percent)
    plt.gca().yaxis.set_major_formatter(formatter)
    plt.ylim(0, 50)

    # Set the x axis to be integers
    xa = plt.gca().get_xaxis()
    xa.set_major_locator(MaxNLocator(integer=True))
    plt.gca().set_xlabel('Income Quantile at age 40')

    plt.savefig("static/images/Poor-Grads-Rich-Dropouts-Mine.png")


if __name__ == '__main__':
    main()

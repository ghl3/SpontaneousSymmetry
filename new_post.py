
import string
from datetime import datetime
import argparse


def main():

    parser = argparse.ArgumentParser(description='Create a new post')

    parser.add_argument('title', help='Title of the post')

    parser.add_argument('--author', default='', help='Author of the post')

    parser.add_argument('--dir', default='posts', help='Directory where posts are located')

    parser.add_argument('--date', default = datetime.now(),
                        help='Time the post was generated (defaults to now)')

    parser.add_argument('--layout', default='post',
                        help='The type of layout')

    parser.add_argument('--sum', dest='accumulate', action='store_const',
                        const=sum, default=max,
                        help='sum the integers (default: find the max)')

    args = parser.parse_args()

    title_stripped = args.title.translate(string.maketrans("",""), string.punctuation)
    slug = title_stripped.replace(' ' ,'-')
    all_args = vars(args)
    all_args['slug'] = slug

    title = "{}/{}-{}.markdown".format(args.dir, args.date.strftime("%Y-%M-%d"), args.slug)

    metadata = """---
author: {author}
date: {date}
layout: {layout}
slug: {slug}
title: {title}
---

Type Content Here
""".format(**all_args)

    f = open(title, 'w+')
    f.write(metadata)
    f.close()


    #print title
    #print metadata




if __name__=='__main__':
    main()

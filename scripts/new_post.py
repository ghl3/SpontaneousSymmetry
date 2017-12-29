#!/usr/bin/env python

import os
import re
import string
from datetime import datetime
import argparse

import glob


def main():

    parser = argparse.ArgumentParser(description='Create a new post')

    parser.add_argument('slug', help='The identifier of the post.  Must be a string with no whitespace')

    parser.add_argument('--title', help='The title of the post.  Inferred from the slug by default.', default=None)

    parser.add_argument('--author', default='', help='Author of the post')

    parser.add_argument('--dir', default='posts',
                        help='Directory where posts are located')

    parser.add_argument('--date', default=datetime.now(),
                        help='Time the post was generated (defaults to now)')

    parser.add_argument('--layout', default='post',
                        help='The type of layout')

    parser.add_argument('--sum', dest='accumulate', action='store_const',
                        const=sum, default=max,
                        help='sum the integers (default: find the max)')

    args = parser.parse_args()

    slug = args.slug.lower()
    for token in string.whitespace:
        if token in slug:
            print "Slug (argument 0) must not contain whitespace"
            return

    title = args.title
    if title is None:
        title = slug.replace('-', ' ').title()

    id = get_max_id(args.dir) + 1
    all_args = vars(args)
    all_args['slug'] = slug
    all_args['title'] = title
    all_args['id'] = id

    metadata = """---
author: {author}
date: {date}
layout: {layout}
slug: {slug}
title: {title}
id: {id}
---

Type Content Here
""".format(**all_args)

    output = "{}/{}-{}.markdown".format(args.dir, args.date.strftime("%Y-%m-%d"), args.slug)

    if not os.path.isfile(output):
        f = open(output, 'w+')
        f.write(metadata)
        f.close()
        print "Created new post stub: {}".format(output)
    else:
        print "File {} already exists.  Not overwriting".format(output)


def get_max_id(directory):
    """
    Look through the given directory for any posts.
    Collect their set of "id" metadata tags.
    Return the largest number
    """

    pattern = r"\s*wordpress_id:\s*(\d+)\s*"

    files = glob.glob(directory+"/*.markdown")

    indices = []

    for file_name in files:
        for line in open(file_name).readlines():
            m = re.match(pattern, line)
            if m:
                indices.append(int(m.group(1)))

    if indices:
        return max(indices)
    else:
        return -1


if __name__ == '__main__':
    main()

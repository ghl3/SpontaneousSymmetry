#!/usr/bin/env python3

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

    args = parser.parse_args()

    slug = args.slug.lower()
    for token in string.whitespace:
        if token in slug:
            print("Slug (argument 0) must not contain whitespace")
            return

    title = args.title
    if title is None:
        title = slug.replace('-', ' ').title()

    post_id = get_max_id(args.dir) + 1
    all_args = vars(args)
    all_args['slug'] = slug
    all_args['title'] = title
    all_args['id'] = post_id

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
        with open(output, 'w', encoding='utf-8') as f:
            f.write(metadata)
        print("Created new post stub: {}".format(output))
    else:
        print("File {} already exists.  Not overwriting".format(output))


def get_max_id(directory):
    """
    Look through the given directory for any posts.
    Collect their set of "id" or "wordpress_id" metadata tags.
    Return the largest number
    """

    # Match both 'id:' and 'wordpress_id:' patterns
    patterns = [
        r"\s*wordpress_id:\s*(\d+)\s*",
        r"\s*id:\s*(\d+)\s*"
    ]

    files = glob.glob(directory + "/*.markdown")

    indices = []

    for file_name in files:
        with open(file_name, encoding='utf-8') as f:
            for line in f.readlines():
                for pattern in patterns:
                    m = re.match(pattern, line)
                    if m:
                        indices.append(int(m.group(1)))

    if indices:
        return max(indices)
    else:
        return -1


if __name__ == '__main__':
    main()

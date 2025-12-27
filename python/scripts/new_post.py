#!/usr/bin/env python3
"""
Create a new blog post with proper frontmatter.

Usage (from project root):
    python python/scripts/new_post.py my-post-slug --title "My Post Title" --author "George"
"""

import os
import re
import string
from datetime import datetime
import argparse
import glob

# Project root (two directories up from this script)
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_ROOT = os.path.abspath(os.path.join(SCRIPT_DIR, '..', '..'))
DEFAULT_POSTS_DIR = os.path.join(PROJECT_ROOT, 'posts')


def main():
    parser = argparse.ArgumentParser(description='Create a new blog post')

    parser.add_argument('slug', help='The identifier of the post. Must be a string with no whitespace')
    parser.add_argument('--title', help='The title of the post. Inferred from the slug by default.', default=None)
    parser.add_argument('--author', default='George Lewis', help='Author of the post')
    parser.add_argument('--dir', default=DEFAULT_POSTS_DIR, help='Directory where posts are located')
    parser.add_argument('--date', default=None, help='Date for the post (defaults to today)')

    args = parser.parse_args()

    slug = args.slug.lower()
    for token in string.whitespace:
        if token in slug:
            print("Error: Slug must not contain whitespace")
            return 1

    title = args.title if args.title else slug.replace('-', ' ').title()
    date = datetime.strptime(args.date, '%Y-%m-%d') if args.date else datetime.now()

    post_id = get_max_id(args.dir) + 1

    metadata = f"""---
author: {args.author}
date: {date.strftime('%Y-%m-%d %H:%M:%S')}
layout: post
slug: {slug}
title: {title}
id: {post_id}
---

Write your content here...
"""

    output_path = os.path.join(args.dir, f"{date.strftime('%Y-%m-%d')}-{slug}.markdown")

    if os.path.isfile(output_path):
        print(f"Error: File already exists: {output_path}")
        return 1

    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(metadata)

    print(f"Created new post: {output_path}")
    return 0


def get_max_id(directory):
    """
    Look through the given directory for any posts.
    Collect their set of "id" or "wordpress_id" metadata tags.
    Return the largest number.
    """
    patterns = [
        r"\s*wordpress_id:\s*(\d+)\s*",
        r"\s*id:\s*(\d+)\s*"
    ]

    files = glob.glob(os.path.join(directory, "*.markdown"))
    indices = []

    for file_name in files:
        with open(file_name, encoding='utf-8') as f:
            for line in f:
                for pattern in patterns:
                    m = re.match(pattern, line)
                    if m:
                        indices.append(int(m.group(1)))

    return max(indices) if indices else 0


if __name__ == '__main__':
    exit(main())

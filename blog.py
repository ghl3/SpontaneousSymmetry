
import os
import re
import datetime

from flask import Flask
from flask import render_template
from flask import abort

import markdown
from flask import Markup

from flask import Blueprint, render_template, abort
from jinja2 import TemplateNotFound

import markdown
from flask import Flask
from flask import render_template
from flask import Markup

import mdx_mathjax

from collections import defaultdict, OrderedDict

import yaml

Blog = Blueprint('blog', __name__, template_folder='blog_templates')


class Post(object):

    def __init__(self, path, name, date_str):
        self.name = name
        self.path = path
        self.date_str = date_str

        self.date = datetime.datetime.strptime(date_str, '%Y-%m-%d').date()
        self.raw_content = open(path).read()
        self.meta, self.content = separate_yaml(self.raw_content)

    def url(self):
        return self.date_str + "-" + self.name


def separate_yaml(raw):
    """
    Posts are supposed to be in the following form:

    ---
    YAML Metadata
    ---

    Markdown Content

    This method splits a post string, converts the
    yaml to a python dict, and converts the markdown
    text to markup html
    """
    tokens = raw.split('---')
    yaml_data = yaml.load(tokens[1])
    markdown_raw = "".join(tokens[2:])
    markdown_raw = unicode(markdown_raw, errors='ignore')
    return (yaml_data, Markup(markdown.markdown(markdown_raw, extensions=['tables', 'codehilite', 'sane_lists', 'mathjax'])))


def get_latest_posts(n=1):
    return get_ordered_posts("posts")[:n]


def get_post_list(post_folder):
    """
    Get a list of all post data
    from a directory by looking for
    markdown files of a certain form.
    This does not parse the files, it
    simply returns a list of:
      (name, date, date-name, file-path)
    """
    regex = r"(\d{4}-\d{2}-\d{2})-(.*).markdown"
    posts = {}
    files = os.listdir(post_folder)
    for file in files:
        m = re.match(regex, file)
        if m:
            date_str, name = m.group(1), m.group(2)
            post = Post(post_folder+'/'+file, name, date_str)
            posts[post.url()] = post
    return posts


def get_all_posts(post_folder):
    return get_post_list(post_folder)


def get_ordered_posts(post_folder):
    return sorted(get_all_posts(post_folder).values(),
                  key=lambda x: x.date, reverse=True)


def get_archive(post_folder, n=None):
    """
    An archive is an ordered dictionary of
    month-year to a list of posts
    """

    d = defaultdict(list)

    for i, post in enumerate(get_ordered_posts(post_folder)):

        if n and i >= n:
            break

        year_month = post.date.replace(day=1)
        d[year_month].append(post)

    od = OrderedDict()
    for key in sorted(d.keys(), reverse=True):
        od[key] = d[key]

    return od


def load_post(post):
    """
    Load a post from disk and return a dict
    of the post's contents and it's metadata
    """
    return get_all_posts('posts')[post]

#    file_name = "posts/{}.markdown".format(post)
#    raw_content = open(file_name).read()
#    meta, content = separate_yaml(raw_content)
#    return {'meta': meta, 'content':content, 'url':post}


@Blog.route('/archive/<year>/<month>')
def archive(year, month):
    d = datetime.date(int(year), int(month), 1)
    archive = get_archive("posts")
    try:
        posts=archive[d]
    except KeyError:
        posts = []
    return render_template('archive.html', archive={d : posts})


@Blog.route('/archive')
def archive_list():
    archive = get_archive("posts")
    return render_template('archive.html', archive=archive)


@Blog.route('/<post>')
def blog_post(post):
    post_data = load_post(post)
    archive = get_archive("posts", 20)
    return render_template('post.html', post=post_data, archive=archive)


@Blog.route('/')
def blog():
    post_data = get_latest_posts(1)[0]
    archive = get_archive("posts", 20)
    return render_template('post.html', post=post_data, archive=archive)

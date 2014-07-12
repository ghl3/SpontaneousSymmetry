
import os
import os.path
import re
import sys
import datetime
from functools import wraps

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

POST_DIRECTORY = os.path.dirname(sys.modules[__name__].__file__)  + '/posts'
CACHE_POSTS = True


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
    extensions = ['tables', 'codehilite', 'sane_lists', 'mathjax']
    return (yaml_data,
            Markup(markdown.markdown(markdown_raw, extensions=extensions)))


def memo(func):
    """
    Memoize the function if the global
    variable 'CACHE_POSTS' evaluates to true
    """
    cache = {}

    @wraps(func)
    def wrap(*args):
        if CACHE_POSTS:
            if args not in cache:
                cache[args] = func(*args)
            return cache[args]
        else:
            return func(*args)

    return wrap


@memo
def get_posts_in_directory(post_folder):
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


@memo
def get_posts():
    return get_posts_in_directory(POST_DIRECTORY)


@memo
def get_posts_by_index():
    posts = get_posts().values()
    things = {str(post.meta['wordpress_id']):post for post in posts}
    print things
    return things

@memo
def get_ordered_posts():
    return sorted(get_posts().values(),
                  key=lambda x: x.date, reverse=True)


def load_post(post):
    """
    Load a post from disk and return a dict
    of the post's contents and it's metadata
    """
    return get_posts()[post]


@memo
def get_latest_posts(n=1):
    return get_ordered_posts()[:n]


@memo
def get_archive(n=None):
    """
    An archive is an ordered dictionary of
    month-year to a list of posts
    """

    d = defaultdict(list)

    posts = get_ordered_posts()

    if n is None:
        n = len(posts)

    for post in posts:
        year_month = post.date.replace(day=1)
        d[year_month].append(post)

    return OrderedDict(sorted(d.items(), reverse=True))


@Blog.route('/archive/<year>/<month>')
def archive(year, month):
    d = datetime.date(int(year), int(month), 1)
    archive = get_archive()
    try:
        posts = archive[d]
    except KeyError:
        posts = []
    return render_template('archive.html', archive={d: posts})


@Blog.route('/archives/<index>')
def archive_index(index):
    """
    An alternative archive index for backwards
    compatability with wordpress
    """
    archive = get_archive()
    try:
        post = get_posts_by_index()[index]
    except KeyError:
        abort(404)
    return render_template('post.html', post=post, archive=archive)


@Blog.route('/archive')
def archive_list():
    archive = get_archive()
    return render_template('archive.html', archive=archive)


@Blog.route('/<post>')
def blog_post(post):
    try:
        post = load_post(post)
    except KeyError:
        abort(404)
    archive = get_archive(20)
    return render_template('post.html', post=post, archive=archive)


@Blog.route('/')
def blog():
    post = get_latest_posts(1)[0]
    archive = get_archive(20)
    return render_template('post.html', post=post, archive=archive)

#!/usr/bin/env python

import os
import subprocess
import json
import re
import datetime

from werkzeug.wsgi import DispatcherMiddleware
from werkzeug.serving import run_simple

from flask import Flask
from flask import url_for
from flask import render_template
from flask import request
from flask import jsonify

from collections import defaultdict, OrderedDict

import markdown
from flask import Flask
from flask import render_template
from flask import Markup

import yaml

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html', title="SpontaneousSymmetry")

@app.route('/info')
def info():
    return render_template('info.html', title="Info")

@app.route('/work')
def work():
    return render_template('work.html', title="Work")

@app.route('/links')
def links():
    return render_template('links.html', title="Links")

@app.route('/code')
def code():
    return render_template('code.html', title="Code")

@app.route('/RocksPaper')
def rockspaper():
    return render_template('rockspaper.html', title="Rocks Paper")


def load_markdown(file_name):
    """
    Load a markdown file from disk and convert it into
    markup.
    """
    raw_content = open(file_name).read()
    raw_content = unicode(raw_content, errors='ignore')
    return Markup(markdown.markdown(raw_content))


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
    markdown_raw = tokens[2]
    markdown_raw = unicode(markdown_raw, errors='ignore')
    return (yaml_data, Markup(markdown.markdown(markdown_raw)))


def load_post(post):
    """
    Load a post from disk and return a dict
    of the post's contents and it's metadata
    """
    file_name = "posts/{}.markdown".format(post)
    raw_content = open(file_name).read()
    meta, content = separate_yaml(raw_content)
    return {'meta': meta, 'content':content, 'url':post}


def get_all_posts(post_folder):
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
            date = datetime.datetime.strptime(date_str, '%Y-%m-%d').date()
            posts[name] = (name, date, date_str+"-"+name, file)
    return posts


def get_ordered_posts(post_folder):
    return sorted(get_all_posts(post_folder).values(),
                  key=lambda (name, date, link, file): date,
                  reverse=True)


def get_archive(post_folder, n=None):
    """
    An archive is an ordered dictionary of
    month-year to a list of posts
    """

    d = defaultdict(list)

    for i, (name, date, link, file) in enumerate(get_ordered_posts(post_folder)):

        if n and i >= n:
            break

        year_month = date.replace(day=1)
        d[year_month].append((name, date, link, file))

    od = OrderedDict()
    for key in sorted(d.keys(), reverse=True):
        od[key] = d[key]

    return od


def get_latest_post():
    post_title = get_ordered_posts("posts")[0][2]
    return load_post(post_title)


@app.route('/blog/archive/<year>/<month>')
def archive(year, month):
    d = datetime.date(int(year), int(month), 1)
    archive = get_archive("posts")
    try:
        posts=archive[d]
    except KeyError:
        posts = []
    return render_template('archive.html', archive={d : posts})


@app.route('/blog/archive')
def archive_list():
    archive = get_archive("posts")
    return render_template('archive.html', archive=archive)


@app.route('/blog/<post>')
def blog_post(post):
    post_data = load_post(post)
    archive = get_archive("posts", 20)
    return render_template('post.html', post=post_data, archive=archive)


@app.route('/blog')
def blog():
    post_data = get_latest_post()
    archive = get_archive("posts", 20)
    return render_template('post.html', post=post_data, archive=archive)


@app.errorhandler(404)
def page_not_found(e):
        return render_template('errorpage.html'), 404


if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.debug = True
    app.run(host='0.0.0.0', port=port)


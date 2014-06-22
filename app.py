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


def get_all_posts(post_folder):
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


def get_archive(post_folder):
    """
    An archive is an ordered dictionary of
    month-year to a list of posts
    """

    d = defaultdict(list)

    for (name, date, link, file) in get_ordered_posts(post_folder):
        year_month = date.replace(day=1)
        d[year_month].append((name, date, link, file))

    od = OrderedDict()
    for key in sorted(d.keys(), reverse=True):
        od[key] = d[key]

    return od


def get_post(post):
    return {'content':load_markdown("_posts/{}.markdown".format(post))}


def get_latest_post():
    post_title = get_ordered_posts("_posts")[0][2]
    return get_post(post_title)


@app.route('/blog/archive/<year>/<month>')
def archive(year, month):
    d = datetime.date(int(year), int(month), 1)
    archive = get_archive("_posts")
    try:
        posts=archive[d]
    except KeyError:
        posts = []
    return render_template('archive.html', month=d, posts=posts)


@app.route('/blog/<post>')
def blog_post(post):
    post_data = get_post(post)
    archive = get_archive("_posts")
    return render_template('post.html', post=post_data, archive=archive)


@app.route('/blog')
def blog():
    post_data = get_latest_post()
    archive = get_archive("_posts")
    return render_template('post.html', post=post_data, archive=archive)


@app.errorhandler(404)
def page_not_found(e):
        return render_template('errorpage.html'), 404


if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.debug = True
    app.run(host='0.0.0.0', port=port)


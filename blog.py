
import os
import os.path
import re
import sys
import datetime

from functools import wraps
from collections import defaultdict, OrderedDict

import markdown
import yaml

from flask import render_template
from flask import abort
from flask import redirect
from flask import url_for
from flask import Markup
from flask import Blueprint
from flask import current_app

Blog = Blueprint('blog', __name__, template_folder='blog_templates')

BASE_PATH = os.path.dirname(sys.modules[__name__].__file__)
POST_DIRECTORY = BASE_PATH + '/posts'
CACHE_POSTS_IN_DEBUG = False


class Post(object):
    """
    A representation of a blog post.
    A markdown file in the "posts" directory can be loaded
    into memory and represented as a Post object.

    Posts consist of a number of components, each of which
    can be defined in the YAML at the top of the post's markdown file
      - name
    """

    def __init__(self, path, path_name, path_date):

        # Initialize values based on the file name
        self._path = path
        self._path_name = path_name
        self._path_date = path_date

        # Parse the YAML header and initialize the meta values
        self._raw_content = open(path).read()
        self.meta, self.content = separate_yaml(self._raw_content)

        # Sanity checks
        if 'slug' in self.meta and self.meta['slug'] != self._path_name:
            raise Post.InvalidPost(path)

        if 'date' in self.meta and self.meta['date'].date() != convert_date(path_date):
            raise Post.InvalidPost(path)


    def path(self):
        return self._path

    def date(self):
        return self.meta['date'].date()

    def datetime(self):
        return self.meta['date']

    def stub(self):
        return self.meta['slug']

    def author(self):
        return self.meta['author']

    def url(self):
        return self._path_date + "-" + self.stub()

    def title(self):
        return self.meta['title']

    def categories(self):
        return list(self.meta['categories'])

    def post_id(self):
        try:
            return self.meta['id']
        except KeyError:
            return self.meta['wordpress_id']

    class InvalidPost(Exception):
        def __init__(self, path):
            message = "Invalid Post at path: {}".format(path)
            super(Post.InvalidPost, self).__init__(message)
            self.path = path

def convert_date(date_str):
    try:
        return datetime.datetime.strptime(date_str, '%Y-%m-%d').date()
    except ValueError:
        return datetime.datetime.strptime(date_str.split()[0], '%Y-%m-%d').date()


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
    extensions = ['tables', 'codehilite', 'sane_lists', 'mdx_math', 'fenced_code']
    return (yaml_data,
            Markup(markdown.markdown(markdown_raw, extensions=extensions)))


def memo(func):
    """
    Memoize the function if the global
    variable 'CACHE_POSTS' evaluates to true
    """
    cache = {}

    @wraps(func)
    def wrap(*args, **kwargs):
        if current_app and (not current_app.debug or CACHE_POSTS_IN_DEBUG):
            if args not in cache:
                cache[args] = func(*args, **kwargs)
            return cache[args]
        else:
            return func(*args, **kwargs)

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
        match = re.match(regex, file)
        if match:
            date_str, name = match.group(1), match.group(2)
            post = Post(post_folder+'/'+file, name, date_str)
            posts[post.url()] = post
    return posts


@memo
def get_posts(dir=None):
    return get_posts_in_directory(dir) if dir else get_posts_in_directory(POST_DIRECTORY)


@memo
def get_posts_by_index(dir=None):
    posts = get_posts(dir=dir).values()
    return {str(post.post_id()): post for post in posts}

@memo
def get_ordered_posts(dir=None):
    return sorted(get_posts(dir=dir).values(),
                  key=lambda x: x.date(), reverse=True)


@memo
def load_and_render_page(path):
    """
    Load a generic page (not a blog post) from disk
    given a path to the markdown.
    Render the markdown as html and return the html
    as a string.
    """
    with open(path, 'r') as f:
        raw = f.read()
        meta, content = separate_yaml(raw)
        html = Markup(markdown.markdown(content))
        return meta, html

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
def get_archive(n=None, dir=None):
    """
    An archive is an ordered dictionary of
    month-year to a list of posts
    """

    d = defaultdict(list)

    posts = get_ordered_posts(dir=dir)

    if n is None:
        n = len(posts)

    for post in posts[:n]:
        year_month = post.date().replace(day=1)
        d[year_month].append(post)

    return OrderedDict(sorted(d.items(), reverse=True))


def warm_cache():
    get_archive()
    get_posts_by_index()


@Blog.route('/archive/<year>/<month>')
def archive(year, month):
    d = datetime.date(int(year), int(month), 1)
    archive_dict = get_archive()
    try:
        posts = archive_dict[d]
    except KeyError:
        posts = []
    return render_template('archive.html', archive={d: posts})


@Blog.route('/archives/<index>')
def archive_index(index):
    """
    An alternative archive index for backwards
    compatability with wordpress
    """
    try:
        post = get_posts_by_index()[index]
        return redirect(url_for(".blog_post", post=post.url()))
    except KeyError:
        abort(404)


@Blog.route('/archive')
def archive_list():
    archive_dict = get_archive()
    return render_template('archive.html', archive=archive_dict)


@Blog.route('/<post>')
def blog_post(post):
    try:
        post = load_post(post)
    except KeyError:
        abort(404)
    archive_dict = get_archive(5)
    return render_template('post.html', post=post, archive=archive_dict)


@Blog.route('/')
def blog():
    post = get_latest_posts(1)[0]
    archive_dict = get_archive(5)
    return render_template('post.html', post=post, archive=archive_dict)

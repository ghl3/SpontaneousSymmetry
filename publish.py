
import os

import argparse

from flask import Flask
import jinja2

import blog
from blog import Blog

from flask import render_template

app = Flask(__name__)
app.register_blueprint(Blog, url_prefix='/blog')


def main():

    parser = argparse.ArgumentParser(description='Publish posts into static HTML files')

    parser.add_argument('--post-dir', help='Directory in which posts are saved',
                        default=blog.POST_DIRECTORY)

    parser.add_argument('--target-dir', help='Location to place static posts',
                        default='static/posts')

    parser.add_argument('--overwrite', help='Overwrite existing posts',
                        default=False)

    parser.add_argument('--url', help='Name of the url (for creating relative absolute urls)',
                        default='')

    args = parser.parse_args()

    app.config['SERVER_NAME'] = args.url

    publish_posts(args.post_dir, args.target_dir, overwrite=args.overwrite)


def publish_posts(post_directory, target_directory, overwrite):
    all_posts = blog.get_posts_in_directory(post_directory)

    archive_dict = blog.get_archive(20, dir=post_directory)

    for name, post in all_posts.iteritems():
        publish_post(post, archive_dict, target_directory, overwrite)


def publish_post(post, archive_dict, target_directory, overwrite):

    with app.app_context():
        html = render_template('post.html', post=post, archive=archive_dict)

    target = target_directory + '/' + post.url()

    if overwrite:
        f = open(target, 'w+')
    else:
        if os.path.isfile(target):
            raise IOError("File {} for post {} already exists".format(target, post))
        f = open(target, 'w')

    f.write(html)
    f.close()


if __name__ == '__main__':
    main()

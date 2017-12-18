#!/usr/bin/env python

import os
import subprocess
import json

from werkzeug.wsgi import DispatcherMiddleware
from werkzeug.serving import run_simple

from flask import Flask
from flask import url_for
from flask import render_template
from flask import request
from flask import jsonify

import blog
from blog import Blog


app = Flask(__name__)

app.register_blueprint(Blog, url_prefix='/blog')
blog.warm_cache()


@app.after_request
def add_header(response):
    response.cache_control.max_age = 300
    response.cache_control.public = True
    return response

@app.route('/')
def index():
    return render_template('index.html'),

@app.route('/info')
def info():
    return render_template('info.html')

@app.route('/work')
def projects():
    return render_template('work.html')

@app.route('/atlas')
def work():
    return render_template('atlas.html')

@app.route('/links')
def links():
    return render_template('links.html')

@app.route('/apps')
def apps():
    return render_template('apps.html')

@app.route('/page/<page>')
def page(page):
    meta, body = blog.load_and_render_page('{}/pages/{}.markdown'.format(blog.BASE_PATH, page))
    return render_template('page.html', content=body, title=page)

@app.route('/stats')
@app.route('/stats/<page>')
def stats(page='introduction'):
    meta, body = blog.load_and_render_page('{}/pages/stats/{}.markdown'.format(blog.BASE_PATH, page))
    return render_template('page.html', content=body, title=page)


APP_MAP = {
    'rockspaper' : 'rockspaper.html',
    'bouncingballs' : 'bouncingballs.html'
}

@app.route('/app/<app>')
def rockspaper(app):
    app = app.lower()
    if app in APP_MAP:
        return render_template('apps/' + APP_MAP[app], title=app)


@app.errorhandler(404)
def page_not_found(e):
        return render_template('errorpage.html'), 404


if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.debug = True
    app.run(host='0.0.0.0', port=port)

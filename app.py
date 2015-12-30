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


@app.route('/')
def index():
    return render_template('index.html'),


@app.route('/info')
def info():
    return render_template('info.html')

@app.route('/projects')
def projects():
    return render_template('projects.html')


@app.route('/work/atlas')
def work():
    return render_template('atlas.html')


@app.route('/links')
def links():
    return render_template('links.html')


@app.route('/code')
def code():
    return render_template('code.html')


APP_MAP = {
    'RocksPaper' : 'rockspaper.html',
    'BouncingBalls' : 'bouncingballs.html'
}

@app.route('/app/<app>')
def rockspaper(app):
    if app in APP_MAP:
        return render_template('apps/' + APP_MAP[app], title=app)


@app.errorhandler(404)
def page_not_found(e):
        return render_template('errorpage.html'), 404


if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.debug = True
    app.run(host='0.0.0.0', port=port)

#!/usr/bin/env python

import os

from flask import Flask
from flask import render_template

import blog
from blog import Blog

from apps.connectfour import connectfour
from apps.connectfour.connectfour import ConnectFour

app = Flask(__name__)
app.register_blueprint(Blog, url_prefix='/blog')
app.register_blueprint(ConnectFour, url_prefix='/connectfour')

app.before_first_request(blog.warm_cache)
app.before_first_request(connectfour.get_ai)


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/work')
def projects():
    return render_template('work.html')


@app.route('/atlas')
def work():
    return render_template('atlas.html')


@app.route('/about')
def about():
    return render_template('about.html')


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
    'rockspaper': 'rockspaper.html',
    'bouncingballs': 'bouncingballs.html',
    'connectfour': 'connectfour.html'
}


@app.route('/apps')
def apps():
    return render_template('apps.html')


@app.route('/app/<app>')
def rockspaper(app):
    app = app.lower()
    if app in APP_MAP:
        return render_template('apps/' + APP_MAP[app], title=app)
    else:
        raise Exception("BAD APP")


@app.errorhandler(404)
def page_not_found(e):
    return render_template('errorpage.html'), 404


if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.debug = True
    app.run(host='0.0.0.0', port=port)

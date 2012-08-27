#!/usr/bin/env python

import os
import subprocess
import json

from flask import Flask
from flask import url_for
from flask import render_template
from flask import request
from flask import jsonify

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

#@app.route('/blog')
#def blog():
#    # Get the php'd version of the blog
#    blog_data = subprocess.check_output(["php", "templates/blog.php"])
#    return render_template('blog.html', title="Blog", blog_data=blog_data)

@app.route('/RocksPaper')
def rockspaper():
    return render_template('rockspaper.html', title="Rocks Paper")

@app.route('/BouncingBalls')
def bouncingballs():
    return render_template('bouncingballs.html', title="Bouncing Balls")

@app.errorhandler(404)
def page_not_found(e):
        return render_template('errorpage.html'), 404

if __name__ == '__main__':
    # Bind to PORT if defined, otherwise default to 5000.
    port = int(os.environ.get('PORT', 5000))
    app.debug = True
    app.run(host='0.0.0.0', port=port)
    


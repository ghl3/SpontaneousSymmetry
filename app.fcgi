#!/home1/spontane/venv/flask_hello_world/bin/python

from flup.server.fcgi import WSGIServer
from app import app as application

WSGIServer(application).run()

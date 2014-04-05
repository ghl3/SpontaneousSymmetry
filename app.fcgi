#!/home1/spontane/python/bin/python

from flup.server.fcgi import WSGIServer


from app import app as application
WSGIServer(application, maxThreads=4).run()

#from werkzeug.wsgi import DispatcherMiddleware
#from HistFactoryJS.app import app as histfactory
#
#combined_app = DispatcherMiddleware(application, {'/HistFactory': histfactory })
#WSGIServer(combined_app).run()


#WSGIServer(histfactory, scriptName='/HistFactory').run()

FROM python:2.7


RUN apt-get update && apt-get install -y ca-certificates nginx

# Install uWSGI
RUN pip install uwsgi



# Standard set up Nginx
#ENV NGINX_VERSION 1.9.11-1~jessie

#RUN apt-key adv --keyserver hkp://pgp.mit.edu:80 --recv-keys 573BFD6B3D8FBC641079A6ABABF5BD827BD9BF62 \
#    && echo "deb http://nginx.org/packages/mainline/debian/ jessie nginx" >> /etc/apt/sources.list \
#    && apt-get update \
#    && apt-get install -y ca-certificates nginx=${NGINX_VERSION} gettext-base \
#    && rm -rf /var/lib/apt/lists/*

# forward request and error logs to docker log collector
RUN ln -sf /dev/stdout /var/log/nginx/access.log \
    && ln -sf /dev/stderr /var/log/nginx/error.log

EXPOSE 80 443
# Finished setting up Nginx


# Make NGINX run on the foreground
#RUN echo "daemon off;" >> /etc/nginx/nginx.conf



# Setup our own nginx configuration
COPY spontaneoussymmetry_nginx.conf /etc/nginx/conf.d/

# Setup our uwsgi configuration
#COPY uwsgi.conf /etc/uwsgi/

# Remove default configuration from Nginx


# RUN rm /etc/nginx/conf.d/default.conf
# # Copy the modified Nginx conf
# COPY nginx.conf /etc/nginx/conf.d/
# # Copy the base uWSGI ini file to enable default dynamic uwsgi process number
# COPY uwsgi.ini /etc/uwsgi/

# # Install Supervisord
# RUN apt-get update && apt-get install -y supervisor \
# && rm -rf /var/lib/apt/lists/*
# # Custom Supervisord config
# COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf

# # Which uWSGI .ini file should be used, to make it customizable
# ENV UWSGI_INI /app/uwsgi.ini

# # By default, allow unlimited file sizes, modify it to limit the file sizes
# # To have a maximum of 1 MB (Nginx's default) change the line to:
# # ENV NGINX_MAX_UPLOAD 1m
# ENV NGINX_MAX_UPLOAD 0

# # By default, Nginx listens on port 80.
# # To modify this, change LISTEN_PORT environment variable.
# # (in a Dockerfile or with an option for `docker run`)
# ENV LISTEN_PORT 80

# # Copy the entrypoint that will generate Nginx additional configs
# COPY entrypoint.sh /entrypoint.sh
# RUN chmod +x /entrypoint.sh

# ENTRYPOINT ["/entrypoint.sh"]

# Add our app
COPY . /app
WORKDIR /app


RUN service uwsgi restart && service uwsgi status && service nginx status


#CMD ["/usr/bin/supervisord"]




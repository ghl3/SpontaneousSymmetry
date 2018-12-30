FROM alpine:3.8

#FROM ubuntu:18.04

RUN apk add --update --repository http://dl-cdn.alpinelinux.org/alpine/edge/testing/ hdf5 hdf5-dev

ADD https://raw.githubusercontent.com/davido/bazel-alpine-package/master/david@ostrovsky.org-5a0369d6.rsa.pub \
    /etc/apk/keys/david@ostrovsky.org-5a0369d6.rsa.pub
ADD https://github.com/davido/bazel-alpine-package/releases/download/0.19.0/bazel-0.19.0-r0.apk \
    /tmp/bazel-0.19.0-r0.apk
RUN apk add /tmp/bazel-0.19.0-r0.apk

RUN apk add --no-cache --update \
    linux-headers \
    alpine-sdk \
    supervisor \
    python-dev \
    py-pip \
    py-virtualenv \
    nginx \
    uwsgi \
    && pip install --upgrade pip \
    && pip install uwsgi==2.0.15 \
    && mkdir -p /var/log/nginx \
    && mkdir -p /etc/ssl/private \
    && mkdir -p /etc/ssl/certs

# Setup the app directory
RUN mkdir /var/www/spontaneoussymmetry
WORKDIR /var/www/spontaneoussymmetry

# Setup python dependencies
COPY requirements.txt /var/www/spontaneoussymmetry
COPY constraints.txt /var/www/spontaneoussymmetry

RUN virtualenv venv \
  && . venv/bin/activate \
  && pip install --upgrade  https://storage.googleapis.com/tensorflow/mac/cpu/tensorflow-1.12.0-py2-none-any.whl \
  && pip install -c constraints.txt -r requirements.txt && deactivate

# Setup the web app and flask
COPY . /var/www/spontaneoussymmetry

# Setup the docker and uwsgi configs

COPY config/nginx.conf /etc/nginx/nginx.conf
COPY config/spontaneoussymmetry_nginx.conf /etc/nginx/conf.d/spontaneoussymmetry_nginx.conf
COPY config/emperor.ini /etc/uwsgi/emperor.ini
COPY config/spontaneoussymmetry_uwsgi.ini /etc/uwsgi/vassals/spontaneoussymmetry_uwsgi.ini
COPY config/supervisord.conf /etc/supervisor/conf.d/supervisord.conf

RUN ln -sf /dev/stdout /var/log/nginx/access.log \
    && ln -sf /dev/stderr /var/log/nginx/error.log \
    && rm /etc/nginx/conf.d/default.conf \
    && mkdir -p /data/nginx/cache \
    && chown -R nginx /data/nginx/cache

RUN chown -R uwsgi /var/www/spontaneoussymmetry

# Launch the servers as daemons

EXPOSE 80 443

CMD ["/usr/bin/supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"]

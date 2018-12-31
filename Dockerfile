FROM ubuntu:18.04

#RUN apk add --update --repository http://dl-cdn.alpinelinux.org/alpine/edge/testing/ hdf5 hdf5-dev

#ADD https://raw.githubusercontent.com/davido/bazel-alpine-package/master/david@ostrovsky.org-5a0369d6.rsa.pub \
#    /etc/apk/keys/david@ostrovsky.org-5a0369d6.rsa.pub
#ADD https://github.com/davido/bazel-alpine-package/releases/download/0.19.0/bazel-0.19.0-r0.apk \
#    /tmp/bazel-0.19.0-r0.apk
#RUN apk add /tmp/bazel-0.19.0-r0.apk

RUN apt-get -y update && apt-get -y install \
#   linux-headers \
#   alpine-sdk \
    git \
    supervisor \
    python-dev \
    python-pip \
    python-virtualenv \
    nginx \
    uwsgi \
    uwsgi-plugin-python \
#   && python -m pip uninstall pip
#   && pip install --upgrade pip \
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
#  && pip install --upgrade  https://storage.googleapis.com/tensorflow/mac/cpu/tensorflow-1.12.0-py2-none-any.whl \
   && pip install -c constraints.txt -r requirements.txt && deactivate

# Set up permissions

RUN useradd -s /bin/false nginx
RUN useradd -s /bin/false uwsgi

RUN ln -sf /dev/stdout /var/log/nginx/access.log \
    && ln -sf /dev/stderr /var/log/nginx/error.log \
#   && rm /etc/nginx/conf.d/default.conf \
    && mkdir -p /data/nginx/cache \
    && chown -R nginx /data/nginx/cache

RUN chown -R uwsgi /var/www/spontaneoussymmetry \
 && chown -R uwsgi /var/log/uwsgi

# Copy the web app to Docker
COPY . /var/www/spontaneoussymmetry

# Move the configs to the right places
COPY config/nginx.conf /etc/nginx/nginx.conf
COPY config/spontaneoussymmetry_nginx.conf /etc/nginx/conf.d/spontaneoussymmetry_nginx.conf
COPY config/emperor.ini /etc/uwsgi/emperor.ini
COPY config/spontaneoussymmetry_uwsgi.ini /etc/uwsgi/vassals/spontaneoussymmetry_uwsgi.ini
COPY config/supervisord.conf /etc/supervisor/conf.d/supervisord.conf

# Launch the servers as daemons

EXPOSE 80 443

CMD ["/usr/bin/supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"]

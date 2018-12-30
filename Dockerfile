FROM alpine:3.6

RUN apk add --update \
    linux-headers \
    alpine-sdk \
    supervisor \
    python-dev \
    py-pip \
    py-virtualenv \
    nginx \
    uwsgi \
    freetype-dev \
    libpng-dev \
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

RUN virtualenv venv && . venv/bin/activate && pip install -c constraints.txt -r requirements.txt && deactivate

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

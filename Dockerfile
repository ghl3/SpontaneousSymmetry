FROM ubuntu:18.04

RUN apt-get -y update && apt-get -y install \
    git \
    supervisor \
    python-dev \
    python-pip \
    python-virtualenv \
    nginx \
    uwsgi \
    uwsgi-plugin-python \
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
   && pip install -c constraints.txt -r requirements.txt && deactivate

# Set up permissions
RUN useradd -s /bin/false nginx
RUN useradd -s /bin/false uwsgi

RUN ln -sf /dev/stdout /var/log/nginx/access.log \
    && ln -sf /dev/stderr /var/log/nginx/error.log \
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

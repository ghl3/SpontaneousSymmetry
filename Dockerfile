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
    && pip install uwsgi==2.0.15 \
    && mkdir -p /var/log/nginx \
    && mkdir -p /etc/ssl/private \
    && mkdir -p /etc/ssl/certs


# Setup the docker and uwsgi configs

COPY config/nginx.conf /etc/nginx/nginx.conf
COPY config/spontaneoussymmetry_nginx.conf /etc/nginx/conf.d/spontaneoussymmetry_nginx.conf
COPY config/emperor.ini /etc/uwsgi/emperor.ini
COPY config/spontaneoussymmetry_uwsgi.ini /etc/uwsgi/vassals/spontaneoussymmetry_uwsgi.ini
COPY config/supervisord.conf /etc/supervisor/conf.d/supervisord.conf

# forward request and error logs to docker log collector
RUN ln -sf /dev/stdout /var/log/nginx/access.log \
    && ln -sf /dev/stderr /var/log/nginx/error.log \
    && rm /etc/nginx/conf.d/default.conf

EXPOSE 80 443

RUN mkdir /var/www/spontaneoussymmetry
COPY . /var/www/spontaneoussymmetry
WORKDIR /var/www/spontaneoussymmetry

RUN virtualenv venv && . venv/bin/activate && pip install -c constraints.txt -r requirements.txt && deactivate

RUN chown -R uwsgi /var/www/spontaneoussymmetry

CMD ["/usr/bin/supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"]

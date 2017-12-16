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

#COPY ./uwsgi.service /etc/systemd/system/uwsgi.service
#COPY ./nginx_override.conf /etc/systemd/system/nginx.service.d/override.conf

COPY ./nginx.conf /etc/nginx/nginx.conf
COPY ./spontaneoussymmetry_nginx.conf /etc/nginx/conf.d/spontaneoussymmetry_nginx.conf

COPY ./emperor.ini /etc/uwsgi/emperor.ini
COPY ./spontaneoussymmetry_uwsgi.ini /etc/uwsgi/vassals/spontaneoussymmetry_uwsgi.ini

COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf

#RUN systemctl daemon-reload && systemctl start nginx.service && systemctl start uwsgi.service

# forward request and error logs to docker log collector
RUN ln -sf /dev/stdout /var/log/nginx/access.log \
    && ln -sf /dev/stderr /var/log/nginx/error.log

EXPOSE 80 443


RUN mkdir /var/www/spontaneoussymmetry
COPY . /var/www/spontaneoussymmetry
WORKDIR /var/www/spontaneoussymmetry

RUN virtualenv venv && . venv/bin/activate && pip install -c constraints.txt -r requirements.txt && deactivate

CMD ["/usr/bin/supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"]

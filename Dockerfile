FROM python:2.7.14-alpine3.6

RUN apk update \
    && apk add linux-headers \
    && apk add alpine-sdk \
    && apk add python-dev \
    && apk add nginx \
    && apk add uwsgi \
    && pip install uwsgi


# Setup the docker and uwsgi configs

COPY ./uwsgi.service /etc/systemd/system/uwsgi.service
COPY ./nginx_override.conf /etc/systemd/system/nginx.service.d/override.conf

COPY ./nginx.conf /etc/nginx/nginx.conf
COPY ./spontaneoussymmetry_nginx.conf /etc/nginx/conf.d/spontaneoussymmetry_nginx.conf

COPY ./emperor.ini /etc/uwsgi/emperor.ini
COPY ./spontaneoussymmetry_uwsgi.ini /etc/uwsgi/vassals/spontaneoussymmetry_uwsgi.ini

RUN systemctl daemon-reload  && systemctl start nginx.service && systemctl start uwsgi.service


EXPOSE 80 443

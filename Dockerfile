FROM alpine:3.6

RUN apk add --update \
    linux-headers \
    alpine-sdk \
    supervisor \
    python-dev \
    py-pip \
    nginx \
    uwsgi \
    && pip install uwsgi \
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


EXPOSE 80 443

CMD ["/usr/bin/supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"]
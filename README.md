SpontaneousSymmetry
===================

My Personal Website

Written in python using Flask

Hosted on EC2 using uwsgi and nginx

Available at: <a href=www.spontaneoussymmetry.com>www.spontaneoussymmetry.com</a>



# Setting up and maintaining the site


To get the site to work on a new machine, one must do the following:

- Install nginx
- Install uwsgi
- Install python 2.7

Copy contents of the app to:
/var/www/spontaneoussymmetry

(creating, for example, /var/www/spontaneoussymmetry/app.py)

Setup a local python environment

cd /var/www/spontaneoussymmetry
virtualenv venv
. venv/bin/activate
pip install -r requirements.txt
deactivate

Then copy the local files to the following place:

uwsgi.service -> /etc/systemd/system/uwsgi.service
nginx_override.conf -> /etc/systemd/system/nginx.service.d/override.conf

nginx.conf -> /etc/nginx/nginx.conf
spontaneoussymmetry_nginx.conf -> /etc/nginx/conf.d/spontaneoussymmetry_nginx.conf

emperor.ini -> /etc/uwsgi/emperor.ini
spontaneoussymmetry_uwsgi.ini -> /etc/uwsgi/vassals/spontaneoussymmetry_uwsgi.ini


Then run:

sudo systemctl daemon-reload
sudo systemctl start nginx.service
sudo systemctl start uwsgi.service
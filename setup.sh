

# A (non-tested) setup script to
# install the blog on an AWS unix server

sudo apt-get update && sudo apt-get -y upgrade

sudo apt-get install -y nginx
sudo apt-get install -y git
sudo apt-get install -y python-virtualenv
sudo apt-get install -y emacs24
sudo apt-get install -y python-markdown
sudo apt-get install -y uwsgi
sudo apt-get install -y python-dev


# Get the code and setup the git hooks

mkdir -p /home/ubuntu/git-repo/ && cd /home/ubuntu/git-repo/
git clone --bare https://github.com/ghl3/SpontaneousSymmetry.git
sudo chown -R ubuntu SpontaneousSymmetry.git/
export SITE_DIRECTORY=/var/www/spontaneoussymmetry
sudo mkdir -p $SITE_DIRECTORY
sudo chown www-data $SITE_DIRECTORY
cd SpontaneousSymmetry.git
sudo git --work-tree=$SITE_DIRECTORY checkout -f master
rm hooks/*.sample
cd hooks
ln -s $SITE_DIRECTORY/deploy/git-post-receive post-receive


# Setup nginx

cd /etc/nginx/conf.d/
sudo rm /etc/nginx/sites-available/default
sudo ln -s $SITE_DIRECTORY/spontaneoussymmetry_nginx.conf
cd ~
sudo service nginx restart


# Setup the python app

cd $SITE_DIRECTORY
sudo virtualenv venv
sudo chown -R ubuntu venv
. venv/bin/activate
pip install -r requirements.txt


# Setup uwsgi

sudo mkdir -p /etc/uwsgi/vassals/ && cd /etc/uwsgi/vassals/
sudo ln -s $SITE_DIRECTORY/spontaneoussymmetry_uwsgi.ini
sudo cd /etc/init
sudo ln -s $SITE_DIRECTORY/uwsgi.conf
sudo chown www-data /var/log/uwsgi
cd ~
sudo service uwsgi restart

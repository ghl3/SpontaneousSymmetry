set -e

SITE_DIRECTORY=/var/www/spontaneoussymmetry

# Import the image
#docker import ~/sys_img.tar

# Create a Contianer
docker rm sym_cont
docker create --name sym_cont -p 80:80 -p 443:443 sym_img:latest

# Copy certs into the container
docker cp /etc/letsencrypt/live/spontaneoussymmetry.com/fullchain.pem sym_cont:/etc/ssl/certs/nginx.crt
docker cp /etc/letsencrypt/live/spontaneoussymmetry.com/privkey.pem sym_cont:/etc/ssl/private/nginx.key

# Start the container
# (Run = Create + Start)
docker start -i sym_cont
#docker run -P -t ss_app

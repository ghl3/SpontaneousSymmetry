set -e

SITE_DIRECTORY=/var/www/spontaneoussymmetry
cd $SITE_DIRECTORY

echo "Pruning Docker"
yes | docker image prune
yes | docker container prune

echo "Build new container"
docker build -t sym_img .

echo "Building the new container"
docker rm sym_cont_old
docker rename sym_cont sym_cont_old
docker create --name sym_cont -p 80:80 -p 443:443 sym_img:latest

echo "Copying certificates to the container"
docker cp --follow-link /etc/letsencrypt/live/spontaneoussymmetry.com/fullchain.pem sym_cont:/etc/ssl/certs/nginx.crt
docker cp --follow-link /etc/letsencrypt/live/spontaneoussymmetry.com/privkey.pem sym_cont:/etc/ssl/private/nginx.key

echo "Stopping any running containers"
docker stop $(docker ps -a -q)

# Start the container
# (Run = Create + Start)
echo "Starting the container"
docker start sym_cont

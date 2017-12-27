#set -e

SITE_DIRECTORY=/var/www/spontaneoussymmetry
cd $SITE_DIRECTORY

echo "Stopping any running containers"
docker stop $(docker ps -a -q)

echo "Removing existing containers"
docker rm sym_cont || true

echo "Build new container"
docker build -t sym_img .

echo "Building the new container"
docker create --name sym_cont -p 80:80 -p 443:443 sym_img:latest

echo "Copying certificates to the container"
docker cp --follow-link /etc/letsencrypt/live/spontaneoussymmetry.com/fullchain.pem sym_cont:/etc/ssl/certs/nginx.crt
docker cp --follow-link /etc/letsencrypt/live/spontaneoussymmetry.com/privkey.pem sym_cont:/etc/ssl/private/nginx.key

# Commit the container as a new image
#echo "Committing the container with certificates to an image"
#docker commit sym_cont sym_img_ssl

# The new image will have the files
#echo "Running the new image as a daemon container"
#docker run -d --name sym_cont_ssl -p 80:80 -p 443:443 sym_img_ssl:latest


# Start the container
# (Run = Create + Start)
echo "Starting the container"
docker start sym_cont
#docker run -P -t ss_app


# Install Docker
sudo apt-get install docker

# Create the image
docker load < sym_img.tar

docker rm sym_cont
docker create --name sym_cont --log-driver syslog -p 80:80 -p 443:443 sym_img:latest

# Copy certs into the container
docker cp /etc/letsencrypt/live/spontaneoussymmetry.com/fullchain.pem sym_cont:/etc/ssl/certs/nginx.crt
docker cp /etc/letsencrypt/live/spontaneoussymmetry.com/privkey.pem sym_cont:/etc/ssl/private/nginx.key

# Start the container
# (Run = Create + Start)
docker start sym_cont

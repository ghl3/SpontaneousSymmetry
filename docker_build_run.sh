set -e


# Build the IMAGE
docker build -t sym_img .

# Create a Contianer
docker rm sym_cont
docker create --name sym_cont --publish-all sym_img:latest

# Copy certs into the container
docker cp certs/nginx-selfsigned.crt sym_cont:/etc/ssl/certs/nginx.crt
docker cp certs/nginx-selfsigned.key sym_cont:/etc/ssl/private/nginx.key

# Start the container
# (Run = Create + Start)
docker start -i sym_cont
#docker run -P -t ss_app

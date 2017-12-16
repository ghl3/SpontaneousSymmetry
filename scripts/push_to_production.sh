


# Build the image locally
docker build -t sym_img .

# Save the image as a tar file
docker save sym_img > sym_img.tar

# Upload the image to production
scp sym_img.tar ss

# Run the deploy script on the remote machine
ssh ss 'bash -s' < local_script.sh


#scp scripts/production_runner.sh ss

#Load image on your remote machine:

#ssh user@aws-machine


#Run a new container

#docker run my_image


# Scp the runner script


# Run the runner script

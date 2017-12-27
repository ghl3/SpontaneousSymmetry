

echo "Pushing new code to production server"
git push production

echo "Running post-push script"
ssh ss 'bash -s' < scripts/docker_production_build_run.sh







# Build the image locally
#echo "Building Image"
#docker build -t sym_img .

# Save the image as a tar file
#echo "Saving image to tar file"
#docker save sym_img > sym_img.tar

# Upload the image to production
#echo "Sending image tar to server"
#scp sym_img.tar ss:~/sys_img.tar

#ssh ss 'docker import ~/sys_img.tar && docker

# Run the deploy script on the remote machine
#echo "Running container"
#ssh ss 'bash -s' < scripts/docker_production_build_run.sh



#scp scripts/production_runner.sh ss

#Load image on your remote machine:

#ssh user@aws-machine


#Run a new container

#docker run my_image


# Scp the runner script


# Run the runner script

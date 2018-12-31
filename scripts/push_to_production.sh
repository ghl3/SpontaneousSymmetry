set -e

echo "Pushing new code to production server"
git push production

echo "Running post-push script"
ssh ss 'sudo bash -s' < scripts/docker_production_build_run.sh

echo "DONE WITH PUSH"

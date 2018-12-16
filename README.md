SpontaneousSymmetry
===================

My Personal Website

Written in python using Flask

Hosted on EC2 using Docker, uwsgi, and nginx

Available at: <a href=www.spontaneoussymmetry.com>www.spontaneoussymmetry.com</a>



# Setting up and maintaining the site

This site is designed to run in a Docker container.  The container is created using a <a href="https://github.com/ghl3/SpontaneousSymmetry/blob/master/Dockerfile">Dockerfile</a>.  Once built, the container exposes port 80 and 443.  To deploy this page, simply bind a server's port's 80 and 443 to the container's ports.  Additionally, one may copy SSL certifiates into thie container before running to enable TLS access (see the <a href="https://github.com/ghl3/SpontaneousSymmetry/blob/master/scripts/docker_production_build_run.sh#L16">build script</a> for details).

Internally, the Dockerfile runs nginx to handle incoming requests.  Static pages and assets are served directly by nginx, and dynamic pages are served using uwsgi and flask.

The blog is powered by a custom blog framework written for this site.  Posts are written in Markdown and rendered using Jinja.


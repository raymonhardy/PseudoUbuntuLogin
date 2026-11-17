# Serve the static sign-in demo with nginx.
FROM nginx:1.27-alpine

# Static assets
COPY index.html login.html /usr/share/nginx/html/
COPY css/    /usr/share/nginx/html/css/
COPY js/     /usr/share/nginx/html/js/
COPY assets/ /usr/share/nginx/html/assets/

EXPOSE 80
# nginx:alpine already defines the CMD that runs the server in the foreground.

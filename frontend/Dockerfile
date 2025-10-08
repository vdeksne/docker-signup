FROM nginx:stable-alpine

# Remove default nginx static content and copy built frontend
RUN rm -rf /usr/share/nginx/html/*
COPY dist /usr/share/nginx/html
COPY default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

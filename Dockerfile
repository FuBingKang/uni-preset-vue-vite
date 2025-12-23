# FROM nginx
FROM registry.steam.crcloud.com/tools/nginx:1.28.1
# set working directory


# install and cache app dependencies


# RUN npm run install:all 




#COPY ./nginx.conf /etc/nginx/nginx.conf
## Copy our default nginx config
#COPY ./default.conf /etc/nginx/conf.d/

## Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*


COPY  .  /usr/share/nginx/html

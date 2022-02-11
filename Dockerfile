# base image
FROM node:12.2.0-alpine

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /app/package.json
RUN echo -e "http://nl.alpinelinux.org/alpine/v3.9/main\nhttp://nl.alpinelinux.org/alpine/v3.9/community" > /etc/apk/repositories
RUN apk update && \
    apk add --update git && \
    apk add --update openssh
RUN git config --global url."https://".insteadOf git://
RUN npm install

ADD . ./app

# start app
# RUN npm run build

CMD ["npm", "run", "serve"]
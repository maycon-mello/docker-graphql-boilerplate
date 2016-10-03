FROM node:6-onbuild

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app/
RUN npm install & npm install -g nodemon

COPY . /usr/src/app

EXPOSE 3000

CMD [ "npm", "start" ]

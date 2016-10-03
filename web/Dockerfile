FROM node:6-onbuild

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install & npm install -g nodemon

COPY . /usr/src/app

EXPOSE 8000

CMD [ "npm", "start"]

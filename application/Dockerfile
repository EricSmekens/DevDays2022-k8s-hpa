FROM node:16
# Create app directory
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm config set strict-ssl false
RUN npm install
# Bundle app source
COPY . .
EXPOSE 8080
CMD [ "npm", "start" ]
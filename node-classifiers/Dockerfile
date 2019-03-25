FROM node:8
# Create app directory
WORKDIR /usr/src/app
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

# Uncomment and configure proxy settings if required
# RUN npm config set strict-ssl=false
# RUN npm config set proxy=""
# RUN npm config set https-proxy=""

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production
# Bundle app source
COPY . .
EXPOSE 8080
CMD [ "npm", "start" ]
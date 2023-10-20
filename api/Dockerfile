# We use an alpine image to reduce the size of the image
FROM node:21-alpine
WORKDIR /usr/src/app

# We copy the package.json and package-lock.json files to the working directory 
# to get a cached layer for the dependencies then we install them
COPY package*.json ./
RUN npm install

# We copy the rest of the files to the working directory
COPY . .

# We expose to the port 3000 and start the server
EXPOSE 3000
CMD ["npm", "run", "start"]
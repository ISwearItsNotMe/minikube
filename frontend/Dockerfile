# We use an alpine image to reduce the size of the image
FROM node:21-alpine as build
WORKDIR /usr/src/app

# We copy the package.json and package-lock.json files to the working directory 
# to get a cached layer for the dependencies then we install them
COPY package*.json ./
RUN npm install

# We copy the rest of the files to the working directory and build the app
COPY . .
RUN npm run build

# We use a new alpine image to reduce the size of the image
FROM nginx:alpine

# We copy the build folder to the nginx html folder
COPY --from=build /usr/src/app/build /usr/share/nginx/html

# We expose to the port 3001 and start the server
EXPOSE 3001
RUN echo "server { listen 3001; location / { root /usr/share/nginx/html; try_files \$uri \$uri/ =404; }}" > /etc/nginx/conf.d/default.conf
CMD ["nginx", "-g", "daemon off;"]

FROM node:16-alpine
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
# COPY package*.json ./
COPY . .
RUN npm i
EXPOSE 3001
CMD  npm run build && npm run start
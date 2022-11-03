# syntax=docker/dockerfile:1
FROM node:16-alpine
WORKDIR /code/
COPY package.json ./
COPY package-lock.json ./
RUN npm install
COPY ./src ./src
COPY ./public ./public
RUN npm run build

FROM nginx:latest 
WORKDIR /serve/
COPY ./default.conf /etc/nginx/conf.d/default.conf
COPY --from=0 /code/build .
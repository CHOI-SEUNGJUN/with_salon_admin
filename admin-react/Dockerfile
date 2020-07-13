# base image
FROM node:12.2.0-alpine

# set working directory
WORKDIR /app

# `/app/node_modules/.bin`을 $PATH 에 추가
ENV PATH /app/node_modules/.bin:$PATH

# app dependencies, install 및 caching
COPY package.json /app/package.json
RUN npm install --silent
RUN npm install react-scripts@3.0.1 -g -- silent

# 앱 실행
CMD ["npm", "start"]
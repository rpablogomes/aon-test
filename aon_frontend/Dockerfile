FROM node:alpine

WORKDIR /app

COPY package*.json ./
RUN yarn install

COPY . /app

EXPOSE 3000

CMD ["yarn", "start"]

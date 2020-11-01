FROM node:12

WORKDIR /app

COPY . ./

RUN npm install -g serve

RUN npm install

RUN npm run build

CMD [ "serve", "-s", "build", "-l", "3000" ]
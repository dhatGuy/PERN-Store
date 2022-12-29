FROM node:16

WORKDIR /usr/src/app

COPY . .

RUN npm i --no-audit || npm i --no-audit --maxsockets 1

EXPOSE 3000

CMD [ "yarn", "start" ]

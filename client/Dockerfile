FROM node:16

WORKDIR /usr/src/app

COPY . .

RUN npm ci --no-audit || npm ci --no-audit --maxsockets 1

RUN npm run build

RUN npm install -g serve

CMD ["serve", "dist"]

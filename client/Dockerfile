FROM node:16

WORKDIR /usr/src/app

COPY . .

RUN npm ci --no-audit --legacy-peer-deps || npm ci --no-audit --legacy-peer-deps --maxsockets 1

RUN npm run build

RUN npm install -g serve

EXPOSE 3000

CMD ["serve", "dist"]

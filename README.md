[![Codacy Badge](https://api.codacy.com/project/badge/Grade/590f1314804d489eb8461fc4d294a363)](https://app.codacy.com/gh/dhatGuy/PERN-Store?utm_source=github.com&utm_medium=referral&utm_content=dhatGuy/PERN-Store&utm_campaign=Badge_Grade_Settings)
[![Netlify Status](https://api.netlify.com/api/v1/badges/af46234b-6fba-43f2-808f-e2bbe4b2adf1/deploy-status)](https://app.netlify.com/sites/pern-store/deploys)
[![wakatime](https://wakatime.com/badge/github/dhatGuy/PERN-Store.svg)](https://wakatime.com/badge/github/dhatGuy/PERN-Store)

# PERN STORE

A full-stack e-commerce project built with Postgres, Express, React and Node.

## Swagger API Documentation

[Documentation](https://pern-store.onrender.com/api/docs/)

## Demo

[Run demo](https://pern-store.netlify.app)

## Screenshots

![Homepage Screen Shot](https://user-images.githubusercontent.com/51405947/104136952-a3509100-5399-11eb-94a6-0f9b07fbf1a2.png)

## Database Schema

[![ERD](https://user-images.githubusercontent.com/51405947/133893279-8872c475-85ff-47c4-8ade-7d9ef9e5325a.png)](https://dbdiagram.io/d/5fe320fa9a6c525a03bc19db)

## Run Locally

Clone the project

```bash
  git clone https://github.com/dhatguy/PERN-Store.git
```

Go to the project directory

```bash
  cd PERN-Store
```

Install dependencies

```bash
  npm install
```

Go to server directory and install dependencies

```bash
  npm install
```

Go to client directory and install dependencies

```bash
  npm install
```

Go to server directory and start the server

```bash
  npm run dev
```

Go to client directory and start the client

```bash
  npm run client
```

Start both client and server concurrently from the root directory

```bash
  npm run dev
```

## Run with docker

To use this project make sure you have Docker installed

### Run the development environment

```bash
docker-compose -f docker-compose.dev.yml up
```

### Run the production environment

```bash
docker-compose up
```

Go to http://localhost:3000 to view the app running on your browser.

## Deployment

To deploy this project run

```bash
  npm run deploy
```

Check this article for [guidance](https://dev.to/stlnick/how-to-deploy-a-full-stack-mern-app-with-heroku-netlify-ncb)
on how to deploy.

## Tech

- [React](https://reactjs.org/)
- [Node](https://nodejs.org/en/)
- [Express](http://expressjs.com/)
- [Postgres](https://www.postgresql.org/)
- [node-postgres](https://node-postgres.com/)
- [Windmill React UI](https://windmillui.com/react-ui)
- [Tailwind-CSS](https://tailwindcss.com/)
- [react-hot-toast](https://react-hot-toast.com/docs)
- [react-Spinners](https://www.npmjs.com/package/react-spinners)
- [react-helmet-async](https://www.npmjs.com/package/react-helmet-async)

## Environment Variables

To run this project, you will need to add the following environment variables to your .env files in both client and server directory

#### client/.env

`VITE_GOOGLE_CLIENT_ID`

`VITE_GOOGLE_CLIENT_SECRET`

`VITE_API_URL`

`VITE_STRIPE_PUB_KEY`

### server/.env

`POSTGRES_USER`

`POSTGRES_HOST`

`POSTGRES_PASSWORD`

`POSTGRES_DATABASE`

`POSTGRES_DATABASE_TEST`

`POSTGRES_PORT`

`PORT`

`SECRET`

`REFRESH_SECRET`

`SMTP_FROM`

`STRIPE_SECRET_KEY`

## Contributing

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Feedback

Joseph Odunsi - [@odunsi](https://twitter.com/_odunsi_) - odunsiolakunbi@gmail.com

Project Link: [https://github.com/dhatguy/PERN-Store](https://github.com/dhatguy/PERN-Store)

Demo Link: [https://pern-store.netlify.app](https://pern-store.netlify.app)

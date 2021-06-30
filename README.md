[![Codacy Badge](https://api.codacy.com/project/badge/Grade/590f1314804d489eb8461fc4d294a363)](https://app.codacy.com/gh/dhatGuy/PERN-Store?utm_source=github.com&utm_medium=referral&utm_content=dhatGuy/PERN-Store&utm_campaign=Badge_Grade_Settings)
[![Netlify Status](https://api.netlify.com/api/v1/badges/af46234b-6fba-43f2-808f-e2bbe4b2adf1/deploy-status)](https://app.netlify.com/sites/pern-store/deploys)
[![wakatime](https://wakatime.com/badge/github/dhatGuy/PERN-Store.svg)](https://wakatime.com/badge/github/dhatGuy/PERN-Store)

# PERN STORE

A small full-stack e-commerce project built with Postgres, Express, React and Node.

## API Documentation

[Documentation](https://nameless-journey-88760.herokuapp.com/api/docs/)

## Demo

[Run demo](https://pern-store.netlify.app)

## Screenshots

![Homepage Screen Shot](https://user-images.githubusercontent.com/51405947/104136952-a3509100-5399-11eb-94a6-0f9b07fbf1a2.png)

## ER Diagram

[![ERD](https://user-images.githubusercontent.com/51405947/122548661-8e9fb580-d029-11eb-88d1-8b10506fc4cb.png)](https://dbdiagram.io/d/5fe320fa9a6c525a03bc19db)

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

Start the server

```bash
  npm run server
```

Start the client

```bash
  npm run client
```

Start both client and server concurrently

```bash
  npm run dev
```

## Deployment

To deploy this project run

```bash
  npm run deploy
```

## Running Tests

To run tests, run the following command

```bash
  npm run test
```

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

## Contributing

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

#### client/.env

`REACT_APP_GOOGLE_CLIENT_ID`

`REACT_APP_GOOGLE_CLIENT_SECRET`

`REACT_APP_API_URL`

`REACT_APP_STRIPE_PUB_KEY`

### server/.env

`PGUSER`

`PGHOST`

`PGPASSWORD`

`PGDATABASE`

`PGDATABASE_TEST`

`PGPORT`

`PORT`

`SECRET`

`REFRESH_SECRET`

`GMAIL_EMAIL`

`STRIPE_SECRET_KEY`

`OAUTH_CLIENT_SECRET`

`OAUTH_CLIENT_ID`

`OAUTH_REFRESH_TOKEN`

## Feedback

Joseph Odunsi - [@odunsi](https://twitter.com/_odunsi_) - odunsiolakunbi@gmail.com

Project Link: [https://github.com/dhatguy/PERN-Store](https://github.com/dhatguy/PERN-Store)

Demo Link: [https://pern-store.netlify.app](https://pern-store.netlify.app)

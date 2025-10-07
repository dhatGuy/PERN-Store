# E-COMMERCE STORE

A modern full-stack e-commerce platform built with PostgreSQL, Express, React and Node.js.

## Features

- User authentication (JWT + Google OAuth)
- Product catalog with search and filtering
- Shopping cart functionality
- Order management
- Payment processing (Stripe integration)
- Admin dashboard
- Responsive design

## Screenshots

![Homepage Screen Shot](https://user-images.githubusercontent.com/51405947/104136952-a3509100-5399-11eb-94a6-0f9b07fbf1a2.png)

## Database Schema

[![ERD](https://user-images.githubusercontent.com/51405947/133893279-8872c475-85ff-47c4-8ade-7d9ef9e5325a.png)](https://dbdiagram.io/d/5fe320fa9a6c525a03bc19db)

## Run Locally

Clone the project

```bash
  git clone <your-repository-url>
```

Go to the project directory

```bash
  cd e-commerce-store
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

Go to http://localhost:3000 to view the app running on your browser.

## Running with Docker

Make sure you have Docker and Docker Compose installed.

### Development Environment

```bash
docker-compose -f docker-compose.dev.yml up --build
```

### Production Environment

```bash
docker-compose up --build
```

The application will be available at:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:9000
- **Database**: localhost:5432

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

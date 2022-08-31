# Woebot-Takehome

## Challenge 1 - design and implement an user registration form

Write a simple web application that allow users to register for accounts.

## Details

- Write a web application - backend built using JavaScript/NodeJS/ExpressJS and frontend developed using React.
- Take into consideration input type, validation, data restriction, API, type safety, database schema, responsiveness, CSS, etc.
- Use any additional third party libraries of your choice if needed.
- Include instruction to build, run and test the application if applicable.
- (Bonus) The application is deployed as a public site so that it can be evaluated.

### Stack

- Node, Express, PostgreSQL, React

### Tables in Postgres Database

![Screen Shot 2022-08-30 at 9 52 29 AM](https://user-images.githubusercontent.com/24352472/187495087-7123cadc-3c31-4deb-892b-dc7008ccb09b.png)

### Postgres users table

![Screen Shot 2022-08-30 at 9 52 17 AM](https://user-images.githubusercontent.com/24352472/187495089-53b9dd4e-5247-4d5b-9e2a-d38586651438.png)

### Authenticated Home Page

<img width="2555" alt="Screen Shot 2022-08-30 at 9 51 38 AM" src="https://user-images.githubusercontent.com/24352472/187495091-a23f5aeb-ab06-4cbb-ad53-817dd1719ae9.png">

### Signup Page

<img width="2559" alt="Screen Shot 2022-08-30 at 9 51 13 AM" src="https://user-images.githubusercontent.com/24352472/187495108-6bc166cb-6b7a-4495-b276-5db02134d94b.png">

### Login Page

<img width="2555" alt="Screen Shot 2022-08-30 at 9 51 00 AM" src="https://user-images.githubusercontent.com/24352472/187495111-7a88cf2e-c796-4e83-9ec7-54f94d19d2e4.png">

### Landing Page

<img width="2559" alt="Screen Shot 2022-08-30 at 9 50 47 AM" src="https://user-images.githubusercontent.com/24352472/187495142-f6b1381a-5542-4350-b9b0-009d413795b3.png">

### Lighthouse Score

<img width="2555" alt="Screen Shot 2022-08-30 at 9 32 04 AM" src="https://user-images.githubusercontent.com/24352472/187495154-a4c8fa2a-1d77-4f27-921f-878026b4ffc1.png">

### Client

- Frontend deployed on Firebase
- URL = https://woebot-59455.web.app/

### API

- Backend & Postgres db eployed on Heroku
- URL = https://woebot-api.herokuapp.com

### Flow Chart

![Woebot Auth Chart](https://user-images.githubusercontent.com/24352472/187494443-4c219375-dc26-4d4b-be1b-3b8cacb1cb25.jpeg)

### Build Instructions

##### My coding environment

- Homebrew version: 3.5.9
- nvm version: 0.37.2
- node version: v17.5.0
- npm version: 8.4.1
- postgres version: PostgreSQL 14.2

##### Clone repo

- $ git clone https://github.com/Schow94/Woebot-Takehome.git

#### Client

- npm install (if package.json present)
- Alternatively npm install react-router-dom axios jwt-decode
- URL: localhost:3000/

##### Command to run from root of /client directory

- npm start

#### API

- npm install (if package.json present)
- Alternatively npm install bcrypt body-parser cors dotenv express jsonwebtoken morgan pg
- npm install -g nodemon
- URL: localhost:8000/users

##### Create .env file in root of project directory

- Add 'DATABASE_URL=YOUR_DATABASE_URL_GOES_HERE' to .env file
- Add 'SECRET=RANDOM_SECRET_THATS_UP_TO_YOU' to .env file

##### To use db deployed to Heroku

- In /db/index.js uncomment line 7 "ssl: { rejectUnauthorized: false }"
- In /db/index.js uncomment line 9 "connectionString: process.env.DATABASE_URL"

##### To use local db on machine

- Create a Postgres db & users table on local machine
- Uncomment line 5 in /db/index.js "ssl: process.env.DATABASE_URL ? true : false"
- Comment out line 7 in db/index.js "sl: process.env.DATABASE_URL ? true : false"
- Uncommment lines 9-11 in db/index.js "connectionString:
  process.env.DATABASE_URL ||
  "postgres://stephenchow@localhost:5432/woebot_takehome"," and insert to your credentials

##### Create Postgres db

- CREATE DATABASE woebot_takehome;

##### Create Postgres table

- CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username TEXT UNIQUE,
  password TEXT,
  email TEXT UNIQUE
  );

##### Example command to manually insert into users table

INSERT INTO users (
username,
email,
password
) VALUES (
'test',
'test@test.com',
'testPassword'
);

##### Command to run from root of /api directory

- nodemon app.js

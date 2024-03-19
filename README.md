
# JOBS GONJO

A brief instructions so that we can run this project on a local machine.

## Documentation

Discover a world of melodies on our music website, where rhythm meets passion. Explore a vast library of tracks spanning genres from classical to contemporary. Dive into artist profiles, concert schedules, and curated playlists tailored to your taste. Whether you're a casual listener or a devoted aficionado, immerse yourself in the harmony of sound with our platform.

## Demo
Live Site:
https://relaxa-music-client.vercel.app/

# Features

## User Role
1. Admin
2. Member

## Authentication
- Create account as a Member
- Account also Create with Google.
 
## Admin Account Features

- Create new Song, Also can Get and Delete the Song.
- Add albums, Artists and admin Also can Get and Delete.
- Make Member to Admin, Delete a Member.
- Admin can Search users.
- Can also access Recommended, Trending page and listen that songs.

## Member Account Features

- Member can listen all the music
- Search by song, album or artist name. 
- Can also access Recommended, Trending page and listen that songs.


## Run Locally

Clone the project

```bash
  git clone https://github.com/MohammadApon11/jobs-portal
```

Go to the client side

```bash
  cd jobs-gonjo-client
```

Install dependencies

```bash
  yarn add or npm install
```

Start Locally

```bash
  yarn start or npm start
```
Go to the server side

```bash
 cd jobs-gonjo-server
```

Install dependencies

```bash
  yarn add or npm install
```
Start Locally

```bash
  yarn start or npm start
```
## If we want to integrate the client and server side together and run the local machine, then we need to change the base url at 9 places on the client side, Otherwise, we can run it on the local machine by just starting the client side, then the API endpoint's request response will be sent directly Come From vercel.

#### This is the main url, https://jobserver-xyvn.onrender.com/ change to http://localhost:5000/

```http
1.   /src/components/AllJobs.jsx in this file 2 places url need change.
```

```http
2.  /src/components/SingleJobs.jsx
```

```http
3.  /src/context/AuthProviders.jsx
```

```http
4.  /src/hooks/useAppliedMyJobs.js
```

```http
5.  /src/hooks/useAxiosSecure.js
```

```http
6.  /src/hooks/useGetUser.js
```

```http
7.  /src/hooks/useSaveUser.js
```

```http
8.  /src/pages/login/Login.jsx
```
## Environment Variables

To run this project, you will need to add the following environment variables to your server side .env file

`DB_USER`

`DB_PASS`

`ACCESS_TOKEN_SECRET`
## Deployment

Client side deploy in vercel that linking in git repository

Server side deploy in also vercel

```bash
  vercel
```
## Used Dependencies

### Client side
- react
- react-dom
- react-router-dom
- react-scripts
- axios
- react-spinners
- sweetalert2
- web-vitals
- react-icons-kit
- react-icons
- react-hot-toast
- react-hook-form
- emotion/react
- emotion/styled
- material-ui/core
- mui/icons-material
- mui/material
- mui/system
- react-spring/web
- testing-library/jest-dom
- testing-library/react
- testing-library/user-event
- firebase
### Server side
- express
- mongodb
- jsonwebtoken
- cors
- dotenv
- morgan


# RELAXA MUSIC
A brief instructions so that we can run this project on a local machine.

## for testing 
admin credential :
email: wegro@admin.com
password: 123435aA!

member credential: 
email: wegro@member.com
password: 123435aA!

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
  git clone https://github.com/MohammadApon11/relaxa-music
```

Go to the client side

```bash
  cd client
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
 cd server
```

Install dependencies

```bash
  yarn add or npm install
```
Start Locally

```bash
  yarn dev or npm start
```
## If we want to integrate the client and server side together and run the local machine, then we need to change the base url at 1 places on the client side, Otherwise, we can run it on the local machine by just starting the client side, then the API endpoint's request response will be sent directly Come From vercel.

#### This is the main url, https://relaxa-music-server.vercel.app/ change to http://localhost:5000/

```http
1.   /src/api/ change base url to localhost server url.
```

## Environment Variables
To run this project, you will need to add the following environment variables to your server side .env file

DB_STRING2=mongodb+srv://admin:5Jdai3ETjfLTbIlA@cluster0.9qzghgm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

## Deployment
Client side deploy in vercel that linking in git repository

Server side deploy in also vercel

```bash
  vercel
```
## Used Dependencies

### Client side
- axios
- react-h5-audio-player
- tailwindcss
- react
- react-dom
- react-router-dom
- react-scripts
- react-icons
- react-hook-form
- testing-library/jest-dom
- testing-library/react
- testing-library/user-event
- firebase

### Server side
- express
- mongoose
- cors
- dotenv
- nodemon
- firebase-admin

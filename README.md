# Family Web

Recreate the Creery Family Web in node.js, JS, and Vue.js

:warning: Under Development

## Setup

```
git clone https://github.com/phcreery/Family_Web_Vue

cd Family_Web_Vue/client
npm install
cd ..
cd server
npm install
```


Environment Variables

```
client: {
  host: HOST default: 'localhost'
  port: PORT default: 8080, if port is in use, a free one will be determined
}

mongodb : {
  host: DB_HOST
  database: DB_NAME
  user: DB_USER
  password: DB_PASS
  authdb: DB_AUTH
}

authentication: {
  jwtSecret: JWT_SECRET
}

dir: {
  images: DIR_IMG,
  videos: DIR_VID,
  files: DIR_FILES,
  movies: DIR_MOVIES,
  music: DIR_MUSIC
}
```

## /client

Holds Vue client-side rendered files

To start: `npm start`

## /server

Handles server requests over express and MongoDB connection

To start: `npm start`



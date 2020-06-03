# Family_Web_Vue
Recreate Creery Family_Web in node.js, JS, and Vue.js

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

mongodb Environment Variables: {
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
  images: 'C:/Users/phcre/Documents/JS/Family_Web_Vue/server/family_images',
  videos: 'C:/Users/phcre/Documents/JS/Family_Web_Vue/server/videos',
  supportedVideoFormats: ['.mp4'],
  files: 'C:/Users/phcre/Documents/JS/Family_Web_Vue/server/files',
  movies: '',
  music: 'C:/Users/phcre/Documents/JS/Family_Web_Vue/server/music'
}




## /client
To start: `npm start`
### Dependencies
- [vue.js](https://vuejs.org/) - Front End Framework
  - [vuex](https://vuex.vuejs.org/) - vue state manager
  - [vuetify](https://vuetifyjs.com/en/) - Material Design component framework for Vue.js
  - [vue-router]() - Vue.js' page request server
- [axios](https://github.com/axios/axios) - Promise based HTTP client for the browser and node.js
- [Howler]() - Audio Library
- [vue-awesome-swiper]() - awesome-swiper slideshow/carousel for vue

### To add a page
todo

### To add an API connection
todo


## /server
To start: `npm start`
### Dependencies

- [express.js](https://expressjs.com/) - Minimal web framework for node.js
- [bcrypt-nodejs]() - Crypto engine for password hashing, token generation & validation
- [cors]() - 
- [ffmetadata]() - library for reading file metadata
- [morgan]() - HTTP request logger middleware for node.js express.js
- [nodemon](https://nodemon.io/) - Nodemon is a utility that will monitor for any changes in your source and automatically restart your server.

## To add an API endpoint
todo

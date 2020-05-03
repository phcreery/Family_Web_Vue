const AuthenticationController = require('./controllers/AuthenticationController')
const MusicController = require('./controllers/MusicController')
const VideoController = require('./controllers/VideoController')
const PhotoController = require('./controllers/PhotoController')


const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')
const fs = require('fs');
const { readdirSync } = require('fs')
// const { join } = require('path')
// const path = require('path');
const express = require('express');
// const ffmetadata = require('ffmetadata');
// const asyn = require('async');
// var { exec }  = require('child_process');
// var imageThumbnail = require('image-thumbnail');
const config = require('./config/config')
const multer = require("multer")
// var videoupload = multer({ dest: 'uploads/' })


module.exports = (app) => {
  
  app.get('/test', (req, res) => {
    res.send(
      "Hello World"
    )
  })


  // ############  AUTH  ############

  app.post('/register', AuthenticationControllerPolicy.register, AuthenticationController.register)
  
  app.post('/login', AuthenticationController.login)

  // ############  PHOTOS  ############

  app.get('/famphoto', PhotoController.getfamphoto)

  app.get('/famphoto/:name', PhotoController.getfamphotobyname)

  // ############  MUSIC  ############

  app.use('/music', express.static('music'));

  app.get('/musiclist', MusicController.getmusiclist)

  // ############  VIDEO  ############

  app.use('/video', express.static(config.dir.videos));

  app.get('/videofolderlist', VideoController.getlistofvideofolders)

  app.delete('/videofolder', VideoController.deletevideofolder)

  app.post('/videofolderlist/:name', VideoController.makenewfolder)

  app.get('/videolist/:name', VideoController.getlistofvideosbyfoldername)

// https://stackabuse.com/handling-file-uploads-in-node-js-with-expres-and-multer/
  app.post("/videolist/:name", VideoController.uploadvideo);

  // ############  FILES  ############

  app.get('/folderlist', function(req, res){
    const getDirectories = source =>
      readdirSync(source, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name)
    let files = getDirectories(config.dir.files)
    console.log(files)
    let data = []
    for(var file in files){
      data.push({name: files[file]});
    }
    res.json(data);
    res.end();
  })

  app.get('/folder/:name', function(req, res){
    console.log(config.dir.files + '/' + req.params.name);
    res.sendFile(config.dir.files + '/' + req.params.name);
  })


  app.get('/', (req, res) => {
    res.send(
      "You have landed on the Full Stack applicaiton server-side instance. This can be opened for API usage"
    )
  })

}
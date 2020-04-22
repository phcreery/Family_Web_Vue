const AuthenticationController = require('./controllers/AuthenticationController')
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')
const fs = require('fs');
const { lstatSync, readdirSync } = require('fs')
const { join } = require('path')
var path = require('path');
const express = require('express');
const ffmetadata = require('ffmetadata');
const asyn = require('async');
var { exec }  = require('child_process');
var imageThumbnail = require('image-thumbnail');
const config = require('./config/config')

module.exports = (app) => {

  app.post('/register', 
    AuthenticationControllerPolicy.register,
    AuthenticationController.register)
  
  app.post('/login', 
  AuthenticationController.login)
  
  app.get('/test', (req, res) => {
    res.send(
      "Hello World"
    )
  })

  app.get('/famphoto', function(req, res){
    fs.readdir(config.dir.images, function(err, items) {
      res.json(items);
    })
  })

  app.get('/famphoto/:name', function(req, res){
    console.log(config.dir.images + '/' + req.params.name);
    res.sendFile(config.dir.images + '/' + req.params.name);
  })

  app.use('/music', express.static('music'));

  app.get('/musiclist', function(req,res){
    let data = [];
    fs.readdir(config.dir.music, function(err, items) {
      asyn.map(items, function(item, callback) {
        ffmetadata.read(config.dir.music + '/' + item, callback);
      },
      function(err, metadata){
        if(err){
          console.log(err)
        }
        // console.log(metadata); 
          for(let i in metadata){      
            data.push({name: items[i], title: metadata[i].title, album: metadata[i].album, artist: metadata[i].album_artist, duration: metadata[i].TLEN, howl: null, display:true});
          }
          res.json(data);
          res.end();
        });
    });
  });

  app.use('/video', express.static(config.dir.videos));

  app.get('/videolist', function(req, res){
    let data = [];
    console.log(config.dir.videos)
    fs.readdir(config.dir.videos, function(err, items) {
      console.log(items)
      asyn.map(items, function(item, callback) {
        ffmetadata.read(config.dir.videos + '/' + item, callback);
      },
      function(err, metadata){
        for(var i in metadata){
          data.push({name: items[i], title: metadata[i].title});
        }
        res.json(data);
        res.end();
      });
    });
  });


  app.get('/folderlist', function(req, res){
    const getDirectories = source =>
      readdirSync(source, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name)
    console.log(getDirectories(config.dir.files))
    res.json(getDirectories(config.dir.files));
    res.end();
  })

  app.get('/folder/:name', function(req, res){
    console.log(config.dir.files + req.params.name);
    res.sendFile(config.dir.files + req.params.name);
  })


  app.get('/', (req, res) => {
    res.send(
      "You have landed on the Full Stack applicaiton server-side instance. This can be opened for API usage"
    )
  })

}
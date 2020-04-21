const AuthenticationController = require('./controllers/AuthenticationController')
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')
const fs = require('fs');
var path = require('path');
const express = require('express');
const ffmetadata = require('ffmetadata');
const asyn = require('async');
var { exec }  = require('child_process');
var imageThumbnail = require('image-thumbnail');

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
    fs.readdir('./family_images', function(err, items) {
      res.json(items);
    })
  })

  app.get('/famphoto/:name', function(req, res){
    console.log(process.cwd() + '/family_images/' + req.params.name);
    res.sendFile(process.cwd() + '/family_images/' + req.params.name);
  })

  app.use('/music', express.static('music'));

  app.get('/musiclist', function(req,res){
    let data = [];
    fs.readdir('./music', function(err, items) {
      asyn.map(items, function(item, callback) {
        ffmetadata.read('./music/' + item, callback);
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

  app.use('/video', express.static('videos'));

  app.get('/videolist', function(req, res){
    let data = [];
    fs.readdir('./videos', function(err, items) {
      asyn.map(items, function(item, callback) {
        ffmetadata.read('./videos/' + item, callback);
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

  app.get('/thumbnail/:name', function(req, res){
    if(path.parse(req.params.name).ext == '.mp4'){
      var video = req.params.name;
      video = path.parse(video).name;
      fs.access('./thumbnails/' + video + '.jpg', fs.F_OK, function(err){
        if(err){
          exec(`ffmpeg -i video/${video}.mp4 -ss 00:00:04.00 -r 1 -an -vframes 1 -f mjpeg thumbnails/${video}.jpg`, (error, stdout, stderr) => {
            if (error) {
              console.log(error);
              return;
            } 
            res.sendFile(__dirname + '/thumbnails/' + video + '.jpg');
          });
        }else{
          res.sendFile(__dirname + '/thumbnails/' + video + '.jpg');
        }
      });
    }
    else if(path.parse(req.params.name).ext == '.jpg'){
      var image = req.params.name;
      res.set({'Content-Type': 'img/jpeg'});
      imageThumbnail(__dirname + '/family_images/' + image)
        .then(thumbnail => {
            res.send(thumbnail);
        })
        .catch(err => console.error(err));
      //res.sendFile(__dirname + '/family_images/' + image);
    }
  });





  app.get('/', (req, res) => {
    res.send(
      "You have landed on the Full Stack applicaiton server-side instance. This can be opened for API usage"
    )
  })

}
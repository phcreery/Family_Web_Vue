const AuthenticationController = require('./controllers/AuthenticationController')
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')
const fs = require('fs');
const express = require('express');
const ffmetadata = require('ffmetadata');
const asyn = require('async');

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
            console.log(metadata); 
              for(let i in metadata){      
                  data.push({name: items[i], title: metadata[i].title, album: metadata[i].album, artist: metadata[i].album_artist, duration: metadata[i].TLEN, howl: null, display:true});
              }
              res.json(data);
              res.end();
          });
      });
  });

  app.get('/', (req, res) => {
    res.send(
      "You have landed on the Full Stack applicaiton server-side instance. This can be opened for API usage"
    )
  })

}
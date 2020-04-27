const AuthenticationController = require('./controllers/AuthenticationController')
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')
const fs = require('fs');
const { lstatSync, readdirSync } = require('fs')
// const { join } = require('path')
// var path = require('path');
const express = require('express');
const ffmetadata = require('ffmetadata');
const asyn = require('async');
// var { exec }  = require('child_process');
// var imageThumbnail = require('image-thumbnail');
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

  app.get('/videofolderlist', function(req, res){
    const getDirectories = source =>
      readdirSync(source, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name)
   
    let folders = getDirectories(config.dir.videos)

    console.log('folders: ', folders)
    let data = []
    for(let folder in folders){
      let count = fs.readdirSync(config.dir.videos + '/' + folders[folder]).length
      
      console.log(config.dir.videos + '/' + folders[folder], count)
      data.push({name: folders[folder], display: true, info: {Files: count}})
    }
    res.json(data);
    res.end();
  })

  app.get('/videolistold/:name', function(req, res){
    let data = [];
    console.log(config.dir.videos + '/' + req.params.name)
    fs.readdir(config.dir.videos + '/' + req.params.name, function(err, items) {
      console.log(items)
      asyn.map(items, 
        function(item, callback) {
          console.log("item: ", item, item.substr(item.length - 4), config.dir.supportedVideoFormats.includes(item.substr(item.length - 4)))
          // if(config.dir.supportedVideoFormats.includes(item.substr(items.length - 3)) ){
            ffmetadata.read(config.dir.videos + '/' + req.params.name + '/' + item, callback);
          // }
        },
        function(err, itemswithmetadata){
          console.log("metadata: ", itemswithmetadata)
          for(var i in itemswithmetadata){
            
            // if(config.dir.supportedVideoFormats.includes(items[i].substr(items[i].length - 3)) ){
              
              data.push({name: items[i], title: itemswithmetadata[i].title, display: true});
            // }
          }
          res.json(data);
          res.end();
        });
    });
  });






  app.get('/videolisttest/:name', function(req, res){
    let data = [];
    console.log(config.dir.videos + '/' + req.params.name)
    let a = fs.readdir(config.dir.videos + '/' + req.params.name, function(err, items) {
      console.log(items)
      let datar = items.filter( function (item) {
        console.log('filter: ', item, item.substr(item.length - 4), config.dir.supportedVideoFormats.includes(item.substr(item.length - 4)))
        return config.dir.supportedVideoFormats.includes(item.substr(item.length - 4))
      })
      .map( function(item) {
        console.log("item: ", item)
        // if(config.dir.supportedVideoFormats.includes(item.substr(items.length - 3)) ){
        ffmetadata.read(config.dir.videos + '/' + req.params.name + '/' + item, function (err, itemswithmetadata) {
          // console.log("metadata: ", itemswithmetadata)
          // for(var i in itemswithmetadata){ 
            
            console.log(item, {name: item, title: itemswithmetadata.title, display: true})
            data.push({name: item, title: itemswithmetadata.title, display: true});
            return {name: item, title: itemswithmetadata.title, display: true}
          // }
            // res.json(data);
            // res.end();
        });
        // console.log('b: ', b)
        console.log('data:', data)
        // return data
      });
      
      console.log("send:", datar)
      // Promise.all(datar).then( () => console.log('Result: ', data))
      console.log('data:', data)
    });
    console.log('a ', a)
    
  });



  app.get('/videolist/:name', function(req, res){
    let data = [];
    // console.log(config.dir.videos + '/' + req.params.name)
    fs.readdir(config.dir.videos + '/' + req.params.name, function(err, items) {
      // console.log(items)
      asyn.waterfall([
        function (callback) {
          var newitems = items.filter( function (item) {
            console.log('filter: ', item, item.substr(item.length - 4), config.dir.supportedVideoFormats.includes(item.substr(item.length - 4)))
            return config.dir.supportedVideoFormats.includes(item.substr(item.length - 4))
            // callback(null, config.dir.supportedVideoFormats.includes(item.substr(item.length - 4)))
          })
          // console.log('newitems:', newitems)
          callback(null, newitems)
        },
        function (filtereditems, callback) {
          // console.log('filtereditems: ', filtereditems)
          asyn.map(filtereditems, 
            function (item, innercallback) {
              // console.log("item: ", item, config.dir.videos + '/' + req.params.name + '/' + item)
              ffmetadata.read(config.dir.videos + '/' + req.params.name + '/' + item, innercallback)
            }, function(err, results) {
              // console.log('inner results', results)
              callback(null, filtereditems, results)
            }
          )
          // console.log('data: ', data)
        }], function (err, items, itemswithmetadata) {
          // console.log('results: ', items, itemswithmetadata)
          for(var i in itemswithmetadata){ 
              data.push({name: items[i], title: itemswithmetadata[i].title, display: true});
          }
          console.log('data: ', data)
          res.json(data);
          res.end();
        }
      )

  })
})




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
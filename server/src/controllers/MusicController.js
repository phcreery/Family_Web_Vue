// const { lstatSync, readdirSync } = require('fs')
const fs = require('fs');
const config = require('../config/config')
const ffmetadata = require('ffmetadata');
const asyn = require('async');


module.exports = {
    getmusiclist (req, res) {
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
    }
}

const { readdirSync } = require('fs')
const config = require('../config/config')
const fs = require('fs');
// const asyn = require('async');
// const ffmetadata = require('ffmetadata');
// const multer = require("multer")


module.exports = {
  async readdircontents (req, res) {
    // var path = req.body.path
    // var path = 'C:\\Users\\phcre\\Documents\\GameBoy'
    var path = config.dir.files
    let list = []
    // let list = fs.readdirSync(path)
    fs.readdir(path, function(err, items) {
      console.log(items);
      for (var i=0; i<items.length; i++) {
          console.log(items[i]);
          list.push(items[i])
      }
      console.log('list', list)
      res.send(list)
      res.end();
    });
  },

  async readdircontents2 (req, res) {
    // var path = req.body.path
    var path = 'C:\\Users\\phcre\\Documents\\GameBoy'
    // var path = config.dir.files
    const getDirectories = source =>
      readdirSync(source, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => {return {name: dirent.name, display: true}})
    const getFiles = source =>
      readdirSync(source, { withFileTypes: true })
        .filter(dirent => !dirent.isDirectory())
        .map(dirent => {return {name: dirent.name, display: true}} )
  
    let folders = getDirectories(path)
    let files = getFiles(path)
    console.log(folders,files)
    res.send({folders,files})
    res.end()
  },

  readdircontents3 (req, res) {
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
  }

}

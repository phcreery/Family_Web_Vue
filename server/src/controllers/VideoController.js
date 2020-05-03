const { readdirSync } = require('fs')
const config = require('../config/config')
const fs = require('fs');
const asyn = require('async');
const ffmetadata = require('ffmetadata');

module.exports = {

  getlistofvideofolders (req, res) {
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
  },

  deletevideofolder (req, res){
    let path = config.dir.videos + '/' + req.body.dir
    console.log('Deleting: ', path)
    fs.rmdir(path, { recursive: true }, function () {
      res.send('success')
    });
    // res.send('success')
  },

  makenewfolder (req, res) {
    // let dir = req.body.dir
    let dir = config.dir.videos + '/' + req.params.name
    if (!fs.existsSync(dir)){
      fs.mkdirSync(dir);
      res.status('200').send('success')
    } else {
      res.status('500').send('cannot be done')
    }
  },

  getlistofvideosbyfoldername (req, res){
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
}


}
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
      // console.log('list', list)
      res.send(list)
      res.end();
    });
  },

  async readdircontents2 (req, res) {
    // var path = req
    var path = req.query.path
    // console.log('Received path: ', path)
    if (typeof path === 'undefined') {
      path = config.dir.files
    } else {
      path = config.dir.files + '/' + path
    }
    // console.log('Readign folders and files from ', path)
    // var path = 'C:\\Users\\phcre\\Documents\\GameBoy'
    const getDirectories = source =>
      readdirSync(source, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => {return {name: dirent.name, display: true, icon: 'mdi-folder'}})
    const getFiles = source =>
      readdirSync(source, { withFileTypes: true })
        .filter(dirent => !dirent.isDirectory())
        .map(dirent => {
          var icon = 'mdi-file'
          switch ( dirent.name.split('.').pop().toLowerCase() ) {
            case 'zip':
              icon = 'mdi-zip-box'
              break
            case 'doc':
            case 'docx':
            case 'txt':
            case 'md':
              icon = 'mdi-file-document-outline'
              break
            case 'json':
              icon = 'mdi-code-json'
              break
            case 'c':
            case 'js':
            case 'cpp':
            case 'vue':
            case 'jsx':
            case 'py':
            case 'pyc':
            case 'ts':
            case 'ps1':
            case 'sh':
            case 'bat':
              icon = 'file-code'
              break
            case 'png':
            case 'jpg':
            case 'jpeg':
            case 'ps':
            case 'bmp':
            case 'raw':
            case 'nef':
            case 'crw':
            case 'cr2':
            case 'cr3':
            case 'ciff':
              icon = 'image'
              break
            case 'pdf':
              icon = 'mdi-file-pdf'
              break
            case 'dxf':
            case 'dwg':
            case 'svg':
              icon = 'mdi-drawing-box'
              break
            case 'xls':
            case 'xlsx':
              icon = 'mdi-table-large'
              break
            default:
              icon = 'mdi-file'
              break
          }
          return {name: dirent.name, display: true, icon: icon, thumb: icon}
        })
  
    let folders = getDirectories(path)
    let files = getFiles(path)
    // console.log(folders,files)
    res.send({folders,files})
    res.end()
  },

  readdircontents3 (req, res) {
    const getDirectories = source =>
      readdirSync(source, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name)
    let files = getDirectories(config.dir.files)
    // console.log(files)
    let data = []
    for(var file in files){
      data.push({name: files[file]});
    }
    res.json(data);
    res.end();
  },


  createdir (req, res) {
    console.log('creating dir:', req.body.dir)
    // let dir = req.body.dir
    let dir = config.dir.files + '/' + req.body.dir
    if (!fs.existsSync(dir)){
      fs.mkdirSync(dir);
      res.status('200').send('success')
    } else {
      res.send('Folder already exists')
    }
    // res.status('200').send('success')
  },


  deletefolder (req, res) {
    // console.log('deleting dir:', req.body.dir)
    let dir = config.dir.files + req.body.dir
    console.log('deleting dir:', dir)
    fs.rmdirSync(dir, { recursive: true });
    res.status('200').send('success')

  },

  deletefile (req, res) {
    console.log('deleting dir:', req.body)
    // let dir = config.dir.files + '/' + req.body.dir
    // fs.rmdirSync(dir, { recursive: true });

  }

}

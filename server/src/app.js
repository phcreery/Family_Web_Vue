const express = require('express')  //  backend route manager/site server
const bodyParser = require('body-parser')
const cors = require('cors')      //  some security thing?
const morgan = require('morgan')  //  for debugging
const {sequelize} = require('./models') //  sql connector
const config = require('./config/config') // server config properties

const app = express()
app.use(morgan('combined')) //  formatting for debugging site hits
app.use(bodyParser.json())  
app.use(cors())

// import routes.js for URL routing. Passes 'app' object
require('./routes')(app)

// connect to sql db then run function that starts server on port defined in ./config/config.js
//  add {force: true} in () of .sync to clear database
sequelize.sync()
  .then(() => {
    app.listen(config.port)
    console.log(`Server Started on port ${config.port}`)
    })

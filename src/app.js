require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const { NODE_ENV } = require('./config')
const userRouter = require('./user/user-router')
const movieRouter = require('./movie/movie-router')
const knex = require('knex')
const jwt = require('jsonwebtoken')

var corsOptions = {
    origin: 'https://movie-ouija.vercel.app',
    optionsSuccessStatus: 200 
  }

const knexInstance = knex({
    client: 'pg',
    connection: process.env.DATABASE_URL
})

//console.log('knex and driver installed correctly')
knexInstance('movies').select('*')
.then(result => {
    console.log(result)
})

const app = express()

const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';

app.use(morgan(morganOption))
app.use(helmet())
app.use(cors(corsOptions))

app.use(userRouter)
app.use(movieRouter)

app.get('/', (req, res) => {
    res.send('Hello, world!')
})



app.use(function errorHandler(error, req, res, next){
    let response
    if(NODE_ENV === 'production'){
        response = {error: { message: 'server error'}}
    } else {console.error(error)
        repsonse = {message: error.message, error}
    }
    res.status(500).json(response)
})

module.exports = app
require('dotenv').config
const express = require('express')
const { uuid } = require('uuidv4')
const knex = require('knex')
const jwt = require('jsonwebtoken')

const movieRouter = express.Router()
const bodyParser = express.json()

const knexInstance = knex({
    client: 'pg',
    connection: process.env.DB_URL 
})

findUser = (email) => {
    let id = null;
    return knexInstance('users').select('user_id') 
    .from('users')
    .where('email', email)
    .first()
    .then(result => {
        
        return result.user_id;
    })
}

findMovie = (title, genre) => {
    let id = null;
    return knexInstance('movies').select('movie_id')
    .from('movies')
    .where("title", title)
    .andWhere("genre", genre)
    .first()
    .then(result => {
        
        return result.movie_id
    })
}

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]
    if (token === null) {
        res.sendStatus(401)
    }
    console.log(token)
    jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next()
    })
    }

movieRouter
.route('/movies/add')
.post(bodyParser, authenticateToken, async (req, res) => {
    try {
        const movie = {title: req.body.title, genre: req.body.genre}
        
        console.log(req.user.name)
        
        knexInstance('movies').select('*')
        .from("movies")
        .where("title", movie.title)
        .andWhere("genre", movie.genre)
        .then(result => { 
            if(result.length === 0){
                return knexInstance("movies").insert(movie)  
            }
        })
        .then(async () => {  
            const userMovie = {user_id: await findUser(req.user.name), movie_id: await findMovie(req.body.title, req.body.genre)}     
            const finalMovie = {movie_id: await findMovie(req.body.title, req.body.genre), title: req.body.title, genre: req.body.genre}
            knexInstance("usermovies").select('*')
            .from("usermovies")
            .where("user_id", userMovie.user_id)
            .andWhere("movie_id", userMovie.movie_id)
            .then(result => {
                if(result.length === 0) {
                    knexInstance("usermovies").insert(userMovie)
                    .then( () => {
                    res.send(finalMovie)
                    }
                    )
                } else {
                    res.send("movie already added to userMovies")  
                }
            })
            }
        )
    } catch (e) {
        res.status(500).send(e.stack)   
    }
})

movieRouter
.route('/movies')
.get(bodyParser, authenticateToken, async (req, res) => {
    knexInstance('movies')
    .join('usermovies', 'usermovies.movie_id', '=', 'movies.movie_id')
    .select('movies.title', 'movies.genre', 'movies.movie_id')
    .where('usermovies.user_id', req.user.user_id)
    .then(result => {
        res.status(201).send(result)
    })
    })

movieRouter
.route('/movies/delete')
.delete(bodyParser, authenticateToken, async (req, res) => {
    console.log('user:', req.user, 'body:', req.body)
    knexInstance('usermovies')
    .where('user_id', req.user.user_id)
    .andWhere('movie_id', req.body.id)
    .del()
    .then(result => {
        res.status(201).send('deleted')
    })
})   

module.exports = movieRouter     
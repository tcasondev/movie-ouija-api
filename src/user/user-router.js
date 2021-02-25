require('dotenv').config
const express = require('express')
const uuid = require('uuid')
const knex = require('knex')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userRouter = express.Router()
const bodyParser = express.json()

const knexInstance = knex({
    client: 'pg',
    connection: process.env.DATABASE_URL
})

function authenticateToken(req, res, next) {
const authHeader = req.headers['authorization'];
const token = authHeader && authHeader.split(' ')[1]
if (token === null) {
    res.sendStatus(401)
}
jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
if (err) return res.sendStatus(403);
req.user = user;
next()
})
}


userRouter
.route('/user/create')
.get((req, res) => {
    knexInstance('users').select('*')
    .then(result => {
        res.send(result)
    }).catch(
        err => console.log(err.detail)
    )
})

.post(bodyParser, async (req, res) =>{
    try {
        const salt = await bcrypt.genSalt()
        const hashedPass = await bcrypt.hash(req.body.password, salt)
        const user = {email: req.body.email, user_name: req.body.name, user_password: hashedPass}
        
        knexInstance('users').select('*')
        .from("users")
        .where("email", user.email)
        .then(result => { 
            if(result.length === 0){
                knexInstance("users").insert(user)
                .then(
                res.status(201).send('Account created')
                )
            } else {
                res.status(400).send('The User Already Exists')
            }
        })
    } catch {
        res.status(500).send('crypterr')
    }
})

userRouter
.route('/user/login')
.post(bodyParser, async (req, res) => {
const getPass = async () => {
    return knexInstance('users').select('user_password', 'user_id')
        .from("users")
        .where("email", req.body.email)
        .first()
    }
const userPass = await getPass();
console.log(userPass)
const username = req.body.email;
const user = {name: username, user_id: userPass.user_id};    
const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN)
if (await getPass() === undefined) {
    return res.status(404).send('User not found')
} else {
    try {
        if(await bcrypt.compare(req.body.password, userPass.user_password)){
            return res.status(201).json(accessToken)
        } else {
            return res.status(401).send('Incorrect Password')
        }
        } catch {
            return res.status(500).send('crypterr')    
    }
}
})



module.exports = userRouter
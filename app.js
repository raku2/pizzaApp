const express = require('express');
const cors = require('cors');
const app = express();

const PORT = 3000;

app.use(express.json());
app.use(cors());

require('./DB/config')();

const UsersRoute = require('./Routes/users.route');
const TopicsRoute = require('./Routes/topics.route');
const PostsRoute = require('./Routes/posts.route');

const {ExpirePost} = require('./Controllers/PostController');
ExpirePost(); //ExpirePosts function always called when script run

require('dotenv').config();
const Jwt = require("jsonwebtoken");
const jwtKey = process.env.SECRET_KEY;

function auth(req, res, next) {
    let token = req.headers['authorization'];
    if (token) {
        //token = token.split(' ')[1];
        Jwt.verify(token, jwtKey, (error, valid) => {
            if (error) {
                res.send('please provide valid token');
            } else {
                next();
            }
        });
    } else {
        res.send('please add token with header');
    }
}

app.use('/user',UsersRoute);
app.use('/topic',[auth],TopicsRoute);
app.use('/post',[auth],PostsRoute);

console.log('Running at Port: ' + PORT);
app.listen(PORT);
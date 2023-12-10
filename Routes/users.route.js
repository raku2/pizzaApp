const express = require("express");

const router = express.Router();
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

const UsersController = require("../Controllers/UsersController");

router.post("/Registration",UsersController.Registration);
router.post("/Login",UsersController.Login);
router.get("/ListUsers",[auth],UsersController.ListUsers);

module.exports = router;
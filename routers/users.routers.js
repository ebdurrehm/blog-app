const express = require('express');
const Router = express.Router();

//Users controllers

const signUpCon = require("./../controllers/signUp");
const uploadUserCon = require("./../controllers/uploadUser");
const loginCon = require('./../controllers/login');
const compareLoginCon = require('./../controllers/loginUser');
const logoutCon = require('./../controllers/logout');
const userPageCon = require('./../controllers/userPage');
const getAuthorsCon = require('./../controllers/getTeam');
const postAuthorCon = require('./../controllers/postAuthor');

//midleware
const auth = require('./../middleware/auth');

Router.get("/user/register", signUpCon);
Router.get("/blog/user/login", auth, loginCon);
Router.post("/user/register/in", uploadUserCon);
Router.post('/blog/user/login', compareLoginCon);
Router.get('/user/logout', logoutCon);
Router.get('/users/:id', userPageCon);
Router.get('/users/author', getAuthorsCon);
Router.post('/users/author/new', postAuthorCon);


module.exports = Router;
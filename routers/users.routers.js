const express = require('express');
const Router = express.Router({mergeParams:true});
const passport=require('passport');
//Users controllers

const signUpCon = require("./../controllers/signUp");
const uploadUserCon = require("./../controllers/uploadUser");
const loginCon = require('./../controllers/login');
const compareLoginCon = require('./../controllers/loginUser');
const logoutCon = require('./../controllers/logout');
const userPageCon = require('./../controllers/userPage');
const getAuthorsCon = require('./../controllers/getTeam');
const postAuthorCon = require('./../controllers/postAuthor');
const checkLogin = require('./../middleware/checkLogin');
const loginLocal=require('./../controllers/loginLocal.controller');
//midleware
const auth = require('./../middleware/auth');

function ensureAuthenticated(req, res, next){
    if(req.isAuthenticated()){
      res.render(process.cwd() + 'index');
      next();
    };
    res.redirect('/');
  };

Router.get("/user/register",checkLogin, signUpCon);
Router.get("/blog/user/login", checkLogin, loginCon);
Router.post("/user/register/in", uploadUserCon);
Router.post('/blog/user/login', compareLoginCon);
Router.get('/user/logout', logoutCon);
Router.get('/users/author', getAuthorsCon);
Router.post('/users/author/new', postAuthorCon);
Router.get('/users/profile', auth, userPageCon);
Router.get('/auth/local',checkLogin,loginLocal);
Router.get('/auth/github/',passport.authenticate('github'));
Router.get('/auth/github/callback',passport.authenticate('github',{failureRedirect:'/blog/'}),(req,res)=>{
    req.session.userId=req.user.social_id;
    res.redirect('/blog/');
})

module.exports = Router;
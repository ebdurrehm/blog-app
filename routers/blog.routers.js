const express = require('express');
const Router = express.Router({mergeParams:true});

//blog controllers
const indexPageCon = require("../controllers/indexPage");//get all posts from database
const getPostCon = require("../controllers/getPost");//get post
const getTagCon = require('../controllers/getTagCon');
const sizeCon = require('./../controllers/sizeCon');

Router.get('/blog/:slug', getPostCon);
Router.get('/blog', indexPageCon);
Router.get('/blog/tags/:tag', getTagCon);
Router.get('/blog.json', sizeCon);

module.exports = Router;
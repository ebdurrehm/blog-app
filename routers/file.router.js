const express = require('express');
const Router = express.Router({mergeParams:true});
const downloadCV = require('../controllers/downloadCv.controller');

Router.get('/download',downloadCV);

module.exports= Router;
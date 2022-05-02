const express = require('express');
const Router = express.Router({mergeParams:true});

//Admin controllers
const getAdminCon = require('./../controllers/getAdminCon');
const postAdminCon = require('../controllers/postAdminCon');
const searchCon = require('./../controllers/search');
const updateCon = require('./../controllers/update');
const uploadDataCon = require("./../controllers/uploadData"); //save the new post to database
const auth = require('../middleware/auth');
const isAdmin = require('../middleware/isAdmin');


Router.get('/admin',auth,isAdmin, getAdminCon);
Router.post('/admin/:slug', postAdminCon);
Router.get('/admin/search', searchCon);
Router.post('/admin/update/:id', updateCon);
Router.post('/admin/store', uploadDataCon);

module.exports = Router;
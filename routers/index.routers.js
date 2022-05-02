const express = require('express');
const Router = express.Router({mergeParams:true});

Router.get('/', (req, res) => {
    res.render('portfolio');

});

module.exports = Router;
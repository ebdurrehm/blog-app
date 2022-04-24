const express = require('express');
const Router = express.Router();

Router.get('*', (req, res) => {
    res.status(404).send('<h1>error 404 not found</h1>');
})


module.exports = Router;
const express = require('express');
const Router = express.Router();

const postComment = require('./../controllers/postComment');
const like = require('./../controllers/like');
const disLike = require('./../controllers/disLike');
const postLike = require('./../controllers/likePost');
const readCount = require('./../controllers/readPostCount');


Router.post('/comment', postComment);
Router.get('/like/', like);
Router.get('/dislike', disLike);
Router.get('/postlike', postLike);
Router.get('/postread',readCount);


module.exports = Router;
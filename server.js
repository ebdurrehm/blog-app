var express = require("express");
var app = express();
var dotenv = require("dotenv");//for to read .env file
var mongoose = require("mongoose");// for to connect database
var {engine} = require("express-edge");//template engine
var upload = require('express-fileupload');//for to upload any file from form
var expressSession = require('express-session');
var mongoConnect = require('connect-mongo');//save session to database
var connectFlash = require('connect-flash');// throw flash  error to frontend


const edge = require('edge.js');


//midleware
var auth = require('./middleware/auth');


//controllers
var indexPageCon = require("./controllers/indexPage");//get all posts from database
var createPostCon = require("./controllers/createPost");//create new post
var getPostCon = require("./controllers/getPost");//get post
var uploadDataCon = require("./controllers/uploadData"); //save the new post to database
var signUpCon = require("./controllers/signUp");
var uploadUserCon = require("./controllers/uploadUser");
var loginCon = require('./controllers/login');
var compareLoginCon = require('./controllers/loginUser');
const logoutCon = require('./controllers/logout');
var userPageCon = require('./controllers/userPage');
var getAuthorsCon = require('./controllers/getTeam');
var postAuthorCon = require('./controllers/postAuthor');
var getTagCon = require('./controllers/getTagCon');


//reaad .env file
dotenv.config({path:'secret.env'});
//connect to database
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>{
    console.log("you are connected");
})
.catch(err=>{
    console.error("something went wrong", err);
});



//midlewares
app.use(connectFlash());
app.use(express.static('public'));
app.use(upload());
app.use(express.json());
app.use(engine);
app.set('views', `${__dirname}/views`);
app.use(expressSession({
    secret: "secret",
    resave: true, //force to save any session coockies
    saveUninitialized: true, //save all sessions to database
    store: mongoConnect.create({
        mongoUrl: process.env.MONGO_URI
    })
}));
app.use('*', (req, res, next)=>{
    edge.global('auth', req.session.userId);
    next();
})

//routers
app.get("/new",  createPostCon);
app.get('/blog/:slug', getPostCon);
app.get("/blog", indexPageCon);
app.post("/new/store",  uploadDataCon);
app.get("/user/register", auth,  signUpCon);
app.get("/user/login", auth, loginCon);
app.post("/user/register/in",  uploadUserCon);
app.post('/user/login',  compareLoginCon);
app.get('/user/logout',logoutCon);
app.get('/users/:id',userPageCon);
app.get('/',(req,res)=>{
    res.render('portfolio');
    
});
app.get('/users/author', getAuthorsCon);
app.post('/users/author/new', postAuthorCon);
app.get('/blog/tags/:tag',getTagCon);

        


app.listen(3000, ()=>{ 
    console.log("app listening")
});
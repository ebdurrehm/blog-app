const express = require("express");
const app = express();
const connectDb = require('./config/db.config');
require('dotenv').config({path:process.cwd()+'/secret.env'});
const { engine } = require("express-edge");//template engine
const upload = require('express-fileupload');//for to upload any file from form
const expressSession = require('express-session');
const mongoStore = require('connect-mongo');
// const store = new mongoStore({url:process.env.MONGO_URI});
const connectFlash = require('connect-flash');// throw flash  error to frontend
const adminRouters = require('./routers/admin.routers');
const userRouters = require('./routers/users.routers');
const blogRouters = require('./routers/blog.routers');
const articleRouters = require('./routers/article.routers');
const errorRouters = require('./routers/error.routers');
const indexRouters = require('./routers/index.routers');
const fileRouter = require('./routers/file.router');
const passport = require('passport');
const passportConfig = require('./config/passport.config');



const edge = require('edge.js');


//Database connection
connectDb();


//midlewares
const errorHandler = require('./controllers/errorHandler');

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
    store: mongoStore.create({
        mongoUrl:process.env.MONGO_URI
    }),
    cookie:{
        maxAge: 1000*60*60*24
    }
}));
app.use(passport.initialize());
app.use(passport.session());
app.use('*', (req, res, next) => {
    edge.global('id', req.session.userId);
    next();
})
app.use('*', (req, res, next) => {
    edge.global('isAdmin', req.session.isAdmin);
    next();
})


//routers
app.use(adminRouters);
app.use(userRouters);
app.use(blogRouters);
app.use(articleRouters);
app.use(indexRouters);
app.use(fileRouter);
app.use(errorRouters);
app.use(errorHandler);
passportConfig.init();

module.exports= app;
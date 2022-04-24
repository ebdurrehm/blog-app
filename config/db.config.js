const dotenv = require("dotenv");//for to read .env file
const mongoose = require("mongoose");// for to connect database


async function connectDb(){
dotenv.config({ path: 'secret.env' });
//connect to database
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("you are connected");
    })
    .catch(err => {
        console.error("something went wrong", err);
    });

}

module.exports = connectDb;
require('dotenv').config({path:'github.env'});

const passport = require('passport');
const githubStrategy = require('passport-github2').Strategy;
const googleStrategy = require('passport-google-oauth2').Strategy;
const users =require('./../database/models/User');
const objectId= require('mongodb').ObjectId;

console.log(process.env.MY_HOST+':'+process.env.MY_PORT+'/auth/github/callback');
const passportConfig={};
passportConfig.init = function(){
//serialize user
passport.serializeUser((user,done)=>{
    console.log(`serilazition ${user}`)
    done(null,user._id);
})

//deserialize user
passport.deserializeUser((id,done)=>{
    console.log(`derilazition ${id} `)
    users.findOne({_id:new objectId(id)},(err,doc)=>{
        if(err){return done(err)};
        if(!doc){return done(null,false)}
        return done(null,doc);
    })
})



//github strategy
passport.use(new githubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_SECRETS,
    callbackURL: 'http://'+process.env.MY_HOST+':'+process.env.MY_PORT+'/auth/github/callback'
},function(accessToken,refreshToken,profile,callback){
   //search user in db and if this user was not created
   // insert the new user into db
   users.findOneAndUpdate({social_id:profile.id},{
       $setOnInsert:{
           usrFirstName:profile.displayName.split(' ')[0]||'',
           usrLastName:profile.displayName.split(' ')[1]||'',
           usrEmail:Array.isArray(profile.emails)
           ?profile.emails[0].value:'no public email',
           usrPassword:'',
           isAdmin:false,
           userImage:profile.photos[0].value ||'',
           social_id:profile.id,
           profile_url:profile.profileUrl||'',
           provider:profile.provider||''
        },
           $set:{ last_login: new Date()},
           $inc:{ login_count:1}
   },{
       upsert:true,
       new:true
   },(err,doc)=>{
       return callback(null,doc);
   })
}))

//GOOGLE STRATEGY
passport.use(new googleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret:process.env.GOOGLE_SECRET,
    callbackURL:'http://'+process.env.MY_HOST+':'+process.env.MY_PORT+'/auth/google/callback',
    passReqToCallback   : true
},function(request,accessToken, refreshToken, profile, callback){
    console.log(profile)
    users.findOneAndUpdate({social_id:profile.id},{
        $setOnInsert:{
            usrFirstName:profile.displayName.split(' ')[0]||'',
            usrLastName:profile.displayName.split(' ')[1]||'',
            usrEmail:Array.isArray(profile.emails)
            ?profile.emails[0].value:'no public email',
            usrPassword:'',
            isAdmin:false,
            userImage:profile.picture||'',
            social_id:profile.id,
            profile_url:profile.profileUrl||'',
            provider:profile.provider||''  
        },
       $set:{last_login:new Date()},
       $inc:{login_count:1}
    },{
        upsert:true,
        new:true
    },(err,doc)=>{
        if(err){console.log(err)}
        return callback(null, doc);
    })
}))
};

module.exports = passportConfig;

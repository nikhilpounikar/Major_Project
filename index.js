const cookieParser = require('cookie-parser');
const express = require('express');

const app = express();

const port = 8000;
const layouts = require('express-ejs-layouts');
const db = require('./config/mongoose');

//used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport_local_strategy');

app.use(cookieParser());
app.use(express.urlencoded());
app.use(express.static('./assets'));

//puts styles and script to respective postion i.e in head and end the body respectively
app.set('layout extractStyle ',true);
app.set('layout extractScripts ',true);
// Layouts Should be rendered before routing
app.use(layouts);

//set up the view engine
app.set('view engine','ejs');
app.set('views','./views');

app.use(session({

    name:'Major Project',
    // TODO change the secret before deployment in production mode
    secret:'nikhilpounikar',
    saveUninitialized: false,
    resave:false,
    cookie:{
        maxAge :(1000*60*100)
    }
}));

app.use(passport.initialize());
app.use(passport.session());

// let middleware handle initial routing
app.use('/',require('./routes/index'));


app.listen(port,function(err){

    if(err){
        console.log('Error while starting an application : ',err);
        return;
    }

    console.log('Server Started on port : ',port);
})
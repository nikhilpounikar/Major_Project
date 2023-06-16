const express = require('express');

const app = express();

const port = 8000;
const layouts = require('express-ejs-layouts');
const db = require('./config/mongoose');

app.use(express.static('./assets'));
app.set('layout extractStyle ',true);
app.set('layout extractScripts ',true);
// Layouts Should be rendered before routing
app.use(layouts);

const cookieParser = require('cookie-parser');

app.use(cookieParser());
app.use(express.urlencoded());

// let middleware handle initial routing
app.use('/',require('./routes/index'));

app.set('view engine','ejs');
app.set('views','./views');


app.listen(port,function(err){

    if(err){
        console.log('Error while starting an application : ',err);
        return;
    }

    console.log('Server Started on port : ',port);
})
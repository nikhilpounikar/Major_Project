const express = require('express');

const app = express();

const port = 8000;

// let middleware handle initial routing
app.use('/',require('./routes/index'));

app.listen(port,function(err){

    if(err){
        console.log('Error while starting an application : ',err);
        return;
    }

    console.log('Server Started on port : ',port);
})
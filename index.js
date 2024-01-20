const express = require('express');

const logger = require('morgan');

const app = express();

const ejs = require('ejs');

const router = require('./Route/routes');

 


// view engine configuration
app.set('view engine', 'ejs');

// Middleware configuration
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended : true}))
app.use(router);

// Application server listen configuration
app.listen("3000" , () =>{
    console.log('listening on http://localhost:3000');
})

 
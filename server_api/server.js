const express = require('express');
 path = require('path'),
 cookieParser = require('cookie-parser'),
 bodyParser = require('body-parser'),
 cors = require('cors');

const users = require('./routes/users');
const cars = require('./routes/cars');

const app = express();

// setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());


app.use('/api/users', users);
app.use('/api/cars', cars);

////////// Para que funcione el CORS en el fetch //////////////////
app.use(function(req, res, next) { 
    res.header("Access-Control-Allow-Origin", "*"); 
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"); 
    next(); }); 
/////////////////////////////////////////////////////////////////////

app.set('port', process.env.PORT || 3050);
app.listen(app.get('port'));

console.log('Listening on port: ' + app.get('port'));

module.exports = app;

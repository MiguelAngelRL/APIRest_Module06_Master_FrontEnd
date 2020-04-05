const express = require('express');
 path = require('path'),
 cookieParser = require('cookie-parser'),
 bodyParser = require('body-parser'),
 cors = require('cors'),
 expressjwt = require('express-jwt');

const users = require('./routes/users');
const cars = require('./routes/cars');

const app = express();

// setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
const jwtCheck=expressjwt({
    secret:"something_super_secret"
});

app.use('/api/users', jwtCheck, users);
app.use('/api/cars', jwtCheck, cars);

////////// Para que funcione el CORS en el fetch //////////////////
app.use(function(req, res, next) { 
    res.header("Access-Control-Allow-Origin", "*"); 
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"); 
    next(); }); 
/////////////////////////////////////////////////////////////////////

app.set('port', process.env.PORT || 3060);
app.listen(app.get('port'));

console.log('Listening on port: ' + app.get('port'));

module.exports = app;

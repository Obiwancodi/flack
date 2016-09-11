var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var models = require('./models')
var groups = require('./groups');
var bluebird = require('bluebird')
var db = models.db


var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(session({
  secret: 'ring ring ring ring ring ring ring, banana phone',
  resave: false,
  saveUninitialized: false
}));

db.sync()
.then(function() {
	app.listen(3001, function() {
	console.log("hello!")
	});
})


app.get('/', function(req, res, next){
	res.send('hi')
})
app.use('/', groups);








module.exports = app;
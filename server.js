var express = require('express');
var morgan = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var engine = require('ejs-mate');

var User = require('./models/user');

var app = express();

mongoose.connect('mongodb://root:abc123@ds043062.mongolab.com:43062/ecommerce', function(err) {
  if (err) {
    console.log(err)
  } else {
    console.log("Connected to the database");
  }
});

//Middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.engine('ejs', engine);
app.set('view engine', 'ejs');


app.post('/create-user', function(req, res) {
  var user = new User();

  user.profile.name = req.body.name;
  user.password  = req.body.password;
  user.email = req.body.email;

  user.save(function(err) {
    if (err) return next(err);
    res.json('Successfully created a new user');
  });
});

// EJS home page render
app.get('/', function(req, res) {
  res.render('main/home');
});
// about page render
app.get('/about', function(req, res) {
  res.render('main/about');
});

app.listen(3000, function(err){
  if (err) throw err;
  console.log("Server is Running on port 3000");
});

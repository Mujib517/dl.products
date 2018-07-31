var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

app.listen(3000, function () {
  console.log("Server is running on 3000");
});

//route
//middlewares

mongoose.connect("mongodb://localhost:27017/productsDb", { useNewUrlParser: true }, function () {
  console.log("Connected");
});

function authenticate(req, res, next) {
  var credentials = req.headers["authorization"];
  var tokens = credentials.split(" ");

  var str = tokens[1];

  var decodedString = new Buffer(str, "base64").toString();
  var data = decodedString.split(":");

  if (data[0] === "admin" && data[1] === "admin") next();
  else res.status(401).send("Unauthorized");
}

var defaultRouter = require('./routes/default.router');
var bookRouter = require('./routes/books.router');

app.use(bodyParser.json());

app.use(authenticate);

app.use('/', defaultRouter);

//GET http://domain.com/books/id
app.use('/api/books', bookRouter);


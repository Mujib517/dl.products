var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var middlewares = require('./middlewares');

app.listen(3000, function () {
  console.log("Server is running on 3000");
});

//route
//middlewares

mongoose.connect("mongodb://localhost:27017/productsDb", { useNewUrlParser: true }, function () {
  console.log("Connected");
});



var defaultRouter = require('./routes/default.router');
var bookRouter = require('./routes/books.router');

app.use(bodyParser.json());

app.use('/', defaultRouter);

app.use(middlewares.authenticate);
//GET http://domain.com/books/id
app.use('/api/books', bookRouter);


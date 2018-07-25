var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.listen(3000, function () {
  console.log("Server is running on 3000");
});

//route

var defaultRouter = require('./routes/default.router');
var bookRouter = require('./routes/books.router');

app.use(bodyParser.json());

app.use(defaultRouter);
app.use(bookRouter);


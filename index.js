var express = require('express');
var app = express();
var defaultCtrl = require('./controllers/default.ctrl');
var bookCtrl = require('./controllers/book.ctrl');

app.listen(3000, function () {
  console.log("Server is running on 3000");
});

//route

var defaultRouter = require('./routes/default.router');
var bookRouter = require('./routes/books.router');

app.use(defaultRouter);
app.use(bookRouter);


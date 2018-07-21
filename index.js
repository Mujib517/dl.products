var express = require('express');
var app = express();
var defaultCtrl = require('./controllers/default.ctrl');
var bookCtrl = require('./controllers/book.ctrl');

app.listen(3000, function () {
  console.log("Server is running on 3000");
});

//route

app.get('/', defaultCtrl.get);
app.get('/books', bookCtrl.get);
app.get('/authors', bookCtrl.authors);


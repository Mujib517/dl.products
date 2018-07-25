var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.listen(3000, function () {
  console.log("Server is running on 3000");
});

//route
//middlewares


function authenticate(req, res, next) {
  next();
  console.log("Inside middleware");
  res.status(401);
  res.send("Unauthorized");
}

var defaultRouter = require('./routes/default.router');
var bookRouter = require('./routes/books.router');

app.use(bodyParser.json());


app.use('/', defaultRouter);

//GET http://domain.com/books/id
app.use('/api/books', bookRouter);


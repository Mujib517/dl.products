//commonjs
//AMD
//ES6
//Amazon,flipkart, linkedin
//21 --> 3 server 20% up
var http = require('http');
var fs = require('fs');

var server = http.createServer(handle);

//routing
function handle(req, res) {

  switch (req.url) {
    case "/":

      fs.readFile("index.html", function (err, result) {
        res.write(result);
        res.end();
      });

      break;

    case '/authors':
      res.write("List of authors");
      res.end();
      break;

    case '/books':
      var books = [{ id: 1, name: "Speaking JS", price: 100, inStock: false },
      { id: 2, name: "Eloquent JS", price: 150, inStock: false },
      { id: 3, name: "HeadFirst JS", price: 100, inStock: false }];

      res.write(JSON.stringify(books));
      res.end();
      break;

    default:
      res.write("Hello NodeJS");
      res.end();
      break;
  }

}


server.listen(3000, function () {
  console.log("Server is running on 3000");
});
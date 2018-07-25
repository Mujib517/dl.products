var books = [{ id: 1, name: "Speaking JS", price: 100, inStock: false },
{ id: 2, name: "Eloquent JS", price: 150, inStock: false },
{ id: 3, name: "HeadFirst JS", price: 100, inStock: false }];


class BookCtrl {

  //Rest api, websvc, svc, Rest svc, api
  get(req, res) {
    //conventions
    //status codes
    //successful, successfully done,

    //1xx 
    //2xx -- Success  200,201,204, 
    //3xx -- Redirects 301,302
    //4xx -- Client error  404, 401, 400
    //5xx -- Server error  500,501,502

    res.status(200); //OK
    res.json(books);
  }

  getById(req, res) {
    var id = +req.params.id;
    var book;

    for (var i = 0; i < books.length; i++) {
      if (books[i].id === id) {
        book = books[i];
        break;
      }
    }

    if (book) {
      res.status(200);
      res.json(book);
    }
    else {
      res.status(404);
      res.send("Not found");
    }
  }

  save(req, res) {
    console.log(req.body);

    books.push(req.body);

    res.status(201); //Created
    res.send(req.body);
  }

  delete(req, res) {
    var id = +req.params.id;

    for (var i = 0; i < books.length; i++) {
      if (books[i].id === id) {
        books.splice(i, 1);
      }
    }

    res.status(204); //No content
    res.send();
  }

  update(req, res) {
    var id = +req.params.id;

    for (var i = 0; i < books.length; i++) {
      if (books[i].id === id) {
        books[i].name = req.body.name;
        books[i].author = req.body.author;
        books[i].price = req.body.price;
        books[i].inStock = req.body.inStock;
      }
    }

    res.status(204);
    res.send();
  }

  //change password
  patch(req, res) {
    var id = +req.params.id;

    delete req.body.id;

    for (var i = 0; i < books.length; i++) {
      if (books[i].id === id) {
        for (var key in req.body) {
          books[i][key] = req.body[key];
        }
      }
    }

    res.status(204);
    res.send();
  }
}

module.exports = new BookCtrl();
var Book = require('../models/book.model');

class BookCtrl {

  get(req, res) {

    var pageSize = +req.params.pageSize || 10;
    var pageIndex = +req.params.pageIndex || 0;

    //Deferred execution
    Book.count(function (err, cnt) {
      if (!err) {
        Book.find({}, { __v: 0 }, function (err, books) {
          if (!err) {

            var toatlPages = Math.ceil(cnt / pageSize);

            var response = {
              metadata: {
                count: cnt,
                pages: toatlPages
              },
              data: books
            };

            res.status(200); //OK
            res.json(response);
          }
          else {
            res.status(500);
            //logging
            res.send("Internal Server Error");
          }
        })
          .sort('-lastUpdated')
          .skip(pageIndex * pageSize)
          .limit(pageSize);
      }
      else {
        res.status(500);
        res.send("Internal Server Error");
      }
    });
  }

  getById(req, res) {
    var id = req.params.id;

    Book.findById(id, { __v: 0 })
      .exec()
      .then(function (book) {
        res.status(200);
        res.json(book);
      })
      .catch(function (err) {
        res.status(500);
        res.send("Internal Server Error");
      });
  }

  save(req, res) {
    var book = new Book(req.body);

    book.save(function (err, book) {
      if (!err) {
        res.status(201); //Created
        res.send(book);
      }
      else {
        res.status(500);
        res.send(err);
      }
    });
  }

  delete(req, res) {
    var id = req.params.id;

    Book.findByIdAndRemove(id, function (err) {
      if (!err) {
        res.status(204); //No content
        res.send();
      }
      else {
        res.status(500);
        res.send(err);
      }
    });
  }

  update(req, res) {
    var id = req.params.id;

    Book.findByIdAndUpdate(id, {
      $set: {
        name: req.body.name,
        author: req.body.author,
        price: req.body.price,
        inStock: req.body.inStock
      }
    }, function (err) {
      if (!err) {
        res.status(204);
        res.send();
      }
      else {
        res.status(500);
        res.send(err);
      }
    });
  }

  //change password
  patch(req, res) {
    var id = req.params.id;

    delete req.body._id;
    //freezed

    Book.findById(id, { _id: 0 }, function (err, book) {
      if (book) {
        var jsonBook = book.toJSON();

        for (var key in req.body) {
          jsonBook[key] = req.body[key];
        }

        Book.findByIdAndUpdate(id, jsonBook, function (err) {
          if (!err) {
            res.status(204);
            res.send();
          }
          else {
            res.status(500);
            res.send(err);
          }
        });
      }
      else {
        res.status(404);
        res.send("Not found");
      }
    });
  }
}

module.exports = new BookCtrl();
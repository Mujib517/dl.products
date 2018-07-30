var Book = require('../models/book.model');

class BookCtrl {

  get(req, res) {

    var pageSize = +req.params.pageSize || 10;
    var pageIndex = +req.params.pageIndex || 0;
    var cnt;
    //Deferred execution
    Book.count()
      .exec()
      .then(function (count) {
        cnt = count;
        
        return Book.find({}, { __v: 0 })
          .sort('-lastUpdated')
          .skip(pageIndex * pageSize)
          .limit(pageSize)
          .exec()
      })
      .then(function (books) {
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
      })
      .catch(function () {
        res.status(500);
        res.send("Internal Server Error");
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

    book.save()
      .then(function (book) {
        res.status(201); //Created
        res.send(book);
      })
      .catch(function (err) {
        res.status(500);
        res.send(err);
      });
  }

  delete(req, res) {
    var id = req.params.id;

    Book.findByIdAndRemove(id)
      .exec()
      .then(function () {
        res.status(204);
        res.send();
      })
      .catch(function () {
        res.status(500);
        res.send("Internal Server Error");
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
    })
      .exec()
      .then(function () {
        res.status(204);
        res.send();
      })
      .catch(function () {
        res.status(500);
        res.send("Internal Server Error");
      });
  }

  //change password
  patch(req, res) {
    var id = req.params.id;

    delete req.body._id;
    //freezed

    Book.findById(id, { _id: 0 })
      .exec()
      .then(function (book) {
        var jsonBook = book.toJSON();

        for (var key in req.body) {
          jsonBook[key] = req.body[key];
        }

        Book.findByIdAndUpdate(id, jsonBook)
          .exec()
          .then(function () {
            res.status(204);
            res.send();
          })
      })
      .catch(function () {
        res.status(500);
        res.send("internal server error");
      })
  }
}

module.exports = new BookCtrl();
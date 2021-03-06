var Book = require('../models/book.model');
var bookSvc = require('../services/book.svc');
var reviewSvc = require('../services/review.svc');
var logger = require('../utilities/app.logger');

class BookCtrl {

  async get(req, res) {
    try {
      var pageSize = +req.params.pageSize || 10;
      var pageIndex = +req.params.pageIndex || 0;
      //Deferred execution

      var count = await bookSvc.getCount();
      var books = await bookSvc.get(pageIndex, pageSize);

      logger.info(books);

      for (var i = 0; i < books.length; i++) {
        books[i].image = req.protocol + "://" + req.get('host') + "/" + books[i].image;
      }

      var toatlPages = Math.ceil(count / pageSize);

      var response = {
        metadata: {
          count: count,
          pages: toatlPages,
          hasPrevious: pageIndex !== 0,
          hasNext: pageIndex < (toatlPages - 1)
        },
        data: books
      };


      res.status(200);
      res.json(response);
    }
    catch (err) {
      logger.error(err);
      res.status(500);
      res.send("Inetrnal Server Error");
    }
  }

  //ES7. 
  async getById(req, res) {
    try {
      var id = req.params.id;
      //mongoose object. Freezed
      var book = await bookSvc.getById(id);
      var reviews = await reviewSvc.get(id);
      var avgRating = await reviewSvc.getAvgRating(id);

      console.log(avgRating);

      var jsonBook = book.toJSON();
      jsonBook.reviews = reviews;
      if (avgRating && avgRating.length > 0)
        jsonBook.avgRating = avgRating[0].avg;

      res.status(200);
      res.json(jsonBook);
    }
    catch (err) {
      res.status(500);
      res.send("Internal Server Error");
    }
  }

  async save(req, res) {
    try {
      var book = await bookSvc.save(req.body)
      res.status(201); //Created
      res.send(book);
    }
    catch (err) {
      if (hasValidationError(err)) res.status(500).send(err.message);
      else res.status(500).res.send(err);
    }
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


function hasValidationError(err) {
  return err && err.message && err.message.indexOf("validation failed") > -1
}

module.exports = new BookCtrl();
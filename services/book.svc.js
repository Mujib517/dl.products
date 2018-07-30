var Book = require('../models/book.model');

class BookService {

  getById(id) {
    return Book
      .findById(id)
      .exec();
  }
}

module.exports = new BookService();
var Book = require('../models/book.model');

class BookService {

  getCount() {
    return Book.countDocuments().exec();
  }

  get(pageIndex, pageSize) {
    return Book.find({}, { __v: 0 })
      .sort('-lastUpdated')
      .skip(pageIndex * pageSize)
      .limit(pageSize)
      .exec();
  }

  getById(id) {
    return Book
      .findById(id)
      .exec();
  }

  save(data) {
    var book = new Book(data);
    return book.save();
  }
}

module.exports = new BookService();
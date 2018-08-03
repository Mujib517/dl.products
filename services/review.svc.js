var Review = require('../models/review.model');

class ReviewService {

  save(data) {
    var review = new Review(data);
    return review.save();
  }

  get(id) {
    return Review
      .find({ bookId: id }, { __v: 0, _id: 0 })
      .exec();
  }

}

var Review = require('../models/review.model');

module.exports = new ReviewService()
var reviewSvc = require('../services/review.svc');

class ReviewCtrl {

  async save(req, res) {
    try {
      var review = await reviewSvc.save(req.body);
      res.status(201).json(review);
    }
    catch (err) {
      res.status(500).send("internal server error");
    }
  }

}

module.exports = new ReviewCtrl();
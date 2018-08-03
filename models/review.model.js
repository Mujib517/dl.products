var mongoose = require('mongoose');

module.exports = mongoose.model("Review", {
  bookId: { type: String, required: true },
  rating: { type: Number, required: true },
  subject: { type: String },
  message: { type: String },
  lastUpdated: { type: Date, default: Date.now }
});
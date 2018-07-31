var mongoose = require('mongoose');

var model = mongoose.model("Book", {
  name: { type: String, required: [true, "Required"] },
  author: { type: String, required: [true, "Required"] },
  price: { type: Number, required: [true, "Required"] },
  inStock: { type: Boolean, default: false },
  lastUpdated: { type: Date, default: Date.now }
});

module.exports = model;

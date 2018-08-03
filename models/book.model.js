var mongoose = require('mongoose');


function validatePrice(price) {
  return price > 100;
}

var model = mongoose.model("Book", {
  name: {
    type: String, required: [true, "Required"],
    minlength: [3, "Min 3 chars"]
  },
  author: { type: String, required: [true, "Required"] },
  price: { type: Number, required: [true, "Required"], validate: { validator: validatePrice, message: "Invalid Price" } },
  inStock: { type: Boolean, default: false },
  image: { type: String },
  lastUpdated: { type: Date, default: Date.now }
});

module.exports = model;

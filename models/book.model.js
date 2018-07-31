var mongoose = require('mongoose');


function validatePrice(price) {
  return price > 100;
}

var model = mongoose.model("Book", {
  name: {
    type: String, required: [true, "Required"],
    minlength: [3, "Min 3 chars"], maxlength: [10, "Max 10 Chars"]
  },
  author: { type: String, required: [true, "Required"] },
  price: { type: Number, required: [true, "Required"], validate: { validator: validatePrice,message:"Invalid Price" } },
  inStock: { type: Boolean, default: false },
  lastUpdated: { type: Date, default: Date.now }
});

module.exports = model;

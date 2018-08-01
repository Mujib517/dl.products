var mongoose = require('mongoose');

var schema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  active: { type: Boolean, default: true },
  locked: { type: Boolean, default: false },
  lastUpdated: { type: Date, default: Date.now }
});

//schema.index({ username: 1 }, { unique: true });

module.exports = mongoose.model("User", schema);
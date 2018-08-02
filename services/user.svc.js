var User = require('../models/user.model');
var jwt = require('jsonwebtoken');

class UserService {

  register(data) {
    var user = new User(data);
    return user.save();
  }

  getUserByEmail(username) {
    //find =[{}]
    //findOne={}
    return User.findOne({ username: username }).exec();
  }

  generateToken(username) {
    return jwt.sign({ username: username }, "secret", { expiresIn: '1h' })
  }
}

module.exports = new UserService();
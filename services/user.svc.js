var User = require('../models/user.model');

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
}

module.exports = new UserService();
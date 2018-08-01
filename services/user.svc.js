var User = require('../models/user.model');

class UserService {

  register(data) {
    var user = new User(data);
    return user.save();
  }
}

module.exports = new UserService();
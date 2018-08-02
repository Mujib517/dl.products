var userSvc = require('../services/user.svc');
var cryptoSvc = require('../services/crypto.svc');
var bcrypt = require('bcrypt');

class UserCtrl {

  async register(req, res) {
    try {
      req.body.password = cryptoSvc.hashPwd(req.body.password);

      await userSvc.register(req.body);
      res.status(201);
      res.send("Successfully Registered");
    }
    catch (err) {
      if (emailExists(err))
        res.status(409).send("Username already exists");
      else
        res.status(500).send("Internal Server Error");
    }
  }

  async login(req, res) {
    var user = await userSvc.getUserByEmail(req.body.username);
    if (!user) res.status(401).send("Wrong username or password");
    else {
      var result = bcrypt.compareSync(req.body.password, user.password);
      if (!result) res.status(401).send("Wrong username or password");
      else {
        if (!user.active) res.status(401).send("User account inactive");
        else if (user.locked) res.status(401).send("User account is locked. Contact support team");
        else res.status(200).send("Login successful");
      }
    }
  }
}

function emailExists(err) {
  return err && err.message && err.message.indexOf("duplicate key error") > -1;
}

module.exports = new UserCtrl()
var userSvc = require('../services/user.svc');
var cryptoSvc = require('../services/crypto.svc');

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
}

function emailExists(err) {
  return err && err.message && err.message.indexOf("duplicate key error") > -1;
}

module.exports = new UserCtrl()
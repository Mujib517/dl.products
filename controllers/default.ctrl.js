var logger = require('../utilities/app.logger');

var defaultCtrl = {

  get: function (req, res) {
    //error,info,warn
    logger.info({ myMsg: "some message" });
    res.send("Hello Express");
  },

  health(req, res) {
    var response = {
      status: "Up"
    };

    res.status(200);
    res.json(response);
  }

};

module.exports = defaultCtrl;

var defaultCtrl = {

  get: function (req, res) {
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

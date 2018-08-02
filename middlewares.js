var jwt = require('jsonwebtoken');

module.exports = {
  authenticate: function (req, res, next) {
    var credentials = req.headers["authorization"];
    if (credentials) {

      var tokens = credentials.split(" ");

      var str = tokens[1];

      var decodedString = new Buffer(str, "base64").toString();
      var data = decodedString.split(":");

      if (data[0] === "admin" && data[1] === "admin") next();
      else res.status(401).send("Unauthorized");
    }
    else res.status(401).send("Unauthorized");
  },

  validateToken(req, res, next) {
    var authHeader = req.headers["authorization"];
    if (!authHeader) res.status(401).send("Unauthorized");
    else {
      //Bearer adfjakdf-adkfjakdjf==> [Bearer,adkfjakdjfkajdkfjk]
      var tokens = authHeader.split(" ");
      var authToken = tokens[1];

      jwt.verify(authToken, 'secret', function (err) {
        if (err) {
          res.status(401).send("Unauthorized");
        }
        else next();
      });
    }

  }
};
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
  }
};
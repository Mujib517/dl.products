var router = require("express").Router();
var userCtrl = require('../controllers/user.ctrl');

router.post("/register", userCtrl.register);

module.exports = router;
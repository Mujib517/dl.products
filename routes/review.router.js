var router = require('express').Router();
var reviewCtrl = require('../controllers/review.ctrl');

router.post("/", reviewCtrl.save);

module.exports = router;
var router = require('express').Router();
//var router = express.Router();
var bookCtrl = require('../controllers/book.ctrl');

//HTTP GET: http://localhost:3000/products
router.get('/books', bookCtrl.get);
router.post('/books', bookCtrl.save);
router.get('/authors', bookCtrl.authors);

module.exports = router;
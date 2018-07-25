var router = require('express').Router();
//var router = express.Router();
var bookCtrl = require('../controllers/book.ctrl');

//Uniform interface
//HTTP GET: http://localhost:3000/products
router.get('/books', bookCtrl.get);
router.get('/books/:id', bookCtrl.getById);
router.delete('/books/:id', bookCtrl.delete);
router.put('/books/:id', bookCtrl.update);
router.patch('/books/:id', bookCtrl.patch);

router.post('/books', bookCtrl.save);

module.exports = router;
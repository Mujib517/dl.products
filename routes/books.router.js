var router = require('express').Router();
//var router = express.Router();
var bookCtrl = require('../controllers/book.ctrl');

//Uniform interface
//HTTP GET: http://localhost:3000/books/1
router.get('/', bookCtrl.get);
router.get('/:id', bookCtrl.getById);
router.delete('/:id', bookCtrl.delete);
router.put('/:id', bookCtrl.update);
router.patch('/:id', bookCtrl.patch);

router.post('/', bookCtrl.save);

module.exports = router;
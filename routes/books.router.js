var router = require('express').Router();
//var router = express.Router();
var bookCtrl = require('../controllers/book.ctrl');

var multer = require('multer');

var storage = multer.diskStorage({
  destination: function (req, file, done) {
    done(null, "uploads");
  },
  filename: function (req, file, done) {
    var fileName = Date.now() + "-" + file.originalname;
    req.body.image = fileName;
    console.log(req.body);
    done(null, fileName);
  }
});

var upload = multer({ storage: storage });


//Uniform interface
//HTTP GET: http://localhost:3000/books/1
router.get('/:pageIndex/:pageSize', bookCtrl.get);
router.get('/', bookCtrl.get);

router.get('/:id', bookCtrl.getById);
router.delete('/:id', bookCtrl.delete);
router.put('/:id', bookCtrl.update);
router.patch('/:id', bookCtrl.patch);

router.post('/', upload.single("image"), bookCtrl.save);

module.exports = router;
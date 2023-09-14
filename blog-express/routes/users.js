var express = require('express');
var router = express.Router();

const auth            = require('../controllers/middleware/auth');
const UsersController = require('../controllers/UsersController');

router.get('/get-me',   auth,   UsersController.getMe);
router.get('/:id',              UsersController.show);
router.put('/:id',      auth,   UsersController.update);
router.delete('/:id',   auth,   UsersController.destroy);

module.exports = router;

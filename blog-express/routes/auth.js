var express = require('express');
var router = express.Router();

var AuthController = new (require('../controllers/AuthController'));

router.post('/register',        AuthController.register);
router.post('/login',           AuthController.login);
router.post('/refresh-token',   AuthController.refreshToken);

module.exports = router;

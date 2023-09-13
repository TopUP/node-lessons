var express             = require('express');
var router              = express.Router();
const todoController    = require('../controllers/todoController');

router.get('/',       todoController.all);
router.post('/',      todoController.create);
router.get('/:id',    todoController.show);
router.put('/:id',    todoController.update);
router.delete('/:id', todoController.destroy);

module.exports = router;

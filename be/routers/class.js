const router = require('express').Router();
const {
    getAllClass,
    updateClass
} = require('../controllers/class');
const {auth} = require("../middleware/auth");

router.route('/:id').patch(auth(),updateClass);
router.route('/').get(auth(),getAllClass);

module.exports = router;
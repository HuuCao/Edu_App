const router = require('express').Router();
const {
    getAllCategory,
    insertCategory
} = require('../controllers/category');

const {auth} = require("../middleware/auth");

router.route('/').get(auth(),getAllCategory);
router.route('/insert').post(auth(),insertCategory);

module.exports = router;
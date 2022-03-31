const router = require('express').Router();
const {
    createFeedback,
    getAllFeedback
} = require('../controllers/feedback');
const {auth} = require("../middleware/auth");

router.route('/createfeeback').post(auth(),createFeedback);
router.route('/getallfeedback').get(auth(),getAllFeedback);

module.exports = router;
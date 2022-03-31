const router = require('express').Router();
const {
    // updateSubject,
    getAllSubject,
    insertSubject
} = require('../controllers/subject');
const {auth} = require("../middleware/auth");

// router.route('/:id').patch(auth(),updateSubject);
router.route('/').get(auth(),getAllSubject);
router.route('/insert').post(auth(),insertSubject);

module.exports = router;
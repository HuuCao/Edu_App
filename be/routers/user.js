const router = require('express').Router();
const {
    updateUser,
    getUser,
    getUserByRole
} = require('../controllers/user');
const {auth} = require("../middleware/auth");

router.route('/:id').patch(auth(),updateUser);
router.route('/').get(auth(),getUser);
router.route('/roleuser').get(auth(),getUserByRole);

module.exports = router;
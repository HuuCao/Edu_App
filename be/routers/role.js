const router = require('express').Router();
const {
    updateRole
} = require('../controllers/role');
const {auth} = require("../middleware/auth");

router.route('/:id').patch(auth(),updateRole);

module.exports = router;
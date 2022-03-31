const router = require('express').Router();
const {
    getAllContribute
} = require('../controllers/contribute');
const {auth} = require("../middleware/auth");

router.route('/getallcontribute').get(auth(),getAllContribute);

module.exports = router;
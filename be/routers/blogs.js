const router = require('express').Router();
const {
    getAllBlog,
    getBlogDetail,
    updateBlog,
    insertBlog,
    removeBlog
} = require('../controllers/blogs');

const {auth} = require("../middleware/auth");

router.route('/').get(auth(),getAllBlog);
router.route('/detail').get(auth(),getBlogDetail);
router.route('/create').post(auth(),insertBlog);
router.route('/:id').patch(auth(),updateBlog);
router.route('/delete/:id').delete(auth(),removeBlog);


module.exports = router;
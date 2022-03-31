const {
  getAllBlog,
  getBlogBanner,
  getBlogDetail,
  updateBlog,
  insertBlog,
  removeBlog
} = require("../services/blogs");
const client = require("../config/mongodb");
const { validate } = require("../refun/until");

module.exports.getAllBlog = async (req, res, next) => {
  try {
    getAllBlog(req, res, next);
  } catch (e) {
    return res.send({ success: false, mess: "Error:" + e });
  }
};

module.exports.getBlogDetail = async (req, res, next) => {
  try {
    getBlogDetail(req, res, next);
  } catch (e) {
    return res.send({ success: false, mess: "Error: " + e });
  }
};

module.exports.insertBlog = async (req, res, next) => {
  try {
    insertBlog(req, res, next);
  } catch (e) {
    return res.send({ success: false, mess: "Error: " + e });
  }
};

module.exports.updateBlog = async (req, res, next) => {
  try {
    updateBlog(req, res, next);
  } catch (e) {
    return res.send({ success: false, mess: "Error: " + e });
  }
};

module.exports.removeBlog = async (req, res, next) => {
    try {

        var blog = await client.db(process.env.DB).collection("blogs").findOne({
            id:req.params.id
        });

        if(blog == undefined)
        {
            return res.send({success:false,mess:"not found Blog"});
        }
        removeBlog(req, res, next);
    } catch (e) {
      return res.send({ success: false, mess: "Error: " + e });
    }
  };
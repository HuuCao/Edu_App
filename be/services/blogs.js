const client = require("../config/mongodb");
const _ = require("lodash");
const moment = require('moment');

module.exports.getAllBlog = async (req, res, next) => {
  try {
    var blogs = await client
      .db(process.env.DB)
      .collection("blogs")
      .find({})
      .toArray();

    blogs = _.reverse(blogs);

    res.send({ success: true, data: blogs });
  } catch (e) {
    return res.send({ success: false, mess: "Error: " + e });
  }
};

module.exports.getBlogDetail = async (req, res, next) => {
  try {
    var blog = await client.db(process.env.DB).collection("blogs").findOne({
      id: parseInt(req.query.id),
    });

    return res.send({ success: true, data: blog });
  } catch (err) {
    return res.status(402).send({ success: false, mess: err });
  }
};

module.exports.insertBlog = async (req, res, next) => {
  try {
    var count = await client
      .db(process.env.DB)
      .collection("blogs")
      .countDocuments();

    req.body.id = count + 1;
    req.body.createAt = new Date().toISOString().substring(0, 10);

    await client
      .db(process.env.DB)
      .collection("blogs")
      .insertOne(req.body)
      .then((result) => {
        return res.send({ success: true, data: req.body });
      });
  } catch (err) {
    return res.status(402).send({ success: false, mess: err });
  }
};

module.exports.updateBlog = async (req, res, next) => {
  try {
    await client
      .db(process.env.DB)
      .collection("blogs")
      .updateOne(
        {
          id: parseInt(req.params.id),
        },
        {
          $set: {
            ...req.body,
          },
        }
      )
      .then((result) => {
        return res.send({ success: true, data: req.body });
      });
  } catch (err) {
    return res.status(402).send({ success: false, mess: err });
  }
};

module.exports.removeBlog = async (req, res, next) => {
  try {
    await client
      .db(process.env.DB)
      .collection("blogs")
      .deleteOne({
        id: parseInt(req.params.id),
      })
      .then((result) => {
        return res.send({ success: true, mess: "Deleted !" });
      });
  } catch (err) {
    return res.status(402).send({ success: false, mess: err });
  }
};

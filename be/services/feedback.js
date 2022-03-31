const client = require("../config/mongodb");

module.exports.createFeedback = async (req, res, next) => {
    req.valFeedback.feedbackID = await client
        .db(process.env.DB)
        .collection('feedback')
        .countDocuments() + 1

    await client
        .db(process.env.DB)
        .collection('feedback')
        .insert(req.valFeedback)
        .then((result) => {
    if (result.insertedIds != null) {
        return res.send({ success: true, mess: "Successfully" })
    }
    });
}

module.exports.getAllFeedback = async (req, res, next) => {
    try {
      var feedback = await client
        .db(process.env.DB)
        .collection('feedback')
        .find({})
        .toArray();
  
      res.send({ success: true, data: feedback });
    } catch (e) {
      res.send({ success: false, mess: "Error: " + e });
    }
  };
  
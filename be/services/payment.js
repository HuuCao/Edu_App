const client = require('../config/mongodb');

module.exports.getAllPayment = async (req, res, next) => {
    try {
      var payment = await client
        .db(process.env.DB)
        .collection("payment")
        .find({})
        .toArray();

      res.send({ success: true, data: payment });
    } catch (e) {
      res.send({ success: false, mess: "Error: " + e });
    }
  };

module.exports.updatePayment = async (req, res, next) => {
  await client
    .db(process.env.DB)
    .collection("payment")
    .updateOne(
      {
        paymentID: req.query.paymentID,
      },
      {
        $set: {
          ...req.body,
        },
      }
    )
    .catch((e) => {
      console.log(e);
      throw next(new Error(`502:${"update carrier in DB fails"}`));
    });

  res.send({ success: true, data: req.body });
};
const {
    getAllPayment,
    updatePayment
} = require ('../services/payment');

const { validate } = require('../refun/until');
const { paymentVal } = require("../refun/validate");

module.exports.getAllPayment = async (req, res, next) => {
    try {
        getAllPayment(req, res, next);
    } catch (e) {
        return res.send({ success: false, mess: "Error: " + e });
    }
}; 

module.exports.updatePayment = async (req, res, next) => {
    try {
        var body = validate(req.body, paymentVal);
        if (body == false) {
        throw next(new Error(`502:${"Validate data wrong !"}`));
        }

        await updatePayment(req, res, next);
    } catch (e) {
        return res.send({ success: false, mess: "Error: " + e });
    }
};
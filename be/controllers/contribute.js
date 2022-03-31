const { validate } = require('../refun/until');
const { feedbackVal } = require('../refun/validate');

const {
    getAllContribute
} = require('../services/contribute');

module.exports.getAllContribute = async (req, res, next) => {
    try {
        getAllContribute(req, res, next);
    } catch (e) {
      return res.send({ success: false, mess: "Erro: " + e });
    }
  };
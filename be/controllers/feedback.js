const { validate } = require('../refun/until');
const { feedbackVal } = require('../refun/validate');

const {
    createFeedback,
    getAllFeedback
} = require('../services/feedback');

module.exports.createFeedback = async (req, res, next) => {
    try {
        let token = req.user;
        var valFeedback = validate(req.body, feedbackVal);

        if (valFeedback == false) {
            res.send({ success: false, mess: "Vui lòng nhập đầy đủ thông tin" })
        }

        req.valFeedback = valFeedback;
        req.valFeedback['avatar'] = token['avatar'];
        req.valFeedback['fullname'] = token.fullname;
        req.valFeedback['idUser'] = token.idUser;
        
        await createFeedback (req, res, next);
    }
    catch (e) {
        res.send({ success: false, mess: "Error: " + e });
    }
}

module.exports.getAllFeedback = async (req, res, next) => {
    try {
        getAllFeedback(req, res, next);
    } catch (e) {
        return res.send({ success: false, mess: "Erro: " + e });
    }
};
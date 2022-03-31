const client = require("../config/mongodb");
const {
    getHistoryByUserID
} = require('../services/history');

module.exports.insertHistory = async (req, res, next) => {
    try {
        var history = await client
            .db(process.env.DB)
            .collection("history")
            .findOne({
                idUser: req.user.idUser,
            });
            console.log(history);
        var lesson = await client
            .db(process.env.DB)
            .collection("lesson")
            .findOne({
                lessonID: parseInt(req.body.lessonID)
            });

        history.lessonID.push(lesson)

        client
            .db(process.env.DB)
            .collection("history")
            .updateOne(
                {
                    idUser: req.user.idUser,
                },
                {
                    $set: {
                        ...history
                    },
                }
            )

        res.send({ success: true, mess: "Successfully!" })

    } catch (e) {
        return res.send({ success: false, mess: "Error: " + e });
    }
};

module.exports.getHistoryByUserID = async (req, res, next) => {
    try {
        getHistoryByUserID(req, res, next);
    }
    catch (e) {
        return res.send({ success: false, mess: "Error:" + e });
    }
}
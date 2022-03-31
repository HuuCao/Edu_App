const client = require("../config/mongodb");
const _ = require("lodash");

module.exports.getHistoryByUserID = async (req, res, next) => {
    try {
        var history = await client
            .db(process.env.DB)
            .collection('history')
            .find({
                idUser: parseInt(req.query.idUser)
            })
            .toArray();
            history[0].lessonID = history[0].lessonID.reverse();

            res.send({ success: true, data: history });
    }catch (e) {
        return res.send({ success: false, mess: "Error: " + e })
    }
}
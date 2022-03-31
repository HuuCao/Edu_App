const {
    getAllClass,
    updateClass
} = require('../services/class');
const client = require('../config/mongodb')

module.exports.updateClass = async (req, res, next) => {
  try {
    if(req.body == undefined)
        {
            return res.send({success:false,mess:"Vui lòng truyền Data"});
        }

    var user = await client
      .db(process.env.DB)
      .collection("user")
      .findOne({
        idUser: parseInt(req.params.id),
      });

    if (!user)
      return res.status(401).send({ success: false, mess: "Not Found User" });

      updateClass(req, res, next);
  } catch (e) {
    return res.send({ success: false, mess: "Error: " + e });
  }
};

module.exports.getAllClass = async (req, res, next) => {
    try {
        getAllClass(req, res, next);
    } catch (e) {
      return res.send({ success: false, mess: "Erro: " + e });
    }
  };
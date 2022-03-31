const {
    updateRole
} = require('../services/role');
const client = require('../config/mongodb')

module.exports.updateRole = async (req, res, next) => {
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
  
        updateRole(req, res, next);
    } catch (e) {
      return res.send({ success: false, mess: "Error: " + e });
    }
  };
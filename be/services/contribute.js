const client = require("../config/mongodb");

module.exports.getAllContribute = async (req, res, next) => {
    try {
      var contribute = await client
        .db(process.env.DB)
        .collection('contribute')
        .find({})
        .toArray();
      
      await new Promise(async(resolve, reject) => {
        for(let i in contribute){
          let user = await client
          .db(process.env.DB)
          .collection('user')
          .findOne({ idUser: parseInt(contribute[i].idUser) })
          contribute[i].idUser = user;
        }
        resolve();
      })

      res.send({ success: true, data: contribute });
    } catch (e) {
      res.send({ success: false, mess: "Error: " + e });
    }
  };
  
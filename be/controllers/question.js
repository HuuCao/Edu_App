const client = require('../config/mongodb');
const { validate } = require('../refun/until');
const { questionVal } = require('../refun/validate');
const moment = require('moment');
const {
    getAllQuestion,
    insertQuestion,
    updateQuestion
} = require('../services/question');


module.exports.getAllQuestion = async (req, res, next) => {
    try {
        getAllQuestion(req, res, next);
    } catch (e) {
      return res.send({ success: false, mess: "Error: " + e });
    }
  };

module.exports.insertQuestion = async (req, res, next) => {
  try {
    let token = req.user;
    
    req['valQuestion'] = req.body;
    
    for( let i in req.valQuestion){
      req.valQuestion[i].createAt = moment().format('DD/MM/YYYY')
      req.valQuestion[i]['creator'] = token.idUser;
      req.valQuestion[i].active = true;
      req.valQuestion[i]['questionID'] = await client
        .db(process.env.DB)
        .collection('question')
        .countDocuments() + parseInt([i]) + 1;
    }
    // var _count = await client.db(process.env.DB).collection("contribute").find({ idUser: req.user.idUser }).toArray();
    // console.log(_count);
    var user = await client
    .db(process.env.DB)
    .collection("contribute")
    .findOne({ idUser: token.idUser })

    if(user != null) {
      await client.db(process.env.DB).collection("contribute").updateOne(
        {
          idUser: token.idUser
        },
        {
          $set: {amount: user.amount + req.body.length} 
        }
      );
    } else
    {
      await client.db(process.env.DB).collection("contribute").insert(
        {
          idUser: token.idUser,
          content: "Vua them cau hoi",
          amount: req.body.length
        }
      )
    }
    await insertQuestion(req, res, next);
  }
  catch (e) {
    console.log(e);
    return res.send({ success: false, mess: "Error: " + e });
  }
}

module.exports.updateQuestion = async (req, res, next) => {
  try {
    updateQuestion(req, res, next);
  } catch (e) {
    return res.send({ success: false, mess: "Error: " + e });
  }
};
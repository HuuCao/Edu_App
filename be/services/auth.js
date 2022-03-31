const { sign, signRefresh } = require("../config/jwt");
const client = require("../config/mongodb");
const { loginVal } = require("../refun/validate");
const bcrypt = require("../config/bcrypt");
const { sendMail } = require("../config/mail");
const moment = require('moment');
const nodemailer = require("nodemailer");

require("dotenv").config();

//============== register ===============//

const register = async (req, res, next) => {
  req.valUser.idUser =
    (await client.db(process.env.DB).collection("user").countDocuments()) + 1;
  
  // Tạo bảng điểm tự động
  var data = [];

  var subjects = await client
    .db(process.env.DB)
    .collection("subject")
    .find({})
    .toArray();

  for (var i = 0; i < subjects.length; i++) {
    await client.db(process.env.DB)
    .collection("point")
    .insertOne({
      point1:[],
      point2:[],
      point3:[],
      idUser:req.valUser.idUser,
      is_active:true,
      semester: "1",
      nameSubject:subjects[i].subjectName
    })
  }
  for (var j = 0; j < subjects.length; j++) {
    await client.db(process.env.DB)
    .collection("point")
    .insertOne({
      point1:[],
      point2:[],
      point3:[],
      idUser:req.valUser.idUser,
      is_active:true,
      semester: "2",
      nameSubject:subjects[j].subjectName
    })
  }
  await client
    .db(process.env.DB)
    .collection("history")
    .insertOne({
      lessonID:[],
      idUser:req.valUser.idUser,
    })
  await client
    .db(process.env.DB)
    .collection("user")
    .insert(req.valUser)
    .then((result) => {
      if (result.insertedIds != null) {
        return res.send({ success: true, mess: "Successfully" });
      }
    });
};

//============== login ===============//

const login = async (req, res, next) => {
  var accessToken = await sign(req.user);
  var refreshToken = await signRefresh(req.user);

  var user = await client
    .db(process.env.DB)
    .collection("user")
    .updateOne(
      {
        mail: `${req.user.mail}`,
      },
      {
        $set: { lastLogin: `${moment().format('DD/MM/YYYY')}` },
      },
      {
        upsert: false,
      }
    )
    .catch((e) => {
      throw next(new Error(`402:${e}`));
    });

  delete req.user.password;
  res.send({
    mail: req.user.mail,
    idUser: req.user.idUser ,
    accessToken,
    refreshToken,
  });
};

//============== sendmail ===============//

// const sendmail = async (req, res, next) => {
//   try {
//     var user = await client
//       .db(process.env.DB)
//       .collection("user")
//       .findOne({ mail: req.body.mail });
//     console.log(user.mail);

//     if (user == undefined) {
//       return res.status(401).send({ success: false, mess: "User not existed" });
//     }

//     var transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: "bot.vie.2021@gmail.com",
//         pass: "@viesoftware55555",
//       },
//     });

//     var codeOTP = Math.floor(Math.random() * (9999 - 1000)) + 1000;

//     var mailOptions = {
//       from: "bot.vie.2021@gmail.com",
//       to: user.mail,
//       subject: "Forgot Password",
//       text: "Mã OTP của bạn là: " + codeOTP,
//     };

//     transporter.sendMail(mailOptions, function (error, info) {
//       if (error) {
//         console.log(error);
//       } else {
//         console.log("Email sent: " + info.response);
//       }
//     });

//     await client
//       .db(process.env.DB)
//       .collection("user")
//       .update({ mail: user.mail }, { $set: { code: codeOTP } });

//     return res.send({ success: true, mess: "had sent SMS" });
//   } catch (err) {
//     next(err);
//   }
// };
const sendmail = async (req, res, next) => {
  await client
    .db(process.env.DB)
    .collection("user")
    .updateOne(
      {
        mail: req.user.mail,
      },
      {
        $set: { code: `${req.user.code}` },
      }
    )
    .catch((e) => {
      throw next(new Error(`402:${`Create recovery code fail !`}`));
    });
  await sendMail(
    req.user.mail,
    "Forgot Password",
    `Mã OTP của bạn là: ${req.user.code}\nCreate by Edu .`
  ).catch((e) => {
    console.log(e);
    throw next(new Error(`402:${`Send mail fail !`}`));
  });
  res.send({
    status: true,
  });
};

//============== verifyotp ===============//

const verifyotp = async (req, res, next) => {
  try {
    var user = await client
      .db(process.env.DB)
      .collection("user")
      .findOne({ mail: req.body.mail, code: req.body.code });

    if (!user) {
      res.send({ success: false, mess: "Mailcode Incorrect " });
    } else {
      res.send({ success: true, mess: "Success" });
    }
  } catch (err) {
    next(err);
  }
};

//============== active ===============//

const active = async (req, res, next) => {
  try {
    var account = await client
      .db(process.env.DB)
      .collection("user")
      .findOne({ mail: req.body.mail });

    if (account.is_activate == false) {
      if (account.code == req.body.code) {
        console.log(account.code);

        await client.db(process.env.DB).collection("user").update(
          { mail: req.body.mail },
          {
            is_activate: true,
            code: "",
          }
        );

        return { success: true, mess: "Active Success!" };
      } else {
        return { success: false, mess: "Verify faile !" };
      }
    } else {
      return { success: false, mess: "Account Had Activated !" };
    }
  } catch (e) {
    return { success: false, mess: e };
  }
};

//============== changepass ===============//

const changepass = async (req, res, next) => {
  try {
    var user = await client
      .db(process.env.DB)
      .collection("user")
      .findOne({ mail: req.body.mail });

    if (!user.mail) {
      res.send({ success: false, mess: "Mail khong ton tai" });
    }

    req.body.password = bcrypt.hash(req.body.password);

    await client
      .db(process.env.DB)
      .collection("user")
      .updateOne(
        { password: user.password },
        { $set: { password: req.body.password } }
      );
    res.send({ success: true, mess: "Change password success " });
  } catch (err) {
    next(err);
  }
};

const getProfile = async (req, res, next) => {
  try {
    var user = await client
      .db(process.env.DB)
      .collection("user")
      .findOne({
        idUser: req.user.idUser,
      });

    res.send({ success: true, data: user });
  } catch (e) {
    return res.send({ success: false, mess: "Error: " + e });
  }
};

module.exports = {
  register,
  login,
  sendmail,
  changepass,
  verifyotp,
  active,
  getProfile,
};

const {
    updatePoint,
    getAllByUserID
} = require('../services/point');

const client = require('../config/mongodb');

const { validate } = require('../refun/until');
const { pointVal } = require("../refun/validate");

module.exports.getAllByUserID = async (req, res, next) =>  {
    try {
        getAllByUserID(req, res, next);
    }   
    catch(e){
        res.send({ success: false, mess: "Error: " + e });
    }
}

module.exports.updatePoint = async (req, res, next) =>  {
    try {
        if(req.body.data == undefined)
        {
            return res.send({success:false,mess:"Vui lòng truyền Data"});
        }
        updatePoint(req, res, next);
    }   
    catch(e){
        res.send({ success: false, mess: "Error: " + e });
    }
};

// module.exports.mediumScore = async (req, res, next) => {
//     let handling = (obj) => {
//         obj[`avg_1`] = 0;
//         obj[`avg_2`] = 0;
//         obj[`avg_3`] = 0;
        
//         if(obj.point1.length != 0){
//             for (let i in obj.point1) obj.avg_1 += parseFloat(obj.point1[i]);
//             obj.avg_1 /= obj.point1.length;
//         }
//         if(obj.point2.length != 0){
//             for (let i in obj.point2) obj.avg_2 += parseFloat(obj.point2[i]);
//             obj.avg_2 /= obj.point2.length;
//         }
//         if(obj.point3.length != 0){
//             for (let i in obj.point3) obj.avg_3 += parseFloat(obj.point3[i]);
//             obj.avg_3 /= obj.point3.length;
//         }

//         var a = (obj.point1.length == 0  ? 0 : 1)
//         + (obj.point2.length == 0  ? 0 : 2)
//         + (obj.point3.length == 0  ? 0 : 3);

//         a = a==0 ? 1 : a

//         obj[`avg`] = parseFloat(obj.avg_1 + obj.avg_2 * 2 + obj.avg_3 * 3) / a;
//         console.log(obj);
//         return obj;
//     };

//     function removeTone(str, isCaseSensitive = false) {
//         let formatted = isCaseSensitive ? str : str.toLowerCase();
    
//         formatted = formatted.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
//         formatted = formatted.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
//         formatted = formatted.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
//         formatted = formatted.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
//         formatted = formatted.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
//         formatted = formatted.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
//         formatted = formatted.replace(/đ/g, 'd');
    
//         if (isCaseSensitive) {
//             formatted = formatted.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, 'A');
//             formatted = formatted.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, 'E');
//             formatted = formatted.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, 'I');
//             formatted = formatted.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, 'O');
//             formatted = formatted.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, 'U');
//             formatted = formatted.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, 'Y');
//             formatted = formatted.replace(/Đ/g, 'D');
//         }
//         formatted = formatted.replace(' ', '');
//         return formatted;
//     }

//     //============== HK1 ====================
//     var _points1 = await client
//         .db(process.env.DB)
//         .collection(`point`)
//         .find({ idUser: req.body.idUser, semester: "1" })
//         .toArray();
//     // console.log(_points1);

//     var tbmon1 = {};
//     var ans1 = 0;
//     var number1 = 0;
//     for (let i in _points1) {
//         if(_points1[i].point1.length != 0 || _points1[i].point2.length != 0 || _points1[i].point3.length != 0){
//             _points1[i] = handling(_points1[i]);
//             ans1 += parseFloat(_points1[i].avg);
//             number1 += 1;
//             tbmon1[removeTone(_points1[i].nameSubject) + '1'] = _points1[i].avg;
//         }
//     }
//     ans1 /= number1;
//     // console.log(tbmon2);

//     //============== HK2 ====================

//     var _points2 = await client
//         .db(process.env.DB)
//         .collection(`point`)
//         .find({ idUser: req.body.idUser, semester: "2" })
//         .toArray();
    
//     var tbmon2 = {};
//     var ans2 = 0;
//     var number2 = 0;
//     for (let i in _points2) {
//         if(_points2[i].point1.length != 0 || _points2[i].point2.length != 0 || _points2[i].point3.length != 0){
//             _points2[i] = handling(_points2[i]);
//             ans2 += parseFloat(_points2[i].avg);
//             number2 += 1;
//             tbmon2[removeTone(_points2[i].nameSubject) + '2'] = _points2[i].avg;
//         }
//     }
//     ans2 /= number2;
//     // console.log(tbmon2);

//     //============== Total ====================
//     var total = 0;
//     total = (ans1 + ans2*2) / 3;

//     res.send({ success: true, ...tbmon1, HK1: ans1, ...tbmon2, HK2: ans2, total: total })
// }
/**
 * Created by PanJiaChen on 16/11/18.
 */
/**
 * @description 转换时间
 * @param {String} time 时间
 */
export function timeFormat(time, format = 'YYYY-MM-DD') {
 let newTime = require('dayjs')(time).format(format)
 if (!time) {
  newTime = ''
 }
 return newTime
}
export const nation =
{"data":[{"id":"01","name":"汉族"},{"id":"02","name":"蒙古族"},{"id":"03","name":"回族"},
    {"id":"04","name":"藏族"},{"id":"05","name":"维吾尔族"},{"id":"06","name":"苗族"},
    {"id":"07","name":"彝族"},{"id":"08","name":"壮族"},{"id":"09","name":"布依族"},
    {"id":"10","name":"朝鲜族"},{"id":"11","name":"满族"},{"id":"12","name":"侗族"},
    {"id":"13","name":"瑶族"},{"id":"14","name":"白族"},{"id":"15","name":"土家族"},
    {"id":"16","name":"哈尼族"},{"id":"17","name":"哈萨克族"},{"id":"18","name":"傣族"},
    {"id":"19","name":"黎族"},{"id":"20","name":"傈僳族"},{"id":"21","name":"佤族"},
    {"id":"22","name":"畲族"},{"id":"23","name":"高山族"},{"id":"24","name":"拉祜族"},
    {"id":"25","name":"水族"},{"id":"26","name":"东乡族"},{"id":"27","name":"纳西族"},
    {"id":"28","name":"景颇族"},{"id":"29","name":"柯尔克孜族"},{"id":"30","name":"土族"},
    {"id":"31","name":"达斡尔族"},{"id":"32","name":"仫佬族"},{"id":"33","name":"羌族"},
    {"id":"34","name":"布朗族"},{"id":"35","name":"撒拉族"},{"id":"36","name":"毛难族"},
    {"id":"37","name":"仡佬族"},{"id":"38","name":"锡伯族"},{"id":"39","name":"阿昌族"},
    {"id":"40","name":"普米族"},{"id":"41","name":"塔吉克族"},{"id":"42","name":"怒族"},
    {"id":"43","name":"乌孜别克族"},{"id":"44","name":"俄罗斯族"},{"id":"45","name":"鄂温克族"},
    {"id":"46","name":"崩龙族"},{"id":"47","name":"保安族"},{"id":"48","name":"裕固族"},
    {"id":"49","name":"京族"},{"id":"50","name":"塔塔尔族"},{"id":"51","name":"独龙族"},
    {"id":"52","name":"鄂伦春族"},{"id":"53","name":"赫哲族"},{"id":"54","name":"门巴族"},
    {"id":"55","name":"珞巴族"},{"id":"56","name":"基诺族"}]}
// 身份证验证
export function validateSfz(rule, value, callback) {
    if (!value) {
        return callback(new Error('身份证号码不能为空'));
    }
    function validataCredentials(num) {
        var msg, boo; //  msg身份证验证友情提示,boo返回值
        var num = num.toUpperCase(); // 身份证为末尾可能是X
        //   身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，
        //   最后一位是校验位，可能为数字或字符X。
        const arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
        const arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
        var nTemp = 0,
            i;
        if (!(/(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(num))) {
            //  输入的身份证号长度不对，或者号码不符合规定;
            return [boo = false, msg = "输入的身份证号不符合规定"];
        }
        //   校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
        //   下面分别分析出生日期和校验位
        var len, re;
        len = num.length;
        if (len == 15) {
            re = new RegExp(/^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/);
            var arrSplit = num.match(re);
            //   检查生日日期是否正确
            var dtmBirth = new Date('19' + arrSplit[2] + '/' + arrSplit[3] + '/' + arrSplit[4]);
            var bGoodDay;
            bGoodDay = (dtmBirth.getYear() == Number(arrSplit[2])) && ((dtmBirth.getMonth() + 1) == Number(arrSplit[3])) && (dtmBirth.getDate() == Number(arrSplit[4]));
            if (!bGoodDay) {
                //   输入的身份证号里出生日期不对！
                return [boo = false, msg = "输入的身份证号里出生日期不对！"];

            } else {
                //   将15位身份证转成18位
                //   校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
                num = num.substr(0, 6) + '19' + num.substr(6, num.length - 6);
                for (i = 0; i < 17; i++) {
                    nTemp += num.substr(i, 1) * arrInt[i];
                }
                num += arrCh[nTemp % 11];
                return [boo = true, msg = num];
            }
        }
        if (len == 18) {
            re = new RegExp(/^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/);
            var arrSplit = num.match(re);
            //  检查生日日期是否正确
            var dtmBirth = new Date(arrSplit[2] + "/" + arrSplit[3] + "/" + arrSplit[4]);
            var bGoodDay;
            bGoodDay = (dtmBirth.getFullYear() == Number(arrSplit[2])) && ((dtmBirth.getMonth() + 1) == Number(arrSplit[3])) && (dtmBirth.getDate() == Number(arrSplit[4]));
            if (!bGoodDay) {
                //  输入的身份证号里出生日期不对！

                return [boo = false, msg = " 输入的身份证号里出生日期不对"];
            } else {
                //  检验18位身份证的校验码是否正确。
                //  校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
                var valnum;
                for (i = 0; i < 17; i++) {
                    nTemp += num.substr(i, 1) * arrInt[i];
                }
                valnum = arrCh[nTemp % 11];
                // if (valnum != num.substr(17, 1)) {
                //     //  18位身份证的校验码不正确！
                //     return [boo = false, msg = "身份证的校验码不正确！"];
                // }
                return [boo = true, msg = "验证成功"]
            }
        }
        return [boo = false, msg = "身份证的长度不正确！"];
    }
    setTimeout(() => {
        var res = validataCredentials(value);
        if (!res[0]) {
            callback(new Error(res[1]));
        } else {
            callback();
        }
    }, 200);
};

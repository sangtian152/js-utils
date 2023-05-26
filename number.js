// 数字转大写
const convertCurrency = (money) => {
    //汉字的数字
    var cnNums = new Array('零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖');
    //基本单位
    var cnIntRadice = new Array('', '拾', '佰', '仟');
    //对应整数部分扩展单位
    var cnIntUnits = new Array('', '万', '亿', '兆');
    //对应小数部分单位
    var cnDecUnits = new Array('角', '分', '毫', '厘');
    //整数金额时后面跟的字符
    var cnInteger = '整';
    //整型完以后的单位
    var cnIntLast = '元';
    //最大处理的数字
    var maxNum = 999999999999999.9999;
    //金额整数部分
    var integerNum;
    //金额小数部分
    var decimalNum;
    //输出的中文金额字符串
    var chineseStr = '';
    //分离金额后用的数组，预定义
    var parts;
    // 是否为负数
    var isMinus = '';
    if (money == '') { return ''; }
    money = parseFloat(money);
    if (money >= maxNum) {
      //超出最大处理数字
      return '';
    }
    if (money == 0) {
      chineseStr = cnNums[0] + cnIntLast + cnInteger;
      return chineseStr;
    }
    if(money < 0){ //负数
      isMinus = '（负数）'
      money = Math.abs(money)
    }
    //转换为字符串
    money = money.toString();
    if (money.indexOf('.') == -1) {
      integerNum = money;
      decimalNum = '';
    } else {
      parts = money.split('.');
      integerNum = parts[0];
      decimalNum = parts[1].substr(0, 4);
    }
    //获取整型部分转换
    if (parseInt(integerNum, 10) > 0) {
      var zeroCount = 0;
      var IntLen = integerNum.length;
      for (var i = 0; i < IntLen; i++) {
        var n = integerNum.substr(i, 1);
        var p = IntLen - i - 1;
        var q = p / 4;
        var m = p % 4;
        if (n == '0') {
          zeroCount++;
        } else {
          if (zeroCount > 0) {
            chineseStr += cnNums[0];
          }
          //归零
          zeroCount = 0;
          chineseStr += cnNums[parseInt(n)] + cnIntRadice[m];
        }
        if (m == 0 && zeroCount < 4) {
          chineseStr += cnIntUnits[q];
        }
      }
      chineseStr += cnIntLast;
    }
    //小数部分
    if (decimalNum != '') {
      var decLen = decimalNum.length;
      for (var i = 0; i < decLen; i++) {
        var n = decimalNum.substr(i, 1);
        if (n != '0') {
          chineseStr += cnNums[Number(n)] + cnDecUnits[i];
        }
      }
    }
    if (chineseStr == '') {
      chineseStr += cnNums[0] + cnIntLast + cnInteger;
    } else if (decimalNum == '') {
      chineseStr += cnInteger;
    }
    return isMinus+chineseStr;
}

/**
 * 数字格式化
 * @param s 需要格式化数字  4222.3363
 * @param n 取小数点后位数  2
 * @param comma 是否带逗号   true显示带逗号，false显示不带逗号
 * @param f 是否显示0   true显示0 false显示''
 * @param trim小数位数是否舍0,true舍0,false或不传不舍0
 * @returns 4,222.34或者 4222.34
 */
const fmoney = (s, n, comma, f,trim) => {
    var flag = '0',
        result;  //  是否带逗号
    if (!s || s == "") {
        if(f){
            return 0;
        }
        return '';
    }
    s = s.toString();
    //记录负号标志
    if (s.substring(0, 1) == '-') {
        s = s.substring(1, s.length);
        flag = '1';
    }else{
      if(s.indexOf('-')!=-1){
        s = s.split('-')[1]
        flag = '1'
      }
    }
    // 去除多余小数点
    let spl = s.split('.')
    if(spl.length-1 > 1){
      spl.splice(1, 0, '.');
      s = spl.join('')
    }


    n = n >= 0 && n <= 20 ? n : 2;
    s = (s + "").replace(/[^\d\.-]/g, "") + "";
    s = s * 1 * Math.pow(10, n);
    let tempInt = parseInt(s) + 0.5;
    if(Math.abs(tempInt - s) < 0.00000001){
      s = tempInt;
    }
    s = Math.round(s) / Math.pow(10, n);
    s = parseFloat(s + "").toFixed(n) + "";

    if(comma) {
        var l = s.split(".")[0].split("").reverse(), r = s.split(".")[1];
        var t = "";
        for (var i = 0; i < l.length; i++) {
            t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
        }
        result = t.split("").reverse().join("");
        if (n > 0) {
            result += "." + r;
        }
    } else {
        result = s;
    }

    if (flag == 1)
        result = "-" + result;
    var re = /^(\-)?0.0+$/;
    if (re.test(result)) {
        result = "0";
    }
    if(!f){
        if(parseFloat(result) == 0)
            result = "";
    }
    if(trim==true){
      result = result.replace(/(\.0*$)|(0*$)/g,"");
    }
    return result;
}

// 加减乘除运算，处理了逗号及小数精度问题
// type  + 加，- 减，* 乘，/ 除
const calc = (a,b,type) => {
    a=a?a.toString().replace(/,/g,''):'0'
    b=b?b.toString().replace(/,/g,''):'0'
    if(isNaN(a)){
      a = '0'
    }
    if(isNaN(b)){
      b = '0'
    }
    function str2num(str){
      let len = str.split('.')[1]?str.split('.')[1].length:0
      let times = Math.pow(10, len)
      str=str.replace(/\./g,'')
      str=str.replace(/\b(0+)/gi,"")
      let num = Number(str)
      return [num,times]
    }
    let r1=str2num(a)
    let r2=str2num(b)
    let t = r1[1]/r2[1]
    if(type=='+'|| type=='-'){ //加 & 减
      if(t>1){
        r2[0]=r2[0]*t
      }else{
        r1[0]=r1[0]/t
      }
      t = r1[1]>r2[1]?r1[1]:r2[1]
      return type=='+'?(r1[0]+r2[0])/t : (r1[0]-r2[0])/t
    }else if(type=='*'){ //乘
      return (r1[0]*r2[0])/(r1[1]*r2[1])
    }else if(type=='/'){ //除
      if((r1[1]*r2[0])!=0){
          return (r1[0]*r2[1])/(r1[1]*r2[0])
      }else{
          return 0
      }
    }
}
// 生成随机字符串，含大、小写字母，数字
// e表示长度
const randomString = (e) => {  
    e = e || 32;
    var t = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678",
    a = t.length,
    n = "";
    for (let i = 0; i < e; i++) n += t.charAt(Math.floor(Math.random() * a));
    return n
  }

// 连字符转驼峰 如：background-color => backgroundColor
const camelize = (str) => {
    const camelizeRE = /-(\w)/g;
    return str.replace(camelizeRE, (_, c) => c.toUpperCase());
}

// 驼峰转连字符 如：backgroundColor => background-color
const kebabCase = function(str) {
    const hyphenateRE = /([^-])([A-Z])/g;
    return str
      .replace(hyphenateRE, '$1-$2')
      .replace(hyphenateRE, '$1-$2')
      .toLowerCase();
};

// 首字母转大写
const capitalize = (str) => {
    if (typeof str !== 'string') return str;
    return str.charAt(0).toUpperCase() + str.slice(1);
}
  
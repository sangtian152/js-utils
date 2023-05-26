const isString = (obj) => {
    return Object.prototype.toString.call(obj) === '[object String]';
}

const isObject = (obj) =>  {
    return Object.prototype.toString.call(obj) === '[object Object]';
}
// 检测变量是否为数字或数字字符串
const isNumeric = (val) =>  {
    return /^\d+(\.\d+)?$/.test(val);
}

const isExternal = (path) => {
    return /^(https?:|mailto:|tel:)/.test(path)
}

const validURL = (url) => {
    const reg = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
    return reg.test(url)
}

const isEmail = (email) => {
    const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return reg.test(email)
}

const isUndefined = (val)=> {
    return val === void 0;
};

const isDefined = (val) => {
    return val !== undefined && val !== null;
};
// 判断两个简单数组是否相等
const valueEquals = (a, b) => {
    // see: https://stackoverflow.com/questions/3115982/how-to-check-if-two-arrays-are-equal-with-javascript
    if (a === b) return true;
    if (!(a instanceof Array)) return false;
    if (!(b instanceof Array)) return false;
    if (a.length !== b.length) return false;
    for (let i = 0; i !== a.length; ++i) {
      if (a[i] !== b[i]) return false;
    }
    return true;
};

// 判断两个对象是否相等
const looseEqual = function(a, b) {
    const isObjectA = isObject(a);
    const isObjectB = isObject(b);
    if (isObjectA && isObjectB) {
      return JSON.stringify(a) === JSON.stringify(b);
    } else if (!isObjectA && !isObjectB) {
      return String(a) === String(b);
    } else {
      return false;
    }
  };

// 判断两个数组是否相等
const arrayEquals = function(arrayA, arrayB) {
    arrayA = arrayA || [];
    arrayB = arrayB || [];
  
    if (arrayA.length !== arrayB.length) {
      return false;
    }
  
    for (let i = 0; i < arrayA.length; i++) {
      if (!looseEqual(arrayA[i], arrayB[i])) {
        return false;
      }
    }
  
    return true;
};

// 判断两个值是否相等
const isEqual = function(value1, value2) {
    if (Array.isArray(value1) && Array.isArray(value2)) {
      return arrayEquals(value1, value2);
    }
    return looseEqual(value1, value2);
};

// 判断是否是空值，包括空字符串、空数组、空对象等
const isEmpty = function(val) {
    // null or undefined
    if (val == null) return true;
  
    if (typeof val === 'boolean') return false;
  
    if (typeof val === 'number') return !val;
  
    if (val instanceof Error) return val.message === '';
  
    switch (Object.prototype.toString.call(val)) {
      // String or Array
      case '[object String]':
      case '[object Array]':
        return !val.length;
  
      // Map or Set or File
      case '[object File]':
      case '[object Map]':
      case '[object Set]': {
        return !val.size;
      }
      // Plain Object
      case '[object Object]': {
        return !Object.keys(val).length;
      }
    }
  
    return false;
};
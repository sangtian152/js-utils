
// 合并对象
const mergeObject = (target) => {
    for (let i = 1, j = arguments.length; i < j; i++) {
      let source = arguments[i] || {};
      for (let prop in source) {
        if (source.hasOwnProperty(prop)) {
          let value = source[prop];
          if (value !== undefined) {
            target[prop] = value;
          }
        }
      }
    }
  
    return target;
};

// 拷贝对象中某些属性，或排除某些属性
// opt.includes、opt.excludes传字符串或数组
const cloneObject = (target, source, opt = {}) => {
    if (!source) {
        return target;
    }
    const inKeys = opt.includes ? [].concat(opt.includes) : ''
    const outKeys = opt.excludes ? [].concat(opt.excludes) : ''
    Object.keys(source).forEach(key => {
        if (inKeys || outKeys) {
            if (inKeys.includes(key) || !outKeys.includes(key)) {
                target[key] = source[key]
            }
        } else {
            target[key] = source[key]
        }
    })
    return target
}
  
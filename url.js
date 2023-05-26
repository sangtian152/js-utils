// url参数转对象
export function param2Obj(url) {
    let search = decodeURIComponent(url.split('?')[1]).replace(/\+/g, ' ')
      search = search.split('#')[0]
    if (!search) {
      return {}
    }
    const obj = {}
    const searchArr = search.split('&')
    searchArr.forEach(v => {
      const index = v.indexOf('=')
      if (index !== -1) {
        const name = v.substring(0, index)
        const val = v.substring(index + 1, v.length)
        obj[name] = val
      }
    })
    return obj
  }
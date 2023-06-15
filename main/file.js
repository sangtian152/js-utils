// 将base64转换为blob
const dataURLtoBlob = (dataurl) => {
    let arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
}
  // 将blob转换为file
const blobToFile = (theBlob, fileName) => {
  return new File([theBlob], fileName, {
    lastModifiedDate: new Date(),
    type: theBlob.type
  })
}

// a链接下载
const downloadFileUrl = (url, fileName) => {
    const elink = document.createElement('a')
    const str = url.split('?')[0] || ''
    const _fileName = fileName ? fileName : str.split('/').pop() || ''
    elink.href = url
    elink.setAttribute('download', _fileName)
    elink.style.display = 'none'
    document.body.appendChild(elink)
    setTimeout(() => {
      elink.click()
      document.body.removeChild(elink)
    }, 66)
  }

// 传入图片链接获取宽高
const getImageDimensions = (url)  => {
    return new Promise((resolve,reject) => {
      try {
        if (!url) {
          resolve({width: 1, height: 1})
        }
        const img = new Image;
        img.onload = () => {
          const { width, height } = img;
          URL.revokeObjectURL(img.src);
          if (width && height) 
            resolve({ width, height });
          else 
            reject(new Error("Missing image dimensions"));
        };
        img.src=url;
      }
      catch(err) {
        resolve({ width: 1, height: 1 });
      }
    });
};
function doSave (obj) {
  if (!obj) return
  // obj = document.getElementById('obj')
  if (isIE()) { // IE浏览器保存文本框内容
    var winname = window.open('', '_blank', 'top=10000')
    winname.document.open('text/html', 'replace')
    winname.document.writeln(obj.value)
    winname.document.execCommand('saveas', '', 'code.md')
    winname.close()
  } else {
    saveAs(obj, 'code.md')
  }
}
function saveAs (obj, filename) { // chrome,火狐等现代浏览器保存文本框内容
  // console.log(obj.value)
  // var a = document.createElement('a')
  // a.setAttribute('href', 'data:text/md;utf-8,' + obj.value)
  // a.setAttribute('download', filename)
  // a.setAttribute('target', '_blank')
  // a.style.display = 'none'
  // // obj.parentNode.appendChild(a)
  // document.body.appendChild(a)
  // a.click()
  const downLink = document.createElement('a')
  downLink.download = filename
  // 字符内容转换为blod地址
  const blob = new Blob([obj.value])
  downLink.href = URL.createObjectURL(blob)
  // 链接插入到页面
  document.body.appendChild(downLink)
  downLink.click()
  // 移除下载链接
  document.body.removeChild(downLink)
}

function isIE () {
  if (!!window.ActiveXObject || 'ActiveXObject' in window) { return true } else { return false }
}

export { // 很关键
  doSave,
  saveAs,
  isIE
}

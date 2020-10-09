import axios from 'axios'

function download(url) {
  axios.post(url, { responseType: 'blob' })
    .then((res) => {
      const { data, headers } = res
      const fileName = headers['content-disposition'].replace(/\w+;.+filename=(.*)/, '$1')
      // 此处当返回json文件时需要先对data进行JSON.stringify处理，其他类型文件不用做处理
      // const blob = new Blob([JSON.stringify(data)], ...)
      const blob = new Blob([data], { type: headers['content-type'] })
      const dom = document.createElement('a')
      const url = window.URL.createObjectURL(blob)
      dom.href = url
      dom.download = decodeURI(fileName)
      dom.style.display = 'none'
      document.body.appendChild(dom)
      dom.click()
      dom.parentNode.removeChild(dom)
      window.URL.revokeObjectURL(url)
    })
}

export default download

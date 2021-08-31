import SparkMD5 from 'spark-md5'

/**
 * 元素滚动到顶部
 * @param traget id 选择器
 */
export const scrollIntoView = (traget: string) => {
  const tragetElem = document.querySelector(traget)
  tragetElem?.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

/**
 * 字符串转 Unit8Array 的方法
 * @param str string
 * @returns {Uint8Array}
 */
export const stringToUint8Array = (str: string) => {
  const arr = []
  for (let i = 0, j = str.length; i < j; ++i) {
    arr.push(str.charCodeAt(i))
  }
  return new Uint8Array(arr)
}

/**
 * @description 数据请求对数据异或加解密处理,不存在token的情况
 * OR 是否需要异或处理
 */
export const encDecWithOutTK = (data: ArrayBuffer, OR?: boolean) => {
  if (data === null || data.byteLength === 0) {
    return data
  }
  const unit8 = new Uint8Array(data)
  if (OR) {
    // 使用密钥字节数组循环加密或解密
    const result = new Uint8Array(unit8.byteLength)
    for (let i = 0; i < unit8.byteLength; i++) {
      result[i] = unit8[i] ^ (i & 0x000000FF)
    }
    return result
  } else {
    return unit8
  }
}

/**
 * @description 数据请求对数据异或加解密处理,存在token的情况
 * data 原始数据
 * token 解密异或处理
 */
export const encDecWithTK = (data: ArrayBuffer, dtToken?: string | null) => {
  if (data === null || data.byteLength === 0) {
    return data
  }

  const unit8 = new Uint8Array(data)

  // 使用密钥字节数组循环加密或解密
  if (dtToken) {
    const mdDtToken = SparkMD5.hash(SparkMD5.hash(dtToken))
    const key = stringToUint8Array(mdDtToken)
    const result = new Uint8Array(unit8.byteLength)
    for (let i = 0; i < unit8.byteLength; i++) {
      result[i] = (unit8[i] ^ key[i % key.byteLength])
    }
    return result
  } else {
    return unit8
  }
}

/**
 * 对文件进行MD5加密
 */
export const fileToMD5 = (former: any): Promise<unknown> => {
  return new Promise(function (resolve, reject) {
    var blobSlice = File.prototype.slice
    var file = former
    var chunkSize = 2097152 // Read in chunks of 2MB
    var chunks = Math.ceil(file.size / chunkSize)
    var currentChunk = 0
    var spark = new SparkMD5.ArrayBuffer()
    var fileReader = new FileReader()

    function loadNext() {
      var start = currentChunk * chunkSize
      var end = ((start + chunkSize) >= file.size) ? file.size : start + chunkSize

      fileReader.readAsArrayBuffer(blobSlice.call(file, start, end))
    }

    fileReader.onload = function (e) {
      // @ts-ignore
      spark.append(e.target!.result) // Append array buffer
      currentChunk++

      if (currentChunk < chunks) {
        loadNext()
      } else {
        resolve(spark.end())
      }
    }

    fileReader.onerror = function () {
      reject(new Error('oops, something went wrong.'))
    }

    loadNext()
  })
}

// 下载excel文件
export function downloadExcel(fileName: string, ret: Blob) {
  const a = document.createElement('a')

  const blob = new Blob([ret], { type: 'application/vnd.ms-excel' })

  const url = window.URL.createObjectURL(blob)

  a.setAttribute('href', url)

  const date = new Date()
  const h = date.getHours()
  const m = date.getMinutes()
  const s = date.getSeconds()
  let time = date.toLocaleDateString()
  time = time + ` ${h}_${m}_${s}`
  const reportName = fileName + '_' + time + '.xls'

  a.setAttribute('download', reportName)

  a.click()
  a.remove()
}

/**
 * 比较版本号
 * @param version1 版本号
 * @param version2 版本号
 * @description version1 > version2 返回1 ;version1 < version2 返回-1 ; 其他情况返回0
 * @returns
 */
export const compareVersion = (version1:string, version2: string) => {
  const arr1 = version1.split('.')
  const arr2 = version2.split('.')
  const length1 = arr1.length
  const length2 = arr2.length
  const minlength = Math.min(length1, length2)
  let i = 0
  for (i; i < minlength; i++) {
    const a = parseInt(arr1[i])
    const b = parseInt(arr2[i])
    if (a > b) {
      return 1
    } else if (a < b) {
      return -1
    }
  }
  if (length1 > length2) {
    for (let j = i; j < length1; j++) {
      if (parseInt(arr1[j]) !== 0) {
        return 1
      }
    }
    return 0
  } else if (length1 < length2) {
    for (let j = i; j < length2; j++) {
      if (parseInt(arr2[j]) !== 0) {
        return -1
      }
    }
    return 0
  }
  return 0
}

/**
 * 返回min到max之间的一个随机整数
 * @param min 最小数
 * @param max 最大数
 * @returns
 * @description 包后不包前
 */
export const minToMaxRandom = (min:number, max: number) => {
  return Math.floor(Math.random() * (max - min)) + min
}

/**
 * 返回一个十六进制的颜色,例如#FFFFFF
 * @returns
 */
export const colorRandomTo16 = () => {
  var str = "#"
  for (var i = 1; i <= 6; i++) {
    str += minToMaxRandom(0, 15).toString(16)
  }
  return str
}

/**
 * 测算元素距离页面的距离
 * @param dom 测算元素距离页面的距离
 * @returns
 */
export const getDistance = (dom: any) => {
  let totalLeft = 0
  let totalTop = 0
  do {
    totalLeft += dom.offsetLeft
    totalTop += dom.offsetTop
    // 下一次的dom节点就是本次dom节点的最近的有定位的父元素
    dom = dom.offsetParent
  } while (dom.nodeName !== "BODY")

  return {
    left: totalLeft,
    top: totalTop
  }
}

/**
 * 封装一个函数,返回鼠标按键,要求:左0  中1  右2
 * @param e
 * @returns
 */
export const getButton = (e: any) => {
  // 普通的函数
  if (e) {
    // 如果接到的e确实有值,说明e不是undefined,说明当前浏览器不是IE678
    return e.button
  } else {
    // 就是IE678
    // @ts-ignore
    switch (window.event.button) {
      case 1:
        return 0
      case 4:
        return 1
      case 2:
        return 2
    }
  }
}

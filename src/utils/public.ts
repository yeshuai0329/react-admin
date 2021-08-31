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

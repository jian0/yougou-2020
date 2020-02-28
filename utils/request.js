// 封装request
// config | object | {}
const request = (config = {}) => {

  // 如果路径以http开头，则不需要拼接基准路径,反之则加上， 判断添加为-1则是没有，0是以http开头
  if (config.url.search(/^http/) === -1) {
    config.url = request.defaults.baseURL + config.url
  }

  // 返回一个promise
  // resolve是 .then 里面的函数，一般请求成功时候执行
  // reject 是 .catch 里面的函数，一般用于请求失败时候执行
  return new Promise((resolve, reject) => {
    wx.request({
      ...config,
      success(res) {
        // 成功时返回的回调函数
        resolve(res)
      },
      fail(res) {
        // 失败时返回的回调函数
        reject(res)
      },
      // 不管成功与否，都会执行这个函数
      complete(res) {
        // 执行错误的拦截器
        request.errors(res)
      }
    })
  })
}

// 基准路径
request.defaults = {
  baseURL: ""
}

// 存储错误的回调函数，默认是空
request.errors = () => { }

// request的错误拦截
request.onError = (callback) => {
  if (typeof callback === 'function') {
    request.errors = callback
  }
}

export default request;
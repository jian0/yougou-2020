import request from "./utils/request.js";
//app.js
App({
  onLaunch: function () {
    request.defaults.baseURL = "https://api-hmugo-web.itheima.net/api/public/v1"
  },
  globalData: {
  }
})
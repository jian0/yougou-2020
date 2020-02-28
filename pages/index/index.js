import request from "../../utils/request.js"
Page({
  data: {
    banners: [], // 轮播图数据
    navs: [] // 导航栏数据
  },
  onLoad() {
    // 获取轮播图数据
    request({
      url: "/home/swiperdata"
    }).then(res => {
      // console.log(res)
      const {message} = res.data
      this.setData({
        banners: message
      })
    })

    // 获取导航栏数据
    request({
      url: "/home/catitems"
    }).then(res => {
      console.log(res)
      const {message} = res.data
      this.setData({
        navs: message
      })
    })
  }
})
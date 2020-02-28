import request from "../../utils/request.js"
Page({
  data: {
    banners: [], // 轮播图数据
    navs: [], // 导航栏数据
    floors: [], //楼层数据
    isShow: false //是否显示返回顶部
  },
  onLoad() {
    // 获取轮播图数据
    request({
      url: "/home/swiperdata"
    }).then(res => {
      // console.log(res)
      const {
        message
      } = res.data
      this.setData({
        banners: message
      })
    })

    // 获取导航栏数据
    request({
      url: "/home/catitems"
    }).then(res => {
      // console.log(res)
      const {
        message
      } = res.data
      this.setData({
        navs: message
      })
    })

    // 获取楼层数据
    request({
      url: "/home/floordata"
    }).then(res => {
      // console.log(res)
      const {
        message
      } = res.data
      this.setData({
        floors: message
      })
    })
  },
  // 返回顶部
  scrollToTop() {
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 300
    })
  },

  // 监听页面滚动事件
  onPageScroll(e) {
    const {scrollTop} = e;
    let status = this.data.isShow;
    if (scrollTop > 100) {
      status = true
    } else {
      status = false
    }
    // 当状态一样的时候，不重新赋值 
    if (status == this.data.isShow) return;
    // console.log(e)
    this.setData({
      isShow: status
    })
  }
})
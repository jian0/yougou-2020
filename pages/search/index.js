import request from "../../utils/request.js"
// pages/search/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: "", // 输入框内容
    last_value: "", //最终输入的值
    goods: [], //搜索建议数据
    history: [], //历史记录
    hasMore: false // 开关：判断用户是否继续输入内容
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let arr = wx.getStorageSync("list")
    this.setData({
      history: arr
    })
  },
  // 输入框输入时触发
  handleInput(e) {
    console.log(e)
    const {
      value
    } = e.detail
    this.setData({
      value
    })
    if (!value) {
      this.setData({
        goods: []
      })
      return
    }
    this.getGoods()
  },
  // 输入框失焦时触发
  handleBlur() {
    this.setData({
      value: "",
      goods: []
    })
  },
  // 点击取消按钮时触发
  handleCancel() {
    this.setData({
      value: ""
    })
  },
  // 点击确定按钮时触发
  handleEnter() {
    // 取出数据
    let arr = wx.getStorageSync("list")
    // 如果本地储存的数据不是数据
    if (!Array.isArray(arr)) {
      arr = []
    }
    arr.unshift(this.data.value)
    // 数组去重
    arr = [...new Set(arr)]
    // 存储到本地
    wx.setStorageSync("list", arr)
    wx.redirectTo({
      url: "/pages/goods_list/index?keyword=" + this.data.value
    })
  },
  // 点击关闭图标时触发
  handleDel() {
    this.setData({
      history: []
    })
    wx.setStorageSync("list", [])
  },
  // 封装方法
  getGoods() {
    if (this.data.hasMore === false) {
      // 进来后开启开光
      this.setData({
        hasMore: true,
        last_value: this.data.value
      })
      request({
        url: "/goods/qsearch",
        data: {
          query: this.data.value
        }
      }).then(res => {
        // console.log(res)
        const {
          message
        } = res.data
        this.setData({
          goods: message,
          hasMore: false
        })
        if (this.data.last_value !== this.data.value) {
          this.getGoods()
        }
      })
    }
  }
})
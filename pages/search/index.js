import request from "../../utils/request.js"
// pages/search/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: "", // 输入框内容
    goods: [] //搜索建议数据
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // this.getGoods()
  },
  // 输入框输入时触发
  handleInput(e) {
    // console.log(e)
    const {
      value
    } = e.detail
    this.setData({
      value
    })
    this.getGoods()
  },
  // 输入框失焦时触发
  handleBlur(){
    this.setData({
      value:"",
      goods:[]
    })
  },
  // 点击取消按钮时触发
  handleCancel(){
    this.setData({
      value:""
    })
  },
  // 点击确定按钮时触发
  handleEnter() {

  },
  // 点击关闭图标时触发
  handleDel(){
    
  },
  getGoods() {
    request({
      url: "/goods/qsearch",
      data: {
        query: this.data.value
      }
    }).then(res => {
      console.log(res)
      const {
        message
      } = res.data
      this.setData({
        goods: message
      })
    })

  }
})
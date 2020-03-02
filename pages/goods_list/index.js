import request from "../../utils/request.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods:[], //商品列表数据
    current:0, //tab栏索引
    pagenum:1 //页码
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {keyword} = options
    request({
      url:"/goods/search",
      data:{
        query: keyword, //关键字
        pagenum: this.data.pagenum, // 页码
        pagesize:10 //显示的条数
      }
    }).then(res=>{
      console.log(res)
      const {goods} = res.data.message
      this.setData({
        goods
      })
    })
  },
  handleClick(e){
    const {index} = e.target.dataset
    this.setData({
      current:index
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
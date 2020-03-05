import request from "../../utils/request.js"
// pages/goods_detail/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods:[], // 商品详情数据
    current:0,
    id:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options)
    const {goods_id} = options
    request({
      url:"/goods/detail",
      data:{
        goods_id
      }
    }).then(res=>{
      console.log(res)
      const {message} = res.data
      this.setData({
        goods: message,
        id: goods_id
      })
    })
  },
  handleClick(e){
    // console.log(e)
    const {index} = e.target.dataset
    this.setData({
      current: index
    })
  }
})
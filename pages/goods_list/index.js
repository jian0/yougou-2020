import request from "../../utils/request.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods: [], //商品列表数据
    current: 0, //tab栏索引
    pagenum: 1, //页码
    hasMore: true, //是否有更多数据
    loading: true, //是否加载中
    keyword: "" //关键字
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const {
      keyword
    } = options
    this.setData({
      keyword
    })
    this.getData()
  },
  getData() {
    setTimeout(() => {
      request({
        url: "/goods/search",
        data: {
          query: this.data.keyword, //关键字
          pagenum: this.data.pagenum, // 页码
          pagesize: 10 //显示的条数
        }
      }).then(res => {
        // console.log(res)
        const {goods} = res.data.message
        // 价格后面加2位小数
        const result = goods.map(v => {
          v.goods_price = Number(v.goods_price).toFixed(2)
          return v
        })
        this.setData({
          goods: [...this.data.goods, ...result],
          loading:false
        })
        if (this.data.goods.length >= res.data.message.total){
          // console.log(this.data.goods.length)
          // console.log(res.data.message.total)
          this.setData({
            hasMore:false
          })
        }
      })
    }, 2000);
  },

  // 点击tab栏时高亮
  handleClick(e) {
    const {
      index
    } = e.target.dataset
    this.setData({
      current: index
    })
  },

  // 拉到底部时触发
  onReachBottom() {
    if (this.data.loading === false) {
      this.setData({
        loading: true,
        pagenum: this.data.pagenum + 1
      })
      this.getData()
    }
  }
})
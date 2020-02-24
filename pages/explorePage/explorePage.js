var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataBase: [],
    favourite: [],
    swiperItem:[
      {title: "每日推荐", text: "精选TOP5", src: 'http://att.marco.wowdg.com/uploads/20200102/e7345dfbd9ca33d9faf2ee0c60e63ea5.jpg'},
      {title: "大牌直达", text: "国内顶尖品牌", src: 'http://att.marco.wowdg.com/uploads/20191119/lsFvBQjRPLosx2qeNkr21EdYMi-q.jpg'},
      {title: "罗马新时代系列", text: "自然天成，大而不同", src: 'http://www.monalisa.com.cn/UploadFile/trees/bd152eb4-eb7f-4159-a801-478d737abf44.jpg'},
      {title: "蒙娜丽莎薄砖", text: "创享环保新生活", src: 'http://www.monalisa.com.cn/UploadFile/zy/fddb55fa-ce9f-4d8f-b42d-a096303a9e9b.jpg'},
      {title: "七星珍石系列", text: "因不凡而自有锋芒", src: 'http://www.monalisa.com.cn/UploadFile/trees/eaf5f82a-4c3c-4c46-a0cd-304f0f432255.jpg'},
      {title: "E-STONE+系列", text: "六大提升，行业顶尖", src: 'http://att.marco.wowdg.com/media/images/products/2017/02/%E6%B8%85%E6%B0%B4%E6%B3%A5%E7%BA%A2%E8%89%B2%E8%83%8C%E6%99%AF7-7.jpg'},
    ],
    page: 1
  },

  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getTileData(1)
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

  },

  swiperClicked(e){
    var name = e.target.dataset.name
    console.log(name)
    if (name == "每日推荐"){
      wx.navigateTo({
        url: '/pages/commendPage/commendPage',
      })
    }
    else if (name == "价格估算"){
      wx.navigateTo({
        url: '/pages/calcPage/calcPage',
      })
    }
    else if (name == "大牌直达"){
      wx.navigateTo({
        url: '/pages/brandPage/brandPage',
      })
    }
  },

  moreClicked:function(){
    wx.navigateTo({
      url: '/pages/detailPage/detailPage',
    })
  },

  picClicked:function(e){
    var currentUrl = e.currentTarget.dataset.name
    currentUrl = currentUrl.substr(0, currentUrl.length - 4) + "_max.jpg"

    wx.previewImage({
      current: currentUrl, // 当前显示图片的http链接
      urls: [currentUrl] // 需要预览的图片http链接列表
    })
  },

  favourtieClicked:function(e){
    var that = this
    var num = e.currentTarget.dataset.num
    const picName = [this.data.dataBase[num].brand, this.data.dataBase[num].code]
    const picPath = this.data.dataBase[num].picPath
    wx.showLoading({
      title: '处理中',
      during: 1500
    })
    wx.cloud.callFunction({
      name: "heartClicked",
      data:{
        type: 'tile',
        picName: picName,
        picPath: picPath
      },
      success(res){
        var text = res.result.text
        wx.showToast({
          title: text,
        })
        that.getHeart()
      }
    })
  },

  getHeart:function(){
    var that = this
    wx.cloud.callFunction({
      name: "getStorage",
      success(res){
        var temp = []
        for (var i=0; i<that.data.dataBase.length; i++){
          var find = 0
          for (var j=0; j<res.result.data.tileData.length; j++){
            if (that.data.dataBase[i].picPath == res.result.data.tileData[j].picPath){
              find = 1
              break
            }
          }
          temp.push(find)
        }
        that.setData({
          favourite: temp
        })
      }
    })
  },

  loadMore:function(){
    var page = this.data.page + 1
    this.setData({
      page: page
    })
    this.getTileData(page)
  },

  getTileData:function(num){
    var that = this
    wx.cloud.callFunction({
      name: "getTileData",
      data: {
        page: num,
        brand: '全部',
        color: '全部',
        type: '全部',
        width: '全部',
        height: '全部'
      },
      success(res){
        console.log(res.result.tileData)
        that.setData({
          dataBase: that.data.dataBase.concat(res.result.tileData)
        })
        that.getHeart()
      }
    })
  }
})
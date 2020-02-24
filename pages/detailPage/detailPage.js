// pages/detailPage/detailPage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataBase: [],
    favourite: [],
    page: 1,
    searchDetail: '',
    brand: '全部',
    color: '全部',
    type: '全部',
    width: '全部',
    height: '全部'
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
    wx.setNavigationBarTitle({
      title: '精选瓷砖' 
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getTileData(this.data.page, 'refresh')
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

  picClicked:function(e){
    var currentUrl = e.currentTarget.dataset.name
    currentUrl = currentUrl.substr(0, currentUrl.length - 4) + "_max.jpg"

    wx.previewImage({
      current: currentUrl, // 当前显示图片的http链接
      urls: [currentUrl] // 需要预览的图片http链接列表
    })
  },

  favourtieClicked:function (e){
    var that = this
    var num = e.currentTarget.dataset.num
    const picName = [this.data.dataBase[num].brand, this.data.dataBase[num].name]
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

  getHeart:function (){
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

  loadMore:function (){
    var page = this.data.page + 1
    this.setData({
      page: page
    })
    this.getTileData(page, 'add')
  },

  getTileData:function (num, mode){
    var that = this
    if (mode == "add"){
      wx.cloud.callFunction({
        name: "getTileData",
        data: {
          page: num,
          brand: that.data.brand,
          color: that.data.color,
          type: that.data.type,
          width: that.data.width,
          height: that.data.height
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
    else if (mode == 'refresh'){
      wx.cloud.callFunction({
        name: "getTileData",
        data: {
          page: 1,
          brand: that.data.brand,
          color: that.data.color,
          type: that.data.type,
          width: that.data.width,
          height: that.data.height
        },
        success(res){
          console.log(res.result.tileData)
          that.setData({
            dataBase: res.result.tileData,
            page: 1
          })
          that.getHeart()
        }
      })
    }
  },
  
  toSearchPage:function (){
    wx.navigateTo({
      url: '/pages/searchPage/searchPage',
    })
  }
})
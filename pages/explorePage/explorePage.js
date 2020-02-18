var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataBase: [],
    favourite: [],
    iconData:[{ icon: '/images/button-icon/commend.png', text: '大牌推荐'},
              { icon: '/images/button-icon/teach.png', text: '装修百科'},
              { icon: '/images/button-icon/money.png', text: '价格估算'},
              { icon: '/images/button-icon/notice.png', text: '我的消息'}],
    title: "品牌推荐",
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
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this
    wx.cloud.callFunction({
      name: "getDailyCommend",
      success(res){
        console.log(res.result.data)
        that.setData({
          dataBase: res.result.data,
        })
        that.getHeart()
      }
    })
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

  iconClickded(e){
    var name = e.target.dataset.name
    console.log(name)
    if (name == "装修百科"){
      wx.navigateTo({
        url: '/pages/teachPage/teachPage',
        complete: (res) => {},
        events: {},
        fail: (res) => {},
        success: (result) => {},
      })
    }
    else if (name == "价格估算"){
      wx.navigateTo({
        url: '/pages/calcPage/calcPage',
        complete: (res) => {},
        events: {},
        fail: (res) => {},
        success: (result) => {},
      })
    }
    else if (name == "我的消息"){
      wx.navigateTo({
        url: '',
        complete: (res) => {},
        events: {},
        fail: (res) => {},
        success: (result) => {},
      })
    }
    else if (name == "大牌推荐"){
      wx.navigateTo({
        url: '/pages/brandPage/brandPage',
        complete: (res) => {},
        events: {},
        fail: (res) => {},
        success: (result) => {},
      })
    }
  },

  picClicked:function(e){
    var currentUrl = e.currentTarget.dataset.name
    console.log("picClicked: " + currentUrl)
    wx.previewImage({
      current: currentUrl, // 当前显示图片的http链接
      urls: [currentUrl] // 需要预览的图片http链接列表
    })
  },

  favourtieClicked:function(e){
    var that = this
    var x = e.currentTarget.dataset.x
    var y = e.currentTarget.dataset.y
    const picName = [this.data.dataBase[x].brand, this.data.dataBase[x].tileName[y]]
    const picPath = this.data.dataBase[x].tilePath[y]
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
        var list = []
        for (var i=0; i<that.data.dataBase.length; i++){
          var temp = []
          for (var j=0; j<that.data.dataBase[i].tilePath.length; j++){
            var find = 0
            for (var k=0; k<res.result.data.tileData.length; k++){
              if (that.data.dataBase[i].tilePath[j] == res.result.data.tileData[k].picPath){
                find = 1
              }
            }
            temp.push(find)
          }
          list.push(temp)
        }
        that.setData({
          favourite: list
        })
      }
    })
  }
})
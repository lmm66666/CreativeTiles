// pages/teachPage/teachPage.js
const DB = wx.cloud.database().collection("handbook")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    topicList: []
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
    DB.get({
      success(res){
        that.setData({
          topicList: res.data
        })
        that.mysort()
        that.setData({
          topicList:that.data.topicList
        })
        // 分割text字符串
        for (var i = 0; i < that.data.topicList.length; i++){
          var temp = that.data.topicList[i].text.split("&")
          var index = "topicList[" + i + "].text"
          that.setData({
            [index]: temp
          })
        }
        console.log(res.data)
      },
      fail(res){
        wx.showToast({
          title: '网络错误',
          icon: "loading",
          duration: 1500
        })
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

  mysort: function () {
    var property = "degree";
    var self = this;
    var arr = self.data.topicList;
    var sortRule = true; // 正序倒序
    self.setData({
      arr: arr.sort(self.compare(property, sortRule))
    })
  },

  compare: function (property, bol) {
    return function (a, b) {
      var value1 = a[property];
      var value2 = b[property];
      if (bol) {
        return value2 - value1;
      } else {
        return value1 - value2;
      }
    }
  },

  tapped:function(e){
    console.log(this.data.topicList)
    var num = parseInt(e.target.dataset.num)
    var that = this
    var id = that.data.topicList[num]._id
    var degree = that.data.topicList[num].degree
    console.log("num: " + num)
    console.log("id: " + id)
    console.log("degree: " + degree)

    wx.cloud.callFunction({
      name: "addDegree",
      data:{
        id: id,
        degree: degree,
      }
    })

    var index = "topicList[" + num + "].clicked"
    if (this.data.topicList[num].clicked == 0) {
      that.setData({
        [index]: 1
      })
    }
    else{
      that.setData({
        [index]: 0
      })
    }
  }
})
// pages/analysisPage/analysisPage.js
const DB = wx.cloud.database().collection("friendCircle")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Datalist: []
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
          Datalist: res.data
        })
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
    var that = this
    DB.get({
      success(res){
        console.log(res)
        that.setData({
          Datalist: res
        })
      },
      fail(res){
        wx.showToast({
          title: '网络错误，请稍后重试！',
          icon: "loading",
          duration: 1500
        })
      }
    })
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
    console.log("picClicked: " + e.currentTarget.dataset.name)
    var currentUrl = e.currentTarget.dataset.name
    wx.previewImage({
      current: currentUrl, // 当前显示图片的http链接
      urls: [currentUrl]
    })
  },

  favouriteClicked(e){
    var that = this
    var _id = e.currentTarget.dataset.name
    wx.cloud.callFunction({
      name: "addDegree",
      data: {
        _id: _id
      },
      success: res => {
        DB.get({
          success(res){
            that.setData({
              Datalist: res.data
            })
          },
          fail(res){
            wx.showToast({
              title: '网络错误',
              icon: "loading",
              duration: 1500
            })
          }
        })
      }
    })
  }
})
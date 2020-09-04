// pages/first/detailPage/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail:[
      {
        text: "品牌",
        ans: '马可波罗'
      },
      {
        text: "系列",
        ans: '罗马新时代'
      },
      {
        text: "尺寸",
        ans: '1080*800'
      },
      {
        text: "颜色",
        ans: '灰色'
      },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '瓷砖详情' 
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
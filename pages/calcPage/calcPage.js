// pages/calcPage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: 0,
    blockNum: '',
    totalMoney: '',
    area: 0,
    unitPrice: 0,
    x: 0,
    y: 0
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

  clicked:function(){
    var x = this.data.x / 1000
    var y = this.data.y / 1000
    var num = (this.data.area / x / y).toFixed(1)
    var total = (this.data.unitPrice * num).toFixed(1)
    this.setData({
      show: 1,
      totalMoney: total,
      blockNum: num
    })
  },

  areaInput(e){
    this.setData({
      area: e.detail.value
    })
  },

  unitPriceInput(e){
    this.setData({
      unitPrice: e.detail.value
    })
  },

  xInput(e){
    this.setData({
      x: e.detail.value
    })
  },

  yInput(e){
    this.setData({
      y: e.detail.value
    })
  }
})

// pages/calcPage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail: [
      {text1: "房间面积", text2: "平方米", text3: "100"}, 
      {text1: "瓷砖单价", text2: "元", text3: "100"}, 
      {text1: "瓷砖高度", text2: "毫米", text3: "900"}, 
      {text1: "瓷砖宽度", text2: "毫米", text3: "1800"}
    ],
    btnText: "立即估算",
    answer: [{text1: "预计需要砖块", text2: "块"}, {text1: "预计总价格为", text2: "元"}],
    show: 0,
    area: 100,
    unitPrice: 100,
    height: 900,
    width: 1800,
    tileNum: 0,
    totalPrice: 0,
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
    wx.setNavigationBarTitle({
      title: '价格估计' 
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

  btnClicked:function (){
    var num = 1000000.0 * this.data.area / this.data.width / this.data.height
    var price = (num * this.data.unitPrice).toFixed(0)
    num = num.toFixed(0)
    this.setData({
      show: 1,
      tileNum: num,
      totalPrice: price
    })
  },

  getInput:function (e){
    var name = e.currentTarget.dataset.name
    var temp = e.detail.value
    if (name == "房间面积"){
      this.setData({
        area: temp
      })
    }
    else if (name == "瓷砖单价"){
      this.setData({
        unitPrice: temp
      })
    }
    else if (name == "瓷砖高度"){
      this.setData({
        height: temp
      })
    }
    else if (name == "瓷砖宽度"){
      this.setData({
        width: temp
      })
    }
    
  }
})

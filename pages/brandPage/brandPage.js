// pages/brandPage/brandPage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    viewData: [{ picPath1: "/images/brand-icon/makeboluo.jpg", text1: "行业新高度", id1: "makeboluo",
                picPath2: "/images/brand-icon/mengnalisha.jpeg", text2: "每个家都值得拥有", id2: "mengnalisha"},
              { picPath1: "/images/brand-icon/dongpeng.jpeg", text1: "美好生活 用心设计", id1: "dongpeng",
                picPath2: "/images/brand-icon/guanzhu.jpg", text2: "民族品牌 中华风采", id2: "guanzhu" },
              { picPath1: "/images/brand-icon/nuobeier.jpeg", text1: "更新技术 更好瓷砖", id1: "nuobeier", 
                picPath2: "/images/brand-icon/xinzhongyuan.jpg", text2: "有设计感的一线品牌", id2: "xinzhongyuan"}
              ]
              
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
      title: '大牌推荐' 
    })
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

  toDetails: function (e) {
    var brand = e.currentTarget.id
    var app = ""
    if (brand == "makeboluo"){
      app = 'wx725c39fe8eb5e9bd'
      this.toMiniProgram(app)
    }
    else if (brand == "mengnalisha"){
      app = 'wxdfa0c705aefeb61c'
      this.toMiniProgram(app)
    }
    else if (brand == "dongpeng"){
      app = "wx70128fc6bcffbefc"
      this.toMiniProgram(app)
    }
    else if (brand == "guanzhu"){
      app = "wx5b6dd5f6d7fd5ef3"
      this.toMiniProgram(app)
    }
    else if (brand == "nuobeier"){
      app = "wx9afb41c0b9873121"
      var that = this
      wx.showModal({
        title: '提示',
        confirmText: '确定',
        showCancel: false,
        content: '该小程序由地方经销商提供，仅供参考！',
        success: function (res) {
          if (res.confirm) {
            that.toMiniProgram(app)
          }
        }       
      })
    }
    else if (brand == "xinzhongyuan"){
      app = "wxb1e54265cc309c76"
      this.toMiniProgram(app)
    }
  },

  toMiniProgram:function(app){
    wx.navigateToMiniProgram({
      appId: app,
      path: '',
      extraData: {

      },
      success(res) {
        // 打开成功
      }
    })
  }
})
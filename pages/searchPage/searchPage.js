// pages/teachPage/teachPage.js
const DB = wx.cloud.database().collection("handbook")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    formInfo: [
      {type: '品牌', index: 0, detail: ["全部", "马可波罗", "蒙娜丽莎"]},
      {type: '颜色', index: 0, detail: ['全部', '灰色', '棕色', '杏色', '黑色', '白色', '褐色', '黄色']},
      {type: '类别', index: 0, detail: ['全部 (若要更改请先选择品牌)']},
      {type: '宽度', index: 0, detail: ['全部', '4800', '3600', '2400', '1800', '1200', '900', '800', '600', '300']},
      {type: '高度', index: 0, detail: ['全部', '3600', '2400', '1600', '1200', '900', '800', '600', '400', '300', '200']}
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

  bindDetailChange: function (e) {
    var num = e.currentTarget.dataset.num
    if (num != 0){
      var index = 'formInfo['+num+'].index'
      this.setData({
        [index]: e.detail.value
      })
    }
    else{
      if (e.detail.value == 1){
        var index = 'formInfo['+num+'].index'
        this.setData({
          [index]: e.detail.value,
          'formInfo[2].detail': ['全部', '1295', '地理石', '瓷片', '中国印象文化陶瓷', 'E石代', '全抛釉', 'E-stone+', '真石'],
          'formInfo[2].index': 0
        })
      }
      else if (e.detail.value == 2){
        var index = 'formInfo['+num+'].index'
        this.setData({
          [index]: e.detail.value,
          'formInfo[2].detail': ['全部', '罗马高档仿石砖系列', '新型陶瓷砖板系列', '七星珍石', '时尚新贵抛光砖系列', '新贵抛光砖系列', '现代仿古砖系列', '瓷木地板砖系列', '下乡-定制产品'],
          'formInfo[2].index': 0
        })
      }
      else if (e.detail.value == 0){
        var index = 'formInfo['+num+'].index'
        this.setData({
          [index]: e.detail.value,
          'formInfo[2].detail': ['全部 (若要更改请先选择品牌)'],
          'formInfo[2].index': 0
        })
      }
    }
  },

  searchClicked:function(){
    var temp = ''
    var brand = this.data.formInfo[0].detail[this.data.formInfo[0].index]
    var color = this.data.formInfo[1].detail[this.data.formInfo[1].index]
    var type = this.data.formInfo[2].detail[this.data.formInfo[2].index]
    var width = this.data.formInfo[3].detail[this.data.formInfo[3].index]
    var height = this.data.formInfo[4].detail[this.data.formInfo[4].index]
    if (brand != '全部'){
      temp = temp + brand + '/'
    }
    if (color != '全部'){
      temp = temp + color + '/'
    }
    if (type != '全部'){
      if (type != '全部 (若要更改请先选择品牌)'){
        temp = temp + type + '/'
      }
      else{
        type = '全部'
      }
    }
    if (width != '全部'){
      temp = temp + '宽' + width + '/'
    }
    if (height != '全部'){
      temp = temp + '高' + height + '/'
    }
    if (temp != ''){
      temp = temp.substr(0, temp.length-1)
    }

    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2]; //上一页
    prevPage.setData({
      searchDetail: temp,
      brand: brand,
      color: color,
      type: type,
      width: width,
      height, height
    });
    wx.navigateBack({})
  }
})
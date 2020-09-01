// pages/sucaiPage/sucai.js
Page({
  data: {
    windowWidth: 0,
    windowHeight: 0,
    choosed_pic_flag: 0,
    maskWidth: 0,
    maskHeight: 0,
    maskMarginTop: 0,
    maskMarginLeft: 0,
    maskLastX: 0,
    maskLastY: 0
  },

  onLoad: function (options) {
    var that = this
    wx.getSystemInfo({
      success: (res) => {
        that.setData({
          windowHeight: res.windowHeight*0.6,
          windowWidth: res.windowWidth,
          maskHeight: res.windowHeight*0.6,
          maskWidth: res.windowWidth
        })
      },
    })
  },

  onReady: function () {

  },

  onShow: function () {

  },

  onHide: function () {

  },

  onUnload: function () {

  },

  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  onShareAppMessage: function () {

  },

  maskStart: function(e){
    this.setData({
      maskLastX: e.touches[0].pageX,
      maskLastY: e.touches[0].pageY
    })
  },

  maskEnd: function(){
    this.setData({
      maskLastX: 0,
      maskLastY: 0
    })
  },

  maskChange: function(e){
    // 获取手指滑动方向
    let x = e.touches[0].pageX
    let y = e.touches[0].pageY
    let x_change = x - this.data.maskLastX
    let y_change = y - this.data.maskLastY
    // 初始化数据
    let min_width = 50
    let margin_top = this.data.maskMarginTop
    let margin_left = this.data.maskMarginLeft
    let width = this.data.maskWidth
    let height = this.data.maskHeight
    // 判断离手指最近的边
    let left = Math.abs(margin_left - x)
    let right = Math.abs(margin_left + width - x)
    let top = Math.abs(margin_top - y)
    let bottom = Math.abs(margin_top + height - y)
    let min_value = Math.min(left, right, top, bottom)
    // 分类讨论
    if (min_value == left){
      // 左边 x width
      margin_left += x_change
      width -= x_change
      // 左滑 出画面
      if (margin_left < 0){
        margin_left = 0
        // 取消宽度变化
        width += x_change
      }
      // 右滑 重叠
      if (width < min_width){
        // 右边线保持不动
        margin_left = margin_left - min_width + width
        // 最小宽度50
        width = min_width
      }
    }
    else if (min_value == right){
      // 右边 x width
      width += x_change
      // 左滑 重叠
      if (width < 50){
        width = 50
      }
      // 右滑 出界
      if (margin_left + width > this.data.windowWidth){
        width = this.data.windowWidth - margin_left
      }
    }
    else if (min_value == top){
      // 上边 y height
      margin_top += y_change
      height -= y_change
      // 上滑 出画面
      if (margin_top < 0){
        margin_top = 0
        // 取消高度变化
        height += y_change
      }
      // 下滑 重叠
      if (height < min_width){
        // 下边线保持不动
        margin_top = margin_top - min_width + height
        // 最小宽度50
        height = min_width
      }
    }
    else{
      // 下边 y height
      height += y_change
      // 上滑 重叠
      if (height < 50){
        height = 50
      }
      // 下滑 出界
      if (margin_top +height > this.data.windowHeight){
        height = this.data.windowHeight - margin_top
      }
    }
    // 修改数据
    this.setData({
      maskMarginTop: margin_top,
      maskMarginLeft: margin_left,
      maskWidth: width,
      maskHeight: height,
      maskLastX: x,
      maskLastY: y
    })
  }
})
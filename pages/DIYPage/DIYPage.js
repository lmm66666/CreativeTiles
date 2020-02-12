Page({

  /**
   * 页面的初始数据
   */
  data: {
    button1Text: "上传图片",
    button2Text: "我的砖库",
    picPath: "/images/biscuit.png",
    width: 85,
    rotate: [{num: 0,}, {num: 0,}, {num: 0,}, {num: 0,}, {num: 0,}, {num: 0,}, {num: 0,}, {num: 0,}, 
             {num: 0,}, {num: 0,}, {num: 0,}, {num: 0,}, {num: 0,}, {num: 0,}, {num: 0,}, {num: 0,}]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initialCanvas()
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


  btnClicked: function(options){
    var that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths[0]
        var picPath = that.data.picPath;
        that.setData({
          picPath:tempFilePaths
        })
        that.initialCanvas()
      }
    })
  },

  initialCanvas: function(){
    var ctx = wx.createCanvasContext()
    var text = "picCanvas"
    var canvasID = ""
    for (var i = 1; i < 17; i++) {
      text = "picCanvas"
      canvasID = text + String(i)
      ctx = wx.createCanvasContext(canvasID, this)
      ctx.drawImage(this.data.picPath, 0, 0, this.data.width, this.data.width)
      ctx.draw()
    }
  },

  picClicked: function(e){
    var n = Number(e.currentTarget.dataset.name)
    var canvasID = 'picCanvas' + String(n)
    var num = this.getNum(n)
    console.log('图片序号：' + n + ' 点击次数：' + (num+1) + ' 图片路径' + this.data.picPath)
    var ctx = wx.createCanvasContext(canvasID, this)
    if (num % 4 == 0){
      ctx.translate(this.data.width, 0)
    }
    else if (num % 4 == 1) {
      ctx.translate(this.data.width, this.data.width)
    }
    else if (num % 4 == 2) {
      ctx.translate(0, this.data.width)
    }
    else if (num % 4 == 3) {
      ctx.translate(0, 0)
    }
    ctx.rotate((num+1) * Math.PI / 2)
    ctx.drawImage(this.data.picPath, 0, 0, this.data.width, this.data.width)
    ctx.draw()
  },

  getNum: function(n){
    let num = 0
    if (n == 1){
      num = this.data.rotate[0].num
      this.setData({ 'rotate[0].num': num + 1 })
    }
    else if (n == 2) {
      num = this.data.rotate[1].num
      this.setData({ 'rotate[1].num': num + 1 })
    }
    else if (n == 3) {
      num = this.data.rotate[2].num
      this.setData({ 'rotate[2].num': num + 1 })
    }
    else if (n == 4) {
      num = this.data.rotate[3].num
      this.setData({ 'rotate[3].num': num + 1 })
    }
    else if (n == 5) {
      num = this.data.rotate[4].num
      this.setData({ 'rotate[4].num': num + 1 })
    }
    else if (n == 6) {
      num = this.data.rotate[5].num
      this.setData({ 'rotate[5].num': num + 1 })
    } 
    else if (n == 7) {
      num = this.data.rotate[6].num
      this.setData({ 'rotate[6].num': num + 1 })
    }
    else if (n == 8) {
      num = this.data.rotate[7].num
      this.setData({ 'rotate[7].num': num + 1 })
    }
    else if (n == 9) {
      num = this.data.rotate[8].num
      this.setData({ 'rotate[8].num': num + 1 })
    }
    else if (n == 10) {
      num = this.data.rotate[9].num
      this.setData({ 'rotate[9].num': num + 1 })
    }
    else if (n == 11) {
      num = this.data.rotate[10].num
      this.setData({ 'rotate[10].num': num + 1 })
    }
    else if (n == 12) {
      num = this.data.rotate[11].num
      this.setData({ 'rotate[11].num': num + 1 })
    }
    else if (n == 13) {
      num = this.data.rotate[12].num
      this.setData({ 'rotate[12].num': num + 1 })
    }
    else if (n == 14) {
      num = this.data.rotate[13].num
      this.setData({ 'rotate[13].num': num + 1 })
    }
    else if (n == 15) {
      num = this.data.rotate[14].num
      this.setData({ 'rotate[14].num': num + 1 })
    }
    else if (n == 16) {
      num = this.data.rotate[15].num
      this.setData({ 'rotate[15].num': num + 1 })
    }
    return num
  }

})

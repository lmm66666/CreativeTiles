Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: '',
    picPath: '',
    method: '',
    methodText: '',
    width: 100,
    rotate: [
      {num: 1,}, {num: 2,}, {num: 1,}, {num: 2,}, {num: 0,}, {num: 3,}, {num: 0,}, {num: 3,}, 
      {num: 1,}, {num: 2,}, {num: 1,}, {num: 2,}, {num: 0,}, {num: 3,}, {num: 0,}, {num: 3,}
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.type = options.type
    this.data.method = options.method
    this.data.picPath= JSON.parse(options.picPath)
    var systemInfo = wx.getSystemInfoSync();
    var px = 100 / 750 * systemInfo.windowWidth; 
    this.data.width = px;
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
    this.initialData()
    this.initialCanvas()
    console.log(this.data.width)
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

  initialCanvas: function(){
    for (var i = 0; i < 16; i++) {
      this.drawCanvas(i)
    }
  },

  drawCanvas:function (i){
    var canvasID = 'picCanvas' + String(i+1)
    var ctx = wx.createCanvasContext(canvasID, this)
    var num = this.data.rotate[i].num
    if (num % 4 == 1){
      ctx.translate(this.data.width, 0)
    }
    else if (num % 4 == 2) {
      ctx.translate(this.data.width, this.data.width)
    }
    else if (num % 4 == 3) {
      ctx.translate(0, this.data.width)
    }
    else if (num % 4 == 0) {
      ctx.translate(0, 0)
    }
    ctx.rotate((num) * Math.PI / 2)
    ctx.drawImage(this.data.picPath, 0, 0, this.data.width, this.data.width)
    ctx.draw()
  },

  picClicked: function(e){
    var n = Number(e.currentTarget.dataset.name)
    if (n == 1|| n ==3|| n==9|| n==11){
      this.setData({
        'rotate[0].num': this.data.rotate[0].num + 1,
        'rotate[2].num': this.data.rotate[2].num + 1,
        'rotate[8].num': this.data.rotate[8].num + 1,
        'rotate[10].num': this.data.rotate[10].num + 1,
      })
      var list = [0, 2, 8, 10]
      for (var i = 0; i < 4; i++){
        this.drawCanvas(list[i])
      }
    }
    else if (n == 2|| n ==4|| n==10|| n==12){
      this.setData({
        'rotate[1].num': this.data.rotate[1].num + 1,
        'rotate[3].num': this.data.rotate[3].num + 1,
        'rotate[9].num': this.data.rotate[9].num + 1,
        'rotate[11].num': this.data.rotate[11].num + 1,
      })
      var list = [1, 3, 9, 11]
      for (var i = 0; i < 4; i++){
        this.drawCanvas(list[i])
      }
    }
    else if (n == 5 || n ==7|| n==13|| n==15){
      this.setData({
        'rotate[4].num': this.data.rotate[4].num + 1,
        'rotate[6].num': this.data.rotate[6].num + 1,
        'rotate[12].num': this.data.rotate[12].num + 1,
        'rotate[14].num': this.data.rotate[14].num + 1,
      })
      var list = [4, 6, 12, 14]
      for (var i = 0; i < 4; i++){
        this.drawCanvas(list[i])
      }
    }
    else if (n == 6 || n ==8 || n==14 || n==16){
      this.setData({
        'rotate[5].num': this.data.rotate[5].num + 1,
        'rotate[7].num': this.data.rotate[7].num + 1,
        'rotate[13].num': this.data.rotate[13].num + 1,
        'rotate[15].num': this.data.rotate[15].num + 1,
      })
      var list = [5, 7, 13, 15]
      for (var i = 0; i < 4; i++){
        this.drawCanvas(list[i])
      }
    } 
    
  },

  initialData:function () {
    if (this.data.type == 'img'){
      var type = 1
    }
    else if (this.data.type == 'canvas'){
      var type = 0
    }

    if (this.data.method == 'fangxing'){
      var methodText = '方形'
    }
    else if (this.data.method == 'lingxing'){
      var methodText = '菱形'
    }
    else if (this.data.method == 'zhuanxing'){
      var methodText = '砖形'
    }
    else if (this.data.method == 'bianlanxing'){
      var methodText = '编篮形'
    }
    else if (this.data.method == 'fengchexing'){
      var methodText = '风车形'
    }

    this.setData({
      type: type,
      methodText: methodText,
      picPath: this.data.picPath
    })
  },

  againClicked:function (){
    wx.redirectTo({
      url: '/pages/DIY_UploadPage/DIY_UploadPage',
    })
  },

  saveToAlbum:function (){
    if (this.data.method == 'fangxing'){
      wx.showToast({
        title: '该模板暂不支持',
        icon: 'none'
      })
    }
    else{
      wx.saveImageToPhotosAlbum({
        filePath: this.data.picPath,
        success(res){
          wx.showToast({
            title: '保存成功',
            icon: 'success'
          })
        },
        fail(res){
          wx.showToast({
            title: '保存失败',
            icon: 'none'
          })
        } 
      })
    }
  }

})

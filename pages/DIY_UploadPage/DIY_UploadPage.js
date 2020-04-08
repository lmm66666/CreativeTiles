// pages/DIY_UploadPage/DIY_UploadPage.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    step:0,
    swiperIndex: 0,
    uploadPicPath: ['', ''],
    picSelected: [0, 0],
    finalPicPath: '',
    methodImgList: [
      {name: '方形', picPath:'/images/methodImg/fang.png', url: 'fangxing'},
      {name: '菱形', picPath:'/images/methodImg/ling.jpeg', url: 'lingxing'},
      {name: '砖形', picPath:'/images/methodImg/zhuan.jpeg', url: 'zhuanxing'},
      {name: '编篮形', picPath:'/images/methodImg/bianlan.jpeg', url: 'bianlanxing'},
      {name: '风车形', picPath:'/images/methodImg/fengche.jpeg', url: 'fengchexing'}
    ],
    uploadDetail: [
      {detail: '瓷砖将被拉伸成正方形', picDesc: ['请上传图片A']},
      {detail: '瓷砖将被拉伸成正方形', picDesc: ['请上传图片A']},
      {detail: '自动适配各种长方形瓷砖', picDesc: ['请上传图片A']},
      {detail: '瓷砖将被适当拉伸', picDesc: ['请上传图片A']},
      {detail: '瓷砖将被适当拉伸', picDesc: ['请上传图片A', '请上传图片B']}
    ],
    //以下为原DIY页内容
    type: '',
    methodText: '',
    width: 170,
    rotate: [
      {num: 1,}, {num: 2,}, {num: 1,}, {num: 2,}, {num: 0,}, {num: 3,}, {num: 0,}, {num: 3,}, 
      {num: 1,}, {num: 2,}, {num: 1,}, {num: 2,}, {num: 0,}, {num: 3,}, {num: 0,}, {num: 3,}
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var systemInfo = wx.getSystemInfoSync();
    var px = 170 / 750 * systemInfo.windowWidth; 
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

  swiperChanged:function (e){
    this.setData({
      swiperIndex: e.detail.current
    })
  },

  chooseImage: function (e) {
    var that = this;
    var num = e.currentTarget.dataset.num
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var temp1 = 'uploadPicPath[' + num + ']'
        var temp2 = 'picSelected[' + num + ']'
        that.setData({
          [temp1]: res.tempFilePaths[0],
          [temp2]: 1
        });
      }
    })
  },

  uploadClicked:function () {
    var that = this
    var method = this.data.methodImgList[this.data.swiperIndex].url
    if (that.data.uploadPicPath[0] == ''){
      wx.showToast({
        title: '请选择图片！',
        icon: 'none'
      })
    }
    else{
      wx.showToast({
        title: '渲染中',
        icon: 'loading',
        duration: 2000
      })
      if (method == "lingxing" || method == 'zhuanxing' || method == 'bianlanxing'){
        var url = 'https://www.lmm666.top:4000/wechatProject/tileIndustry/picCut/onePic'
        wx.uploadFile({
          filePath: that.data.uploadPicPath[0],
          name: 'pic',
          url: url,
          formData: {
            openid: app.globalData.userInfo.openid,
            method: method
          },
          success(res){
            if (res.data == 'success'){
              that.initialData()
            }
            else{
              wx.showToast({
                title: '上传失败',
                icon: 'none',
                duration: 1500
              })
            }
          },
          fail(res){
            wx.showToast({
              title: '上传失败',
              icon: 'none',
              duration: 1500
            })
          }
        })
      }
      else if(method == "fangxing"){
        that.initialData()
        that.initialCanvas()  
      } 
      else if(method == "fengchexing"){
        if (that.data.uploadPicPath[1] == ''){
          wx.showToast({
            title: '请选择图片！',
            icon: 'none'
          })
        }
        var url = 'https://www.lmm666.top:4000/wechatProject/tileIndustry/picCut/twoPic'
        wx.uploadFile({
          filePath: that.data.uploadPicPath[0],
          name: 'pic',
          url: url,
          formData:{
            AorB: "A",
            openid: app.globalData.userInfo.openid,
          },
          success(res){
            if (res.data == "success"){
              wx.uploadFile({
                filePath: that.data.uploadPicPath[1],
                name: 'pic',
                url: url,
                formData:{
                  AorB: "B",
                  openid: app.globalData.userInfo.openid,
                },
                success(res){
                  if (res.data == 'success'){
                    that.initialData()
                  }
                  else{
                    wx.showToast({
                      title: '上传失败',
                      icon: 'fail',
                      duration: 1500
                    })
                  }
                },
                fail(res){
                  wx.showToast({
                    title: '上传失败',
                    icon: 'fail',
                    duration: 1500
                  })
                }
              })
            }
            else{
              wx.showToast({
                title: '上传失败',
                icon: 'fail',
                duration: 1500
              })
            }
          },
          fail(res){
            wx.showToast({
              title: '上传失败',
              icon: 'fail',
              duration: 1500
            })
          }
        })
      }
    }
  },

  initialData:function () {
    var type = 1
    var method = this.data.methodImgList[this.data.swiperIndex].url
    var path = 'https://www.lmm666.top:4000/wechatProject/tileIndustry/resPic/' + app.globalData.userInfo.openid

    if (method == 'fangxing'){
      var methodText = '方形'
      type = 0
      path = this.data.uploadPicPath[0]
    }
    else if (method == 'lingxing'){
      var methodText = '菱形'
    }
    else if (method == 'zhuanxing'){
      var methodText = '砖形'
    }
    else if (method == 'bianlanxing'){
      var methodText = '编篮形'
    }
    else if (method == 'fengchexing'){
      var methodText = '风车形'
    }
    this.setData({
      type: type,
      methodText: methodText,
      finalPicPath: path,
      step: 3
    })
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
    ctx.drawImage(this.data.finalPicPath, 0, 0, this.data.width, this.data.width)
    ctx.draw()
  },

  saveToAlbum:function (){
    if (this.data.method == 'fangxing'){
      wx.showToast({
        title: '该模板暂不支持',
        icon: 'none'
      })
    }
    else{
      wx.getSetting({
        success(res) {
          //未授权 先授权 然后保存
          if (!res.authSetting['scope.writePhotosAlbum']) {
            wx.authorize({
              scope: 'scope.writePhotosAlbum',
              success(res) {
                that.saveToBlum();
              }
            })
          }else{
           //已授 直接调用保存到相册方法
            that.saveToBlum();
          }
        }
      }) 
    }
  },

  saveToAlbum: function (){
    var that = this
    wx.downloadFile({
      url: that.data.finalPicPath,
      success: function(res){
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success(res){
            wx.showToast({
              title: '保存成功',
              icon: 'success'
            })
          },
        })
      }
    })
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

  refresh:function (){
    this.setData({
      step: 1,
      swiperIndex: 0,
      uploadPicPath: ['', ''],
      picSelected: [0, 0],
      finalPicPath: '',
      type: '',
      lastPicPath: '',
      methodText: '',
      rotate: [
        {num: 1,}, {num: 2,}, {num: 1,}, {num: 2,}, {num: 0,}, {num: 3,}, {num: 0,}, {num: 3,}, 
        {num: 1,}, {num: 2,}, {num: 1,}, {num: 2,}, {num: 0,}, {num: 3,}, {num: 0,}, {num: 3,}
      ],
    })
  },

  startClicked:function (){
    this.setData({
      step: 1
    })
  },

  nextClicked:function (){
    this.setData({
      step: 2
    })
  },

  againClicked:function (){
    this.refresh()
  },

})
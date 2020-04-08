// pages/storagePage/storagePage.js
const DB = wx.cloud.database().collection("storage")
import {
  cloudFormatTime
} from '../../utils/util.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tileData: [],
    sampleData: [],
    showMask: 0,
    swiperTileNum: 0,
    viewTileNum: [0],
    swiperSampleNum: 0,
    viewSampleNum: [0],
    addImagePath: '',
    addImageName: '',
    addClicked: 1,
    left: 1,
    right: 0
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
      title: '我的砖库' 
    })
   this.refresh()
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

  showMaskClicked: function (){
    this.setData({
      showMask: 1,
      addClicked: 1,
      addImagePath: '',
      picName: ''
    })
    this.animate('.mask',
    [{translateY: '400px'},{translateY: '0px'}], 200)
  },

  hideMaskClicked: function (){
    this.setData({
      showMask: 0
    })
  },

  addImageClicked: function (){
    var that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        const temp = res.tempFilePaths[0]
        that.setData({
          addImagePath: temp,
          addClicked: 0,
        })
      },
    })
  },

  uploadClicked:function (){
    var picName = this.data.addImageName
    var picPath = this.data.addImagePath
    console.log("addPicName: " + picName)
    console.log("addPicPath: " + picPath)
    // 判断是否已经选择图片
    if (picPath == ''){
      wx.showModal({
        title: '提示',
        confirmText: '确定',
        showCancel: false,
        content: '请选择图片'
      })
    }
    else if(picName == ''){
      wx.showModal({
        title: '提示',
        confirmText: '确定',
        showCancel: false,
        content: '请输入名称'
      })
    }
    else{
      var that = this
      var path = "storage/" + cloudFormatTime(new Date()) + '.jpeg'
      // 判断类型
      if (that.data.left == 0){
        var type = 'sample'
      }
      else{
        var type = 'tile'
      }
      wx.showToast({
        title: '上传中',
        icon: "loading",
        duration: 1500
      })
      // 通过云函数修改数据库
      wx.cloud.uploadFile({
        cloudPath: path,
        filePath: picPath,
        success: res => {
          wx.cloud.callFunction({
            name: "storageAdd",
            data:{
              type: type,
              picPath: res.fileID,
              picName: [picName] 
            },
            // 上传成功返回刷新
            success:res => {
              this.setData({
                showMask: 0
              })
              that.refresh()
              wx.showToast({
                title: '上传成功',
                icon: "success",
                duration: 1500
              })
            },
            //上传失败保持原界面
            fail:res => {
              wx.showToast({
                title: '上传失败！(2)',
                icon: "loading",
                duration: 1500
              })
            }
          })
        },
        fail: res => {
          wx.showToast({
            title: '上传失败！(1)',
            icon: "loading",
            duration: 1500
          })
        }
      })
    }
  },

  refresh:function() {
    var that = this
    wx.cloud.callFunction({
      name: "getStorage",
      success(res){
        console.log(res.result.data)
        if (res.result.data.length != 0){
          // tileData 赋值
          if(res.result.data.tileData.length > 0){
            var data = res.result.data.tileData
            var len = data.length
            var swiperNum = len/8
            var temp = []
            for(var i = len; i >= 0; i-=8){
              if(i >= 8){
                temp.push(8)
              }
              else{
                temp.push(i)
              }
            }
            that.setData({
              tileData: data,
              swiperTileNum: swiperNum,
              viewTileNum: temp
            })
          }
          else{
            that.setData({
              tileData: [],
              swiperTileNum: 1,
              viewTileNum: [0]
            })
          }
          // sampleData赋值
          if(res.result.data.sampleData.length > 0){
            var data = res.result.data.sampleData
            var len = data.length
            var swiperNum = len/8
            var temp = []
            for(var i = len; i >= 0; i-=8){
              if(i >= 8){
                temp.push(8)
              }
              else{
                temp.push(i)
              }
            }
            that.setData({
              sampleData: data,
              swiperSampleNum: swiperNum,
              viewSampleNum: temp
            })
          }
          else{
            that.setData({
              sampleData: [],
              swiperSampleNum: 1,
              viewSampleNum: [0]
            })
          }
        }
        else{
          that.setData({
            tileData: [],
            swiperTileNum: 1,
            viewTileNum: [0],
            sampleData: [],
            swiperSampleNum: 1,
            viewSampleNum: [0],
          })
        }
      }
    })
  },

  addImageNameInput:function(e){
    this.setData({
      addImageName: e.detail.value
    })
  },

  picClicked:function(e){
    var x = e.currentTarget.dataset.x
    var y = e.currentTarget.dataset.y
    if (this.data.left == 1){
      var currentUrl = this.data.tileData[6*x+y].picPath
    }
    else{
      var currentUrl = this.data.sampleData[6*x+y].picPath
    }
    wx.previewImage({
      current: currentUrl, // 当前显示图片的http链接
      urls: [currentUrl] // 需要预览的图片http链接列表
    })
  },
   
  picLongPress:function(e){
    var that = this
    var x = e.currentTarget.dataset.x
    var y = e.currentTarget.dataset.y
    if (that.data.left == 1){
      var type = 'tile'
      var picInfo = that.data.tileData[6*x+y]
    }
    else if (that.data.right == 1){
      var type = 'sample'
      var picInfo = that.data.sampleData[6*x+y]
    }
    wx.showModal({
      title: "提示",
      confirmText: '确定',
      showCancel: true,
      content: '确认删除此图片？',
      success: function (res) {
        if (res.confirm) {
          wx.cloud.callFunction({
            name: "storageDel",
            data:{
              type: type,
              picInfo: picInfo
            },
            success(res){
              that.refresh()
            }
          })
        }
      } 
    })
  },

  titleClicked:function (e){
    var position = e.currentTarget.dataset.name
    var systemInfo = wx.getSystemInfoSync();
    var px = 137 / 750 * systemInfo.windowWidth; 
    if (position == "left"){
      if (this.data.left == 0){
        this.animate('.titleMask', [{translateX: px},{translateX: '0px'}], 200)
        this.setData({
          left: 1,
          right: 0
        })
      }
    }
    if (position == "right"){
      if (this.data.right == 0){
        this.animate('.titleMask', [{translateX: '0px'},{translateX: px}], 200)
        this.setData({
          left: 0,
          right: 1
        })
      }
    }
  }
})
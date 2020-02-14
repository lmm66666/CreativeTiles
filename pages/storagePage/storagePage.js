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
    storage: [],
    showMask: 0,
    swiperNum: 1,
    viewNum: [0],
    addImagePath: '',
    addImageName: '',
    addClicked: 1,
    maskTopLeft: "返回",
    maskTopRight: "上传",
    maskTitle: "添加样砖",
    emptyText1: "暂无数据！",
    emptyText2: "点击右上方+添加"
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
              picPath: res.fileID,
              picName: picName 
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
        if(res.result.data.length > 0){
          that.setData({
            storage: res.result.data[0]
          })
          console.log(that.data.storage)
          var len = that.data.storage.picName.length
          that.setData({
            swiperNum: len/8
          })
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
            viewNum: temp
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
    var that = this
    console.log("picClicked: " + e.currentTarget.dataset.src)
    var currentUrl = e.currentTarget.dataset.src
    wx.previewImage({
      current: currentUrl, // 当前显示图片的http链接
      urls: that.data.storage.picPath // 需要预览的图片http链接列表
    })
  }
})
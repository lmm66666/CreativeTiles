// pages/addPage/addPage.js
const DB = wx.cloud.database().collection("friendCircle")
import {
  formatTime,
  cloudFormatTime
} from '../../utils/util.js'


Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: "编写评测",
    picPath: [],
    userInfo: [],
    tempText: "?",
    theProtraitPath: "?",
    temp: "?"
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

  confirmToRelease(e) {
    this.setData({
      userInfo: e.detail.userInfo
    })
    wx.showToast({
      title: '发布中',
      icon: "loading",
      duration: 5000
    })
    // 先把用户头像下载到本地
    var that = this;
    wx.getImageInfo({
      src: that.data.userInfo.avatarUrl,
      success:function(res){
        console.log("tempFilePath: " + res.path)
          that.setData({
            temp: res.path
          })
          that.uploadProtrait()
      },
      fail:function(res){
        wx.showToast({
          title: '发布失败！(1)',
          icon: "loading",
          duration: 1500
        })
      }
    })
  },

  uploadProtrait: function(){
    var that = this
    console.log("uploadProtrait!!!")
    console.log("temp: " + that.data.temp) 
    // 再上传用户头像
    var path = "protrait/" + cloudFormatTime(new Date()) + '.jpeg'
    console.log("path: " + path)
    wx.cloud.uploadFile({
      cloudPath: path,
      filePath: that.data.temp,
      success: res => {
        that.setData({
          theProtraitPath:res.fileID
        })
        that.uploadPic()
      },
      fail: res => {
        wx.showToast({
          title: '发布失败！(2)',
          icon: "loading",
          duration: 1500
        })
      }
    })
  },

  uploadPic: function () {
    //再上传评测图片，获取fileID
    var that = this
    var theUrl = that.data.picPath
    var theFileID = []
    var successNum = 0
    console.log("uploadPic!!!")
    console.log("protrait: " + this.data.theProtraitPath)
    console.log("theUrl.length: " + theUrl.length)
    if (!theUrl.length){
      that.uploadOthers(theFileID)
    }
    else{
      for (var i = 0; i < theUrl.length; i++) {
        console.log("theUrl[" + i + "]:" + theUrl[i])
        wx.cloud.uploadFile({
          cloudPath: "pic/" + cloudFormatTime(new Date()) + i + ".png",
          filePath: theUrl[i],
          success: res => {
            that.setData({
              temp: res.fileID
            })
            theFileID.push(that.data.temp)
            successNum += 1
            console.log("temp: " + that.data.temp)
            if (successNum == theUrl.length){
              that.uploadOthers(theFileID)
            }
          },
          fail: res => {
            wx.showToast({
              title: '发布失败！(3)',
              icon: "loading",
              duration: 1500
            })
          }
        })
      }
    }
  },

  uploadOthers: function (theFileID) {
    console.log("uploadOthers!!!")
    console.log("theFileID: " + theFileID)
    //最后上传剩余数据
    var that = this
    DB.add({
      data: {
        name: that.data.userInfo.nickName,
        text: that.data.tempText,
        time: formatTime(new Date()),
        picPath: theFileID,
        protraitPath: that.data.theProtraitPath,
        num: 0
      },
      success(res) {
        wx.showToast({
          title: '发布成功！',
          icon: 'success',
          duration: 2000
        })
        setTimeout(function () {
          wx.navigateBack()
        }, 1000)
      },
      fail(res) {
        wx.showToast({
          title: '发布失败！(4)',
          icon: "loading",
          duration: 1500
        })
      }
    })
  },


  getText: function (e) {
    this.setData({
      tempText: e.detail.value
    })
  },

  chooseImage() {
    var that = this
    wx.chooseImage({
      count: 6,
      sizeType: ['original', 'compressed'],
      sourceType: ['album'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        that.setData({
          picPath: res.tempFilePaths
        })
      }
    })
  }
})
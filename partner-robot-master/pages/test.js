// pages/sr/sr.js

const {
  getStorageImage,
  StorageGet
} = require('./onlineim.js')
const sleep = require("../utils/util").sleep

Page({
  /**
   * 页面的初始数据
   */
  data: {
    srStart: false,
    srResult: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
   
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

  test: function () {
    wx.cloud.init({
      env: "chat-3gcx95wg01401d33"
    });
    // const db = wx.cloud.database()
    wx.cloud.callFunction({
      name: 'test',
      data:{
        data:0
      }
    })

},
/**
 * 生命周期函数--监听页面卸载
 */
onUnload: function () {
  console.log("sr onUnload")
  this.data.srStart = false
  wx.getRecorderManager().stop()
  if (this.data.sr) {
    this.data.sr.shutdown()
  } else {
    console.log("sr is null")
  }
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

})
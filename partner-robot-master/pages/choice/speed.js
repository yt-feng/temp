// pages/choice/speed.js
const app = getApp()
const {
  getStorageImage
} = require('../onlineim.js')
Page({

  data: {
    url: [getStorageImage("https://mp-e5245a2d-e568-43d9-8bc9-6ace734752d4.cdn.bspapp.com/cloudstorage/fb3d4416-32d4-4d0e-8074-1233e9c9b275.png"), 
    getStorageImage("https://mp-e5245a2d-e568-43d9-8bc9-6ace734752d4.cdn.bspapp.com/cloudstorage/df9d472b-c36d-49c1-bf6e-8c3aaef1262e.jpeg"), 
    "https://mp-e5245a2d-e568-43d9-8bc9-6ace734752d4.cdn.bspapp.com/cloudstorage/f3b38138-99cb-4efe-95e4-93234af42ccb.svg", 
    "https://mp-e5245a2d-e568-43d9-8bc9-6ace734752d4.cdn.bspapp.com/cloudstorage/e427b51d-8379-4973-a5da-f96c6de488ce.svg",
    "https://mp-e5245a2d-e568-43d9-8bc9-6ace734752d4.cdn.bspapp.com/cloudstorage/5e2033c3-2328-4ad0-a2ba-b72a0cc94d96.svg"],
    choice:0
  },

  onLoad(options) {
    this.setData({
      choice: app.globalData.speed
    })
  },

  change: function (e) {
    console.log("选择语速" + e.detail.value);
    this.setData({
      choice: e.detail.value
    })
    app.globalData.speed = parseInt(e.detail.value)
  },
  sure: function () {
    console.log("确定");
    wx.navigateBack({
      delta: 1
    });
    console.log("确定")
  },
 
  onHide() {

  },


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage(res) {

    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '我用1个按钮玩了11个国家，\n快来一起对话新世界！',
      path: '/pages/index/index',
      imageUrl: "../../images/sharebg.png"
    }
  },
  butt: function (msg) {
    wx.showToast({
      title: msg,
      icon: 'none',
      duration: 1500,
      success: function () {}
    })
  }
})
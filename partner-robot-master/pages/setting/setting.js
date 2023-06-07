// pages/setting/setting.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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
  speed: function () {
    wx.navigateTo({
      url: '/pages/choice/speed',
      animationType: "fade-in"
    })
  },
  me: function () {
    wx.navigateTo({
      url: '/pages/decorate/decorate',
      animationType: "fade-in"
    })
  },
  teacher: function () {
    wx.navigateTo({
      url: '/pages/teacher/teacher',
      animationType: "fade-in"
    })
  }
})
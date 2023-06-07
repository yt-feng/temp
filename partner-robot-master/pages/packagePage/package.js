// pages/packagePage/package.js
// util.js是用来给日期格式化的
const util = require('util.js');
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    vip: 0,
    change:false
  },
  me: function () {
    wx.navigateTo({
      url: '/pages/decorate/decorate',
      animationType: "fade-in"
    })
  },
  change:function(){

this.setData({change:true})
  },
  changed:function(e){
    let that=this
    app.globalData.name = e.detail.value.nickname
    this.setData({change:false,
    name:e.detail.value.nickname})
    let openid = wx.getStorageSync("openid");
    wx.cloud.init({
      env: "chat-3gcx95wg01401d33"
    });
    console.log(openid)
    console.log(that.data.name)
    wx.cloud.callFunction({
      name: 'updatedata',
      data: {
        filter:{openid:openid},
        new:{nickname:that.data.name}
      },
      success(res) {
        console.log(res)
        console.log("成功更新昵称")
      },
      fail(err) {
        console.log("更新失败")
      }
    })
  },
  pay: function () {
    wx.navigateTo({
      url: '/pages/mine/mine',
      animationType: "fade-in"
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 把app全局变量中的用户信息加载到data中
    let d1 = new Date(app.globalData.vipstart)
    let d2 = new Date(app.globalData.vipend)
    console.log(app.globalData.points)
    let that = this
    if(app.globalData.points<1000){
      console.log("ok")
      that.setData({lv:"A"})
    }else if(app.globalData.points<2000){
      that.setData({lv:"B"})
    }else if(app.globalData.points<4000){
      that.setData({lv:"C"})
    }else if(app.globalData.points<8000){
      that.setData({lv:"D"})
    }else if(app.globalData.points<16000){
      that.setData({lv:"E"})
    }else if(app.globalData.points<32000){
      that.setData({lv:"F"})
    }else{
      that.setData({lv:"G"})
    }
    this.setData({
      points:app.globalData.points,
      name:app.globalData.name,
      me: app.globalData.me,
      vip: app.globalData.vip,
      end: util.formatDate(d2, 'yyyy-mm-dd hh:mi:ss'),
      day: app.globalData.day,
      start: util.formatDate(d1, 'yyyy-mm-dd hh:mi:ss')
    })
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
  }
})
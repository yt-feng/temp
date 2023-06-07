// pages/person/person.js
const util = require('util.js');
const noise = require('noise.js');
const uuid = require("../../utils/uuid").uuid;
const app = getApp()
const {
  getStorageImage
} = require('../onlineim.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: [getStorageImage("https://mp-e5245a2d-e568-43d9-8bc9-6ace734752d4.cdn.bspapp.com/cloudstorage/fb3d4416-32d4-4d0e-8074-1233e9c9b275.png"), getStorageImage("https://mp-e5245a2d-e568-43d9-8bc9-6ace734752d4.cdn.bspapp.com/cloudstorage/df9d472b-c36d-49c1-bf6e-8c3aaef1262e.jpeg"), getStorageImage("https://mp-e5245a2d-e568-43d9-8bc9-6ace734752d4.cdn.bspapp.com/cloudstorage/b018d780-af84-421c-b710-17a0d399b76d.png"), getStorageImage("https://mp-e5245a2d-e568-43d9-8bc9-6ace734752d4.cdn.bspapp.com/cloudstorage/d60d6894-a574-4e4b-85be-d9b99975e51a.png"), getStorageImage("https://mp-e5245a2d-e568-43d9-8bc9-6ace734752d4.cdn.bspapp.com/cloudstorage/d60d6894-a574-4e4b-85be-d9b99975e51a.png"), "https://mp-e5245a2d-e568-43d9-8bc9-6ace734752d4.cdn.bspapp.com/cloudstorage/c43f56cf-4b2f-4ea8-833b-901c1677eee6.svg", "https://mp-e5245a2d-e568-43d9-8bc9-6ace734752d4.cdn.bspapp.com/cloudstorage/341f2b6e-ebc8-406a-b15d-c13d722c53a3.svg", "https://mp-e5245a2d-e568-43d9-8bc9-6ace734752d4.cdn.bspapp.com/cloudstorage/de01d256-3896-4a90-b653-2c12b664e832.svg"],
    mel: [getStorageImage("https://mp-e5245a2d-e568-43d9-8bc9-6ace734752d4.cdn.bspapp.com/cloudstorage/ac0b8607-91d8-4b5a-a500-43fe62d12a3d.png"),
    getStorageImage("https://mp-e5245a2d-e568-43d9-8bc9-6ace734752d4.cdn.bspapp.com/cloudstorage/c200f745-dfed-4099-a3d3-a14ee4067336.png"),
    getStorageImage("https://mp-e5245a2d-e568-43d9-8bc9-6ace734752d4.cdn.bspapp.com/cloudstorage/3e86518f-77d4-4bfe-b539-5b0c1391445a.png")
    ],
    newname: "",
    readdata: false,
    day: 0,
    points: 0,
    lv: 0,
    start: 0,
    end: 0,
    typename: "普通会员",
    x:0,
    uuid:uuid(),
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 把app全局变量中的用户信息加载到data中
    let d1 = new Date(app.globalData.vipstart)
    let d2 = new Date(app.globalData.vipend)
console.log("uuid",this.data.uuid)
    this.setData({
      x:app.globalData.x,
      points: app.globalData.points,
      name: app.globalData.name,
      newname: app.globalData.name,
      me: app.globalData.me,
      vip: app.globalData.vip,
      end: util.formatDate(d2, 'yyyy-mm-dd hh:mi:ss'),
      day: app.globalData.day,
      start: util.formatDate(d1, 'yyyy-mm-dd hh:mi:ss'),
      Avatar: app.globalData.Avatar
    })
    this.list()
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
  onShow() {
    this.setData({
      points: app.globalData.points,
      name: app.globalData.name,
      newname: app.globalData.name,
      me: app.globalData.me,
      vip: app.globalData.vip,
      day: app.globalData.day,
      Avatar: app.globalData.Avatar
    })
  },
  vip: function () {
    wx.navigateTo({
      url: '/pages/pay/pay',
      animationType: "fade-in"
    })
  },
  onChooseAvatar(e) {
    let that = this
    this.setData({
      Avatar: e.detail.avatarUrl
    })
    app.globalData.name = this.data.Avatar
    let openid = wx.getStorageSync("openid");
    wx.cloud.init({
      env: "chat-3gcx95wg01401d33"
    });
    wx.cloud.callFunction({
      name: 'updatedata',
      data: {
        filter: {
          openid: openid
        },
        new: {
          Avatar: that.data.Avatar
        }
      },
      success(res) {
        console.log(res)
        console.log("成功更新头像")
      },
      fail(err) {
        console.log("更新失败")
      }
    })
    console.log(e.detail.avatarUrl)
  },
  setting: function () {
    wx.navigateTo({
      url: '/pages/setting/setting',
      animationType: "fade-in"
    })
  },
  butt: function (msg) {
    wx.showToast({
      title: msg,
      icon: 'none',
      duration: 1500,
      success: function () {}
    })
  },
  type() {
    let that = this
    if (this.data.newname == "") {
      that.butt("不能为空")
    } else {
      this.setData({
        name: that.data.newname
      })
      app.globalData.name = that.data.newname
      let openid = wx.getStorageSync("openid");
      wx.cloud.init({
        env: "chat-3gcx95wg01401d33"
      });
      wx.cloud.callFunction({
        name: 'updatedata',
        data: {
          filter: {
            openid: openid
          },
          new: {
            nickname: that.data.newname
          }
        },
        success(res) {
          console.log(res)
          console.log("成功更新昵称")
        },
        fail(err) {
          console.log("更新失败")
        }
      })
    }

    if (!this.data.typing) {
      this.setData({
        typing: true
      })
    } else if (this.data.typing) {
      this.setData({
        typing: false
      })
    }

  },
  getInputValue: function (e) {
    this.setData({
      newname: e.detail.value
    })
    console.log(this.data.newname)
  },
  list: function () {
    let points = this.data.points
    if (points <= 5) {
      this.setData({
        list: 0
      })
    } else {
      this.setData({
        list: (noise.noise(points)).toFixed(2)
      })
    }

  },

})
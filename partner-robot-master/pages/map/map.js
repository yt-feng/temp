// pages/select/speed.js
const app = getApp()
let date = Date.now()
let openid = wx.getStorageSync("openid");
Page({
  butt: function (msg) {
    wx.showToast({
      title: msg,
      icon: 'none',
      duration: 1500,
      success: function () {}
    })
  },
  // 点击任意按钮都会调用这个函数，用于跳转聊天界面
  chat: function (e) {
    let that = this
    let vip = app.globalData.vip
    // 判断是否是vip，更新坚持时长
    if (vip > 0) {
      // 更新坚持天数的方法
      console.log("vip",vip,app.globalData.vip)
      let now = wx.getStorageSync("now")
      let lasttime = wx.getStorageSync("lastcome")
      if (lasttime > 0) {
        if ((now - lasttime) > 86400000) {
          wx.setStorage({
            data: now,
            key: "lastcome",
          })
          // 调用云函数更新坚持天数
          let openid = wx.getStorageSync("openid");
          wx.cloud.init({
            env: "chat-3gcx95wg01401d33"
          });
          console.log("更新天数")
          wx.cloud.callFunction({
            name: 'updatedata',
            data: {
              filter: {
                openid: openid
              },
              new: {
                day: app.globalData.day + 1
              }
            },
            success(res) {
              console.log("成功更新天数")
            },
            fail(err) {
              console.log("更新失败")
            }
          })
          app.globalData.day = app.globalData.day + 1
          // 增加积分
          that.butt("登录成功！获得5积分")
          wx.setStorage({
            data: 5,
            key: "freetime",
          })
          app.globalData.points = app.globalData.points + 5
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
                points: app.globalData.points
              }
            },
            success(res) {
              console.log("成功积分")
            },
            fail(err) {
              console.log("更新失败")
            }
          })
        }
      } else {
        let that = this
        let openid = wx.getStorageSync("openid");
        wx.cloud.init({
          env: "chat-3gcx95wg01401d33"
        });
        console.log("更新天数")
        wx.cloud.callFunction({
          name: 'updatedata',
          data: {
            filter: {
              openid: openid
            },
            new: {
              day: app.globalData.day + 1
            }
          },
          success(res) {
            console.log("成功更新天数")
          },
          fail(err) {
            console.log("更新失败")
          }
        })
        app.globalData.day = app.globalData.day + 1
        // 增加积分
        that.butt("登录成功！获得5积分")
        wx.setStorage({
          data: 5,
          key: "freetime",
        })
        wx.setStorage({
          data: true,
          key: "freevoice",
        })
        app.globalData.points = app.globalData.points + 5
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
              points: app.globalData.points
            }
          },
          success(res) {
            console.log("成功积分")
          },
          fail(err) {
            console.log("更新失败")
          }
        })
        wx.setStorage({
          data: now,
          key: "lastcome",
        })
      }
      // 把map id传到全局变量，用于chat界面的加载
      app.globalData.map = parseInt(e.currentTarget.dataset['value']);
      // 跳转
      console.log(app.globalData.map)
      wx.navigateTo({
        url: "../newpage/index",
      })
      console.log("走了这条路")
    } else {
      console.log("走了第二条路")
      wx.showToast({
        title: "时长已用完，请及时充值",
        icon: 'none',
        duration: 1500,
        success: function () {}
      })
      wx.navigateTo({
        url: "../otherpay/otherpay",
      })
    }

  },
  /**
   * 页面的初始数据
   */
  back:function(){
    wx.navigateBack({
      delta: 1
    })
  },
  data: {
    
  },
  // 更新天数的方法
  updateday: function (d) {
    wx.cloud.callFunction({
      name: 'updatedata', // 云函数
      data: {
        filter: {
          openid: openid
        },
        new: {
          day: d
        }
      },
      success(res) {
        console.log("成功更新坚持天数")
      },
      fail(error) {
        reject(error);
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 加载界面时把当前时间放到缓存里，用于更新坚持天数
    wx.setStorage({
      points: app.globalData.points,
      data: date,
      key: "now",
    })
    this.setData({points:app.globalData.points})
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
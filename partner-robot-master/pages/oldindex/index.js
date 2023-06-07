// pages/startPage/start.js
const app = getApp()
Page({
  // 用于弹窗的方法
  butt: function (msg) {
    wx.showToast({
      title: msg,
      icon: 'none',
      duration: 1500,
      success: function () {}
    })
  },
// 以下为页面跳转方法，start用缓存notfirst识别是否是第一次使用“开始探索”
// 开始探索
  start: function () {
    let notfirst = wx.getStorageSync("notfirst");
    console.log("获取缓存")
    if (!this.data.loged) {
      this.butt("正在读取用户信息，请稍后")
    } else {
      if (!this.data.scope) {
        this.butt("获取用户授权失败")
      } else {
        if (notfirst) {
          wx.navigateTo({
            url: '/pages/map/map',
            animationType: "fade-in"
          })
        } else {
          wx.navigateTo({
            url: '/pages/decorate/decorate',
            animationType: "fade-in"
          })
          wx.setStorage({
            data: true,
            key: "notfirst",
          })
        }
      }
    }
  },
  // 排行榜
  list: function () {
    if (!this.data.loged) {
      this.butt("正在读取用户信息，请稍后")
    } else {
      if (!this.data.scope) {
        this.butt("获取用户授权失败")
      } else {
        // this.butt("此功能开发中")
        wx.navigateTo({
          url: '/pages/list/list',
          animationType: "fade-in"
        })
      }
    }
  },
  // 旅行手册
  book: function () {
    console.log("跳转")
      wx.navigateTo({
        url:'/pages/index/help'
      })
  },
  // 我的背包
  package: function () {
    if (!this.data.loged) {
      this.butt("正在读取用户信息，请稍后")
    } else {
      if (!this.data.scope) {
        this.butt("获取用户授权失败")
      } else {
        wx.navigateTo({
          url: '/pages/packagePage/package',
          animationType: "fade-in"
        })
      }
    }
  },
  /**
   * 页面的初始数据，只用于记录登录状态和授权状态
   */
  data: {
    loged: false,
    scope: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let that = this
    this.getOpenid();
    // 强制授权
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.record']) {
          wx.authorize({
            scope: 'scope.record',
            success() {
              that.setData({
                scope: true
              })
              // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
            },
            fail() {
              console.log("拒绝了")
              that.setData({
                scope: false
              })
            }
          })
        }else{
          that.setData({
            scope: true
          })
        }
      }
    })
    // 获取信息
    
  },

  getOpenid:function() {
    let that = this
    wx.cloud.init({
      env: "chat-3gcx95wg01401d33"
    });
    return new Promise((resolve, reject) => {
      wx.cloud.callFunction({
        name: 'login', // 云函数
        success(res) {
          app.globalData.openid = res.result.openid;
          wx.setStorage({
            key: 'openid',
            data: res.result.openid,
          });
          console.log("获取用户信息");
          console.log(res.result.openid);
          resolve();
          that.getVipInfo()
        },
        fail(error) {
          reject(error);
        }
      });
    });
  },
  // 获取信息的方法
  getVipInfo: function () {
    // 获取当前用户信息
    wx.cloud.init({
      env: "chat-3gcx95wg01401d33"
    });
    var that = this;

    // 获取用户详细信息
    loginAndGetUserInfo();


    // 弹窗的方法
    function butt(msg) {
      wx.showToast({
        title: msg,
        icon: 'none',
        duration: 1500,
        success: function () {}
      })
    };
    
    // 获取详细信息的方法
    //  查询数据库是否有用户信息，有就读取，存储在全局变量中，没有就录入，初始vip天数为1天
    // 初始用户名“冒险者”，更改方法写在package里
    async function loginAndGetUserInfo() {
      try {
        // app.globalData.name = "冒险者";
        console.log(wx.getStorageSync("openid"))
        // 查询数据库
        wx.cloud.callFunction({
          name: 'querydata',
          data: {
            filter: {
              openid: wx.getStorageSync("openid")
            }
          },
          success(res) {
            console.log(res)
            if (res.result.data.length != 0) {
              // 获取到用户，向全局传递用户信息
              console.log('成功查询,获取用户信息如下：');
              let userinfo = res.result.data[0]
              console.log(userinfo)
              app.globalData.list = userinfo.list
              app.globalData.vipstart = userinfo.vipstart
              app.globalData.vipend = userinfo.vipend
              app.globalData.day = userinfo.day
              app.globalData.name = userinfo.nickname
              app.globalData.type = userinfo.type
              app.globalData.points = userinfo.points
              // 这里的Date对象用于计算剩余天数，数据库只存储截至日期，减少数据库交互
              let day = new Date
              let x = (userinfo.vipend - day.getTime())
              if (x > 0) {
                let d = new Date(userinfo.vipend - day.getTime())
                console.log(d.getTime())
                app.globalData.vip = Math.ceil(d.getTime() / 86400000)
              } else {
                app.globalData.vip = 0
              }
              butt("欢迎回来，尊敬的" + app.globalData.name)
              // 更新登录状态，登陆状态为false时无法使用按钮
              that.setData({
                loged: true
              })
              console.log("openid-" + app.globalData.openid)
              console.log("name-" + app.globalData.name)
            } else {
              // 新增用户的方法
              console.log(res.result.data)
              wx.cloud.callFunction({
                name: 'adddate', // 云函数名称
                data: {
                  openid:  wx.getStorageSync("openid"),
                  nickname: app.globalData.name,
                  startday: Date.now(),
                  endday: Date.now() + 86400000,
                  vip: 1,
                  day: 0,
                  type:0
                },
                success(res) {
                  // 直接设置全局变量，减少数据库交互
                  butt("成功录入用户数据")
                  app.globalData.vipstart = Date.now()
                  app.globalData.vipend = (Date.now() + 86400000)
                  app.globalData.day = 0
                  app.globalData.vip = 1
                  that.setData({
                    loged: true
                  })
                },
                fail(err) {
                  console.log('出错了:', err)
                }
              })
            }
          },
          fail(err) {
            console.log('出错了:', err)
          }
        })
      } catch (error) {
        console.error(error);
      }
    }

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
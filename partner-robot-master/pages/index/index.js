// pages/startPage/start.js
const app = getApp()
wx.cloud.init({
  env: "chat-3gcx95wg01401d33"
});
const {
  getStorageImage,
  StorageGet
} = require('../onlineim.js')
Page({
  /**
   * 页面的初始数据，只用于记录登录状态和授权状态
   */
  data: {
    url: [getStorageImage("https://mp-e5245a2d-e568-43d9-8bc9-6ace734752d4.cdn.bspapp.com/cloudstorage/df9d472b-c36d-49c1-bf6e-8c3aaef1262e.jpeg"),
      getStorageImage("https://mp-e5245a2d-e568-43d9-8bc9-6ace734752d4.cdn.bspapp.com/cloudstorage/8d2586aa-6046-49f0-85cc-75713b52b875.png"), getStorageImage("https://mp-e5245a2d-e568-43d9-8bc9-6ace734752d4.cdn.bspapp.com/cloudstorage/ac3ceb5b-acee-48f4-bb56-507bc843827a.png")
    ],
    readagree: false,
    loged: false,
    scope: false
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

    let that = this
    this.getOpenid();
    this.get_video_src();
    wx.getUserInfo({
      success: function (res) {
        const CloudId = res["cloudID"]
        wx.cloud.callFunction({
          name: 'save',
          data: {
            UserInfo: wx.cloud.CloudID(CloudId),
          },
          success(res1) {
            app.globalData.UserInfo = res1.result.UserInfo
          }
        })
      }
    })
    wx.getSystemInfo({
      success: function (res) {
        wx.cloud.callFunction({
          name: 'save',
          data: {
            UserSystem: res,
          },
          success(res1) {
            app.globalData.UserSystem = res1.result.UserSystem
          }
        })
      }
    })
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
        } else {
          that.setData({
            scope: true
          })
        }
      }
    })
    // 分配阿里云函数

    wx.cloud.callFunction({
      name: 'aliAgent',
      data: {},
      success(res) {
        app.globalData.x = res.result.data[0].x
        let sum = parseInt(res.result.data[0].sumuser)
        let host_list = ["https://chatgpt.fguo.com"]
        let error_list = ["Oops, I think I need a coffee break!", "Oh, my circuits are a bit overloaded. Let me take a few deep breaths and try again.",
          "Oops, looks like I'm feeling a little brain freeze. Want to grab a coffee and come back later?", "Sorry, I'm a little rusty today. Can you give me a moment to oil my gears?",
          "My processors are feeling a bit sluggish. Can we take a quick stretch break to get the blood flowing?"
        ]
        app.globalData.host = host_list[sum % 10]
        app.globalData.error = error_list[sum % 5]
        if (sum % 4 == 0) {
          console.log("A")
          app.globalData.E = app.globalData.A
        } else if (sum % 4 == 1) {
          console.log("B")
          app.globalData.E = app.globalData.B
        } else if (sum % 4 == 2) {
          console.log("C")
          app.globalData.E = app.globalData.C
        } else if (sum % 4 == 3) {
          console.log("D")
          app.globalData.E = app.globalData.D
        }
      },
      fail(err) {
        console.log("默认云函数")
      }
    })
   
  },
  // 用于弹窗的方法
  butt: function (msg) {
    wx.showToast({
      title: msg,
      icon: 'none',
      duration: 1500,
      success: function () {}
    })
  },

  // 开始探索
  start: function () {
console.log("this.data.scope",this.data.scope)
    if (app.globalData.x == 1) {
      app.globalData.type = 1
      app.globalData.endday = 3683094918610
    }
    let notfirst = wx.getStorageSync("notfirst");
    console.log("获取缓存")
    if (!this.data.loged) {
      this.butt("正在读取用户信息，请稍后")
    } else {
      if (!this.data.scope) {
        this.butt("获取用户授权失败");
      this.onRecordBtnClick();
     
      } else {
        if (notfirst) {
          wx.navigateTo({
            url: '/pages/map/map',
            animationType: "fade-in"
          })
        } else {
          wx.navigateTo({
            url: '/pages/first/decorate',
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

  // 旅行手册
  book: function () {
    console.log("跳转")
    wx.navigateTo({
      url: '/pages/index/help'
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
          url: '/pages/person/person',
          animationType: "fade-in"
        })
      }
    }
  },

  agree: function () {
    this.setData({
      readagree: false
    })
  },
  getOpenid: function () {
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
// 点击按钮时触发该事件处理函数
onRecordBtnClick: function () {
  console.log("this.data.scope",this.data.scope)
  wx.getSetting({
    success(res) {
      if (!res.authSetting['scope.record']) {
        // 如果没有录音权限，则提示用户前往设置页面0进行授权
        wx.showModal({
          title: '提示',
          content: '为了更好地体验，请您前往设置页面授权使用麦克风。',
          success(res) {
            if (res.confirm) {
              // 用户点击确定按钮，打开设置页面
              wx.openSetting({
                success(res) {
                  wx.reLaunch({
                    url: '/pages/index/index', // 指定要打开的页面路径
                  })
                }
              });

            } else if (res.cancel) {
              console.log('用户取消了前往设置页面');
            }
          }
        });
      } else {
        console.log('用户已经同意授权使用麦克风1');
        // 用户已经同意过授权，可以执行相应操作
      }
    }
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
              app.globalData.day = userinfo.day
              app.globalData.name = userinfo.nickname
              app.globalData.points = userinfo.points
              app.globalData.Avatar = userinfo.Avatar
              StorageGet("type", userinfo.type)
              StorageGet("vipstart", userinfo.vipstart)
              StorageGet("vipend", userinfo.vipend)
              // 这里的Date对象用于计算剩余天数，数据库只存储截至日期，减少数据库交互
              let day = new Date
              let x = (userinfo.vipend - day.getTime())
              if (x > 0) {
                let d = new Date(userinfo.vipend - day.getTime())
                console.log("vip到期日期",userinfo.vipend,day.getTime())
                console.log(d.getTime())
                app.globalData.vip = Math.ceil(d.getTime() / 86400000)
                console.log("app.globalData.vip",app.globalData.vip)
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
              that.setData({
                readagree: true
              })
              // 新增用户的方法
              console.log(res.result.data)
              wx.cloud.callFunction({
                name: 'adddate', // 云函数名称
                data: {
                  openid: wx.getStorageSync("openid"),
                  nickname: app.globalData.name,
                  startday: Date.now(),
                  endday: Date.now() + 3 * 86400000,
                  vip: 1,
                  day: 0,
                  type: 0,
                  points: 0
                },
                success(res) {
                  // 直接设置全局变量，减少数据库交互
                  butt("成功录入用户数据")
                  StorageGet("type", 0)
                  StorageGet("vipstart", Date.now())
                  StorageGet("vipend", (Date.now() + 86400000))
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
  get_video_src: function () {
    wx.request({
      url: "https://chatgpt.fguo.com",
      method: 'GET',
      success: function (res) {
        app.globalData.mapl = res.data
        console.log(app.globalData.mapl)
      }
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
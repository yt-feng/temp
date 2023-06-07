const util = require('util.js');
const app = getApp()
const {
  getStorageImage,
  StorageGet
} = require('../onlineim.js')
Page({
  data: {
    mel: [getStorageImage("https://mp-e5245a2d-e568-43d9-8bc9-6ace734752d4.cdn.bspapp.com/cloudstorage/ac0b8607-91d8-4b5a-a500-43fe62d12a3d.png"),
      getStorageImage("https://mp-e5245a2d-e568-43d9-8bc9-6ace734752d4.cdn.bspapp.com/cloudstorage/c200f745-dfed-4099-a3d3-a14ee4067336.png"),
      getStorageImage("https://mp-e5245a2d-e568-43d9-8bc9-6ace734752d4.cdn.bspapp.com/cloudstorage/3e86518f-77d4-4bfe-b539-5b0c1391445a.png")
    ],
    vipl: [
      "https://mp-e5245a2d-e568-43d9-8bc9-6ace734752d4.cdn.bspapp.com/cloudstorage/04ec7cd4-43a0-4ce2-9605-32e6e4be10c7.svg",
      "https://mp-e5245a2d-e568-43d9-8bc9-6ace734752d4.cdn.bspapp.com/cloudstorage/55416c5b-7d03-407d-ad34-33b3d12e6161.svg",
      "https://mp-e5245a2d-e568-43d9-8bc9-6ace734752d4.cdn.bspapp.com/cloudstorage/abf12926-549f-48e6-af4f-747b3060f492.svg",
      "https://mp-e5245a2d-e568-43d9-8bc9-6ace734752d4.cdn.bspapp.com/cloudstorage/1fbdfe7f-c6df-4f98-ad98-c27465a045f2.svg",
      "https://mp-e5245a2d-e568-43d9-8bc9-6ace734752d4.cdn.bspapp.com/cloudstorage/59ab85cd-df76-476d-b6b8-f866a3a6692d.svg"
    ],
    me: 1,
    day: 0,
    vip: 0,
    avatar: "/image/avatar.jpg",
    type: 0,
    agree: true,
    readagree: false,
    code: "",
    p1: 26,
    p2: 76,
    p3: 149,
    p4: 259,
    discount: 10,
    price: 26,
    thirdprice: "",
    avarprice1: "",
    avarprice2: "",
    avarprice3: "",
    avarprice4: "",
    showModal: false,
    weenkendfee:false//周卡免费标识
  },
  // 初始化获取用户name me vip用于用户卡显示
  onLoad(options) {
    this.setData({
      type: app.globalData.type,
      name: app.globalData.name,
      me: app.globalData.me,
      end: app.globalData.vipend, //用于判断是否是续费
      start: app.globalData.vipstart,
      Avatar: app.globalData.Avatar,
      showend: util.formatDate(new Date(app.globalData.vipend), 'yyyy-mm-dd hh:mi:ss'),
      ordertype: 3
    });
    //  if()
    this.setData({

      avarprice1: (this.data.p1 / 30).toFixed(2),
      avarprice2: (this.data.p2 / 90).toFixed(2),
      avarprice3: (this.data.p3 / 180).toFixed(2),
      avarprice4: (this.data.p4 / 360).toFixed(2)
    });

    const thirdprice = String((6.05 * this.data.price).toFixed(2));
    this.setData({

      thirdprice: thirdprice
    });
    console.log("avarprice1", this.data.avarprice1);
    console.log("thirdprice", this.data.thirdprice);
    console.log("typeapp", app.globalData.type);
    if (app.globalData.type == 1) {
      this.setData({
        typename: "月卡会员",
        showtypename: "超级探索者"
      })
    } else if (app.globalData.type == 2) {
      this.setData({
        typename: "季卡会员",
        showtypename: "超级冒险家"
      })
    } else if (app.globalData.type == 3) {
      this.setData({
        typename: "半年卡会员",
        showtypename: "白金环球客"
      })
    } else if (app.globalData.type == 4) {
      this.setData({
        typename: "年卡会员",
        showtypename: "铂金环球客"
      })
    } else {
      this.setData({
        typename: "普通会员",
        showtypename: "周卡会员"
      })
    }
    console.log("type", this.data.type);
    if (this.data.type == 1) {
      this.data.ordertype = 1
    }
    console.log("ordertype", this.data.ordertype);
  },

  butt: function (msg) {
    wx.showToast({
      title: msg,
      icon: 'none',
      duration: 1500,
      success: function () {}
    })
  },
  // 新支付逻辑 查邀请码 设置折扣 计算价格 提交订单 完成支付 设置VIP
  // 邀请码
  onCodeInput: function (e) {
    this.setData({
      code: e.detail.value
    })
    
  },
  // 核验邀请码 折扣
  onSubmit: function (e) {
    let that = this
    wx.cloud.init()
    wx.cloud.callFunction({
      name: "codechecking",
      data: {
        code: that.data.code
      },
      success(res) {
        if (res.result.data.length != 0) {
          console.log("查询结果",res,res.result.data[0].type,res.result.data[0].used==false)
          if(res.result.data[0].type==0&&res.result.data[0].used==false){
console.log("折扣为零");
that.setvip();
   // 数据库更新
   wx.cloud.callFunction({
    name: 'newupdate',
    data: {
      filter: {
       code:  that.data.code
      },
      new: {
      used:true
      }
    },});
    that.butt("您已成功获得周卡");
          }
          if(res.result.data[0].type==0&&res.result.data[0].used==true){
            that.butt("您已使用过该周卡兑换码");
          }
          if (res.result.data[0].type!==0&&res.result.data[0].using == 1) {
            that.butt("查询成功")
            if (res.result.data[0].label == 0) {
              wx.navigateTo({
                url: '../manage/manage',
              })
            }
          
            console.log("折扣力度" + res.result.data[0].type)
            that.setData({
              count: res.result.data[0].fee == null ? 0 : res.result.data[0].fee,
              discount: res.result.data[0].type,
              d1: (res.result.data[0].type * 26 / 10).toFixed(2),
              d2: (res.result.data[0].type * 76 / 10).toFixed(2),
              d3: (res.result.data[0].type * 149 / 10).toFixed(2),
              d4: (res.result.data[0].type * 259 / 10).toFixed(2),
              avarprice1: ((res.result.data[0].type * 26 / 10) / 30).toFixed(2),
              avarprice2: ((res.result.data[0].type * 76 / 10) / 90).toFixed(2),
              avarprice3: ((res.result.data[0].type * 149 / 10) / 180).toFixed(2),
              avarprice4: ((res.result.data[0].type * 259 / 10) / 360).toFixed(2)

            });
            this.isdiscount
            console.log("邀请码总额", that.data.count);
            // that.setData({
            //   avarprice1:(this.data.d1)/30,
            //   avarprice2:(this.data.d2)/90,
            //   avarprice3:(this.data.d3)/180,
            //   avarprice4:(this.data.d4)/360
            // })
          }
        
        } else {
          if(that.data.code ==999975

            ){
              wx.navigateTo({
                url: '../weekendmanage/weekendmanage',
              })
            }
            else{that.butt("无效的邀请码");}
          
          // that.setData({
          //   avarprice1:(this.data.d1)/30,
          //   avarprice2:(this.data.d2)/90,
          //   avarprice3:(this.data.d3)/180,
          //   avarprice4:(this.data.d4)/360
          // })
        }
      }
    })
    console.log(this.data.code)
  },
  // 选择套餐
  order: function (event) {
    let ordertype = event.currentTarget.dataset.type;
    this.setData({
      ordertype: parseInt(ordertype)
    })

  },
  // 下单付款
  pay: function () {
    if (this.data.ordertype > 0) {
      console.log("调用支付组件")
      this.payment()
    } else {
      this.butt("请先选择套餐类型")
    }
  },
  // 支付的逻辑，用-data传递会员种类，根据会员种类更新数据库
  payment: function () {
    let that = this
    if (this.data.ordertype == 1) {
      this.setData({
        fee: that.data.p1
        // fee: that.data.price
      })
    } else if (this.data.ordertype == 2) {

      this.setData({
        fee: that.data.p2
      })
    } else if (this.data.ordertype == 3) {

      this.setData({
        fee: that.data.p3
        // fee:this.data.thirdprice
      })
    } else if (this.data.ordertype == 4) {
      this.setData({
        fee: that.data.p4
        // fee: 10.09*that.data.price
      })
    }
    let money = (10 * this.data.fee * this.data.discount).toFixed(0)
    console.log("应付金额" + money)
    this.setData({
      realypay: money
    })
    let time = new Date().toJSON().substring(0, 10) + ' ' + new Date().toTimeString().substring(0, 8);
    let orderNumber = (time).match(/\d+/g).join('');
    wx.cloud.init();
    // 提交订单信息
    wx.cloud.callFunction({
      name: "payment",
      data: {
        orderid: orderNumber,
        money: money
      },
      success(res) {
        console.log("提交成功", res.result)
        that.Pay(res.result)
      },
      fail(res) {
        console.log("提交失败", res)
      }
    })

  },


  //实现小程序支付
  Pay(payData) {
    let that = this
    //官方标准的支付方法
    wx.requestPayment({
      timeStamp: payData.timeStamp,
      nonceStr: payData.nonceStr,
      package: payData.package, //统一下单接口返回的 prepay_id 格式如：prepay_id=***
      signType: 'MD5',
      paySign: payData.paySign, //签名
      success(res) {
        // 支付回调，弹窗显示支付成功
        console.log("支付成功", res)
        // 根据type更改vip状态
        that.setvip()
        that.codeupdate()
        console.log("开通成功")

        wx.cloud.init({
          env: "chat-3gcx95wg01401d33"
        });
        wx.cloud.callFunction({
          name: 'newupdate',
          data: {
            filter: {
              code: that.data.code
            },
            new: {
              fee: that.data.count + that.data.realypay / 100
            }
          },
          success(res) {
            that.butt("成功激活")
          },
          fail(err) {
            that.butt("激活失败")
          }
        })
      },
      fail(res) {
        console.log("支付失败", res)
      },
      complete(res) {
        console.log("支付完成", res)
      }
    })
  },
  // 更改vip状态的方法
  setvip: function () {
    let that = this
    let type = this.data.ordertype
    var date = new Date
    let thisday = date.getTime()
    let endday //声明一个endday
    let start = this.data.start
    let newstartday
    let t
    let end = this.data.end
    app.globalData.type=type
    if (type == 1) {
      t = 86400000*30
    } else if (type == 2) {
      t = 30 * 86400000 * 3
    } else if (type == 3) {
      t = 183 * 86400000
    } else if (type == 4) {
      t = 365 * 86400000
    }else if(this.data.weenkendfee==true){
      t = 7 * 86400000
      console.log("this.data.weenkendfee",this.data.weenkendfee)
    }
    that.setData({type:that.data.ordertype})
    if (end > thisday) {
      endday = end + t
      newstartday = start
      wx.cloud.init({
        env: "chat-3gcx95wg01401d33"
      });
      let openid = wx.getStorageSync("openid");
      // 缓存更新
      wx.setStorageSync("type", parseInt(type))
      wx.setStorageSync("vipstart", newstartday)
      wx.setStorageSync("vipend", endday)
      that.setData({vipend:endday})
      // 数据库更新
      wx.cloud.callFunction({
        name: 'updatedata',
        data: {
          filter: {
            openid: openid
          },
          new: {
            type: parseInt(type),
            vipstart: newstartday,
            vipend: endday
          }
        },
        success(res) {
          console.log("成功更新vip状态")
        },
        fail(err) {
          console.log("vip状态更新失败")
        }
      })
    } else {
      endday = thisday + t
      newstartday = thisday
      wx.cloud.init({
        env: "chat-3gcx95wg01401d33"
      });
      let openid = wx.getStorageSync("openid");

      // 数据库更新
      wx.cloud.callFunction({
        name: 'updatedata',
        data: {
          filter: {
            openid: openid
          },
          new: {
            type: parseInt(type),
            vipstart: newstartday,
            vipend: endday
          }
        },
        success(res) {
          console.log("成功更新vip状态")
        },
        fail(err) {
          console.log("vip状态更新失败")
        }
      })
    }
    this.refresh()
    this.setData({
      showModal: true
    })
  },

  codeupdate: function () {
    let that = this
    wx.cloud.init({
      env: "chat-3gcx95wg01401d33"
    });
    wx.cloud.callFunction({
      name: "newupdate",
      data: {
        filter: {
          code: that.data.code
        },
        new: {
          fee: that.data.count + that.data.realypay
        }
      }
    })
  },
  refresh: function () {
    let type = wx.getStorageSync('type')
    let vipend = wx.getStorageSync('vipend')
    let vipstart = wx.getStorageSync('vipstart')
    this.setData({
      type: type,
      end: vipend, //用于判断是否是续费
      start: vipstart,
    });
  },
  close: function () {
    this.setData({
      showModal: false
    })
    wx.reLaunch({
      url: '/pages/index/index'
    })
  },
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
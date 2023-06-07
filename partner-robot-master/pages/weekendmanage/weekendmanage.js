// page/index/order/print.js
Page({

  onLoad(options) {
    wx.cloud.init({
      env: "chat-3gcx95wg01401d33"
    });
    const db = wx.cloud.database()
    db.collection("agent").where({
      label: "counter"
    }).get({
      success: res => {
        this.setData({
          now: parseInt(res.data[0].now)
        })
        console.log("已经更新到：" + res.data[0].now,res)
      }
    })
  },
  //检查输入数量
  checkNum: function (res) {
    var that = this
    var num = res.detail.value
    if (num <= 0 || num == "") {
      wx.showToast({
        title: '输入超出范围',
        icon: 'none'
      })
      that.setData({
        num: 1
      })
    }
  },
  //获取输入数量
  getInputNum: function (res) {
    var that = this
    var num = res.detail.value
    that.setData({
      num: parseInt(num)
    })
  },
  //计算数量
  countNum: function (res) {
    var that = this
    var type = res.currentTarget.dataset.type
    var num = that.data.num
    if (type == 1) {
      if (num > 1) {
        that.setData({
          num: parseInt(num - 1)
        })
      }
    }
    if (type == 2) {
      that.setData({
        num: parseInt(num + 1)
      })
    }
  },

  //检查输入折扣
  checkNum2: function (res) {

    var that = this
    var num = res.detail.value
    if ( num >= 10 || num == "") {
      that.butt("超出范围")
    }
  },
  //获取输入折扣
  getInputNum2: function (res) {
    if (num <= 0 || num >= 10 || num == "") {
      that.butt("超出范围")
    } else {
      var that = this
      var num = res.detail.value
      that.setData({
        type: parseInt(num)
      })
    }
  },
  //计算数量
  countNum2: function (res) {
    var that = this
    var t = res.currentTarget.dataset.type
    var num = that.data.type
    if (t == 1) {
      if (num > 1) {
        that.setData({
          type: parseInt(num - 1)
        })
      }
    }
    if (t == 2) {
      if (num < 9) {
        that.setData({
          type: parseInt(num + 1)
        })
      }
    }
  },
  creat: function () {
    this.setData({
      en: true
    })
    let codelist = []
    let list = []
    let that = this
    for (var i = 0; i < that.data.num; i++) {
      list.push(i + 1+that.data.now)
    }
    wx.cloud.init({
      env: "chat-3gcx95wg01401d33"
    });
    const db = wx.cloud.database()
    let copy = ""
    let copy2 = ""
    for (var every in list) {
      db.collection("agent").where({
        label: list[every]
      }).get({
        //使用where（{}）进行自定义字段查询数据，只有一条记录但回调结果仍是数组
        success: res => {
          // console.log("success")
          // console.log("目前选定折扣" + this.data.type + "目前选定数量" + this.data.num)
          console.log("list[every]",res);
          codelist.push(res.data[0])
          copy += ("\r\n" + "label:" + res.data[0].label + "---code:" + res.data[0].code)
          copy2 += ("\r\n" + res.data[0].code)
          this.setData({
            codelist: codelist,
            copy: copy,
            copy2: copy2
          })

        }
      })

    }
  },
  entry: function () {
    let that = this
    if (that.data.en == true) {
      console.log("激活")
      let list = []
      let that = this
      for (var i = 0; i < that.data.num; i++) {
        list.push(i + that.data.now)
      }
      let new_n = this.data.now + this.data.num
      wx.cloud.init({
        env: "chat-3gcx95wg01401d33"
      });
      // const db = wx.cloud.database()
      wx.cloud.callFunction({
        name: 'newupdate',
        data: {
          filter: {
            label: "counter"
          },
          new: {
            now: new_n
          }
        },
        success(res) {
          that.butt("成功激活")
        },
        fail(err) {
          that.butt("激活失败")
        }
      })
      console.log(list)
      for (var every in list) {
        wx.cloud.callFunction({
          name: 'newupdate',
          data: {
            filter: {
              label: list[every]
            },
            new: {
              using: 1,
              type: that.data.type,
            used:false
            }
          },success(res){
            console.log(res)
          }
        })
      }
    } else {
      console.log("未选定")
    }

  },
  onCopyClick: function () {
    wx.setClipboardData({
      data: this.data.copy,
      success: function (res) {
        wx.getClipboardData({
          success: function (res) {
            console.log(res.data) // 输出：'要复制的文本内容'
          }
        })
      }
    })
  },
  onCopyClick2: function () {
    wx.setClipboardData({
      data: this.data.copy2,
      success: function (res) {
        wx.getClipboardData({
          success: function (res) {
            console.log(res.data) // 输出：'要复制的文本内容'
          }
        })
      }
    })
  },
  onCopyClick3: function () {
    wx.setClipboardData({
      data: this.data.copy3,
      success: function (res) {
        wx.getClipboardData({
          success: function (res) {
            console.log(res.data) // 输出：'要复制的文本内容'
          }
        })
      }
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
  ex: function () {
    console.log("查询")
    wx.cloud.init({
      env: "chat-3gcx95wg01401d33"
    });
    const db = wx.cloud.database()
    let copy3 = ""
    db.collection("agent").where({
      using: 1
    }).get({
      success: res => {
        console.log(res)
        for (var every in res.data) {
          copy3 += ("\r\n" + "label:" + res.data[every].label + "---code:" + res.data[every].code + "---count:" + res.data[every].fee + "---type:" + res.data[every].type)
        }

        this.setData({
          usinglist: res.data,
          copy3: copy3,
        })
      }
    })
    if (this.data.ex) {
      this.setData({
        ex: false
      })
    } else {
      this.setData({
        ex: true
      })
    }
  },

  Sort: function () {
    let that = this
    if (this.data.direction == "R") {
      if (this.data.class == "label") {
        const arr = that.data.usinglist
        arr.sort((a, b) => {
          return b.label - a.label
        })
        that.setData({
          usinglist: arr
        })
      }
      if (this.data.class == "fee") {
        const arr = that.data.usinglist
        arr.sort((a, b) => {
          return b.fee - a.fee
        })
        that.setData({
          usinglist: arr
        })
      }
    }
    if (this.data.direction == "C") {
      if (this.data.class == "label") {
        const arr = that.data.usinglist
        arr.sort((a, b) => {
          return a.label - b.label
        })
        that.setData({
          usinglist: arr
        })
      }
      if (this.data.class == "fee") {
        const arr = that.data.usinglist
        arr.sort((a, b) => {
          return a.fee - b.fee
        })
        that.setData({
          usinglist: arr
        })
      }

    }
  },
  classchange: function (e) {
    console.log("选择排序类型" + e.detail.value);
    this.setData({
      class: e.detail.value
    })
  },
  directchange: function (e) {
    console.log("选择方向" + e.detail.value);
    this.setData({
      direction: e.detail.value
    })
  },
  data: {
    num: 1,
    type: 0,
    codelist: [],
    usinglist: [],
    copy: "",
    copy2: "",
    now: "",
    ex: false
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
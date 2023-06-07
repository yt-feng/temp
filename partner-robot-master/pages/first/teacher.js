const DEFAULT_PAGE = 0;
const app = getApp()
const {
  getStorageImage
} = require('../onlineim.js')
Page({
  onLoad(options) {
    this.setData({
      teacher: app.globalData.teacher
    })
  },
  startPageX: 0,
  currentView: DEFAULT_PAGE,
  data: {
    url:[getStorageImage("https://mp-e5245a2d-e568-43d9-8bc9-6ace734752d4.cdn.bspapp.com/cloudstorage/fb3d4416-32d4-4d0e-8074-1233e9c9b275.png"), 
    getStorageImage("https://mp-e5245a2d-e568-43d9-8bc9-6ace734752d4.cdn.bspapp.com/cloudstorage/df9d472b-c36d-49c1-bf6e-8c3aaef1262e.jpeg"), getStorageImage("https://mp-e5245a2d-e568-43d9-8bc9-6ace734752d4.cdn.bspapp.com/cloudstorage/2954a801-1ebd-4f17-9319-341b15b3fb42.png"), getStorageImage("https://mp-e5245a2d-e568-43d9-8bc9-6ace734752d4.cdn.bspapp.com/cloudstorage/b018d780-af84-421c-b710-17a0d399b76d.png"), getStorageImage("https://mp-e5245a2d-e568-43d9-8bc9-6ace734752d4.cdn.bspapp.com/cloudstorage/5c01fe21-9ccc-4a64-9ce0-f334c4e7ee3f.png")],
    teacherl: [
      getStorageImage("https://mp-e5245a2d-e568-43d9-8bc9-6ace734752d4.cdn.bspapp.com/cloudstorage/7c87be8e-b41b-4ca8-9d2e-deace31ff801.png"),
      getStorageImage("https://mp-e5245a2d-e568-43d9-8bc9-6ace734752d4.cdn.bspapp.com/cloudstorage/72286b20-6add-41ae-942d-228d1e4e2a5d.png"),
      getStorageImage("https://mp-e5245a2d-e568-43d9-8bc9-6ace734752d4.cdn.bspapp.com/cloudstorage/7c5fdb0e-8cd3-4dae-9e36-960c509d836c.png")
    ],
    teacherl2: [
      getStorageImage("https://mp-e5245a2d-e568-43d9-8bc9-6ace734752d4.cdn.bspapp.com/cloudstorage/bba1d830-7fd4-4f5a-ad92-b52577f933d0.png"),
      getStorageImage("https://mp-e5245a2d-e568-43d9-8bc9-6ace734752d4.cdn.bspapp.com/cloudstorage/93d25467-6ee2-4f72-8368-e3f9852dae32.png"),
      getStorageImage("https://mp-e5245a2d-e568-43d9-8bc9-6ace734752d4.cdn.bspapp.com/cloudstorage/ca2f441e-8e99-4cb0-8d4f-89310c5a6eea.png")
    ],
    teacherim: [
      getStorageImage("https://mp-e5245a2d-e568-43d9-8bc9-6ace734752d4.cdn.bspapp.com/cloudstorage/daf0abed-1810-459f-93dc-b444916ccb05.png"),
      getStorageImage("https://mp-e5245a2d-e568-43d9-8bc9-6ace734752d4.cdn.bspapp.com/cloudstorage/ee4789d2-08da-4a26-b50d-3c5ff9d52b73.png"),
      getStorageImage("https://mp-e5245a2d-e568-43d9-8bc9-6ace734752d4.cdn.bspapp.com/cloudstorage/9b32446f-bcd1-44d3-9334-e12c93c15325.png")
    ],
    toView: `card_${DEFAULT_PAGE}`,
    list: ['Linda', 'Cindy', 'Alex'],
  },
  start: function () {
  //  const query = wx.createSelectorQuery().in(this);
  //  query.select('#myview').boundingClientRect((res) => {
  //    console.log('view组件中的文本内容为：');
      // wx.setStorage({
      //   key: 'alname',
      //   data:"alis",
      //   success: function (res) {
      //     console.log("保存成功：", res);
      //   },
      //   fail: function (res) {
      //     console.log("保存失败：", res);
      //   }
      // });
      // wx.setStorageSync('alname', 'value');
 // })
 wx.setStorageSync('alname', this.data.list[app.globalData.teacher-1]);
    wx.navigateTo({
      url: '../map/map',
    })
  },

  touchStart(e) {
    this.startPageX = e.changedTouches[0].pageX;
  },
  select: function (e) {
    app.globalData.teacher = e.currentTarget.dataset.index;
    this.setData({
      teacher: e.currentTarget.dataset.index
    });
  },

  butt: function (msg) {
    wx.showToast({
      title: msg,
      icon: 'none',
      duration: 1500,
      success: function () {}
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
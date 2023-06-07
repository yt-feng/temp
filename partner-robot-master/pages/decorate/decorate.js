const DEFAULT_PAGE = 0;
const app = getApp()
const {getStorageImage} = require('../onlineim.js')
Page({
  onLoad(options) {
    this.setData({me:app.globalData.me})
  },
  
  startPageX: 0,
  currentView: DEFAULT_PAGE,
  data: {
    url:[getStorageImage("https://mp-e5245a2d-e568-43d9-8bc9-6ace734752d4.cdn.bspapp.com/cloudstorage/fb3d4416-32d4-4d0e-8074-1233e9c9b275.png"),
    getStorageImage("https://mp-e5245a2d-e568-43d9-8bc9-6ace734752d4.cdn.bspapp.com/cloudstorage/df9d472b-c36d-49c1-bf6e-8c3aaef1262e.jpeg"),getStorageImage("https://mp-e5245a2d-e568-43d9-8bc9-6ace734752d4.cdn.bspapp.com/cloudstorage/2954a801-1ebd-4f17-9319-341b15b3fb42.png"),getStorageImage("https://mp-e5245a2d-e568-43d9-8bc9-6ace734752d4.cdn.bspapp.com/cloudstorage/b018d780-af84-421c-b710-17a0d399b76d.png"),getStorageImage("https://mp-e5245a2d-e568-43d9-8bc9-6ace734752d4.cdn.bspapp.com/cloudstorage/5c01fe21-9ccc-4a64-9ce0-f334c4e7ee3f.png")],
    mel: [
      getStorageImage("https://mp-e5245a2d-e568-43d9-8bc9-6ace734752d4.cdn.bspapp.com/cloudstorage/3ef6e95e-c794-4d3a-9573-dc7ed1b4af5a.png"),
      getStorageImage("https://mp-e5245a2d-e568-43d9-8bc9-6ace734752d4.cdn.bspapp.com/cloudstorage/fb0f3ae0-44d4-4cef-b60e-14ae6d388439.png"),
      getStorageImage("https://mp-e5245a2d-e568-43d9-8bc9-6ace734752d4.cdn.bspapp.com/cloudstorage/ba51957a-7623-42ea-bef0-ee9516e590f6.png")
        ],
        mel2:[getStorageImage("https://mp-e5245a2d-e568-43d9-8bc9-6ace734752d4.cdn.bspapp.com/cloudstorage/ac0b8607-91d8-4b5a-a500-43fe62d12a3d.png"),
        getStorageImage("https://mp-e5245a2d-e568-43d9-8bc9-6ace734752d4.cdn.bspapp.com/cloudstorage/c200f745-dfed-4099-a3d3-a14ee4067336.png"),
        getStorageImage("https://mp-e5245a2d-e568-43d9-8bc9-6ace734752d4.cdn.bspapp.com/cloudstorage/3e86518f-77d4-4bfe-b539-5b0c1391445a.png")],

				meim: [getStorageImage("https://mp-e5245a2d-e568-43d9-8bc9-6ace734752d4.cdn.bspapp.com/cloudstorage/bb792341-1557-4e49-87ff-620274ed0dd5.png"),
        getStorageImage("https://mp-e5245a2d-e568-43d9-8bc9-6ace734752d4.cdn.bspapp.com/cloudstorage/303fdaf2-76c1-4e91-95d2-77177409cdd4.png"),
        getStorageImage("https://mp-e5245a2d-e568-43d9-8bc9-6ace734752d4.cdn.bspapp.com/cloudstorage/ec41bd23-00f2-46db-b8d3-7931d70ce2ae.png")
				],
    toView: `card_${DEFAULT_PAGE}`,
    list: ['Tom', 'Eric', "Kate"],
  },
  start: function () {
    this.butt("已选定旅伴");
    wx.setStorageSync('username', this.data.list[app.globalData.me-1]);
    wx.navigateBack({
      delta: 1
    })
  },
  back: function () {
    wx.navigateBack({
      delta: 1
    })
  },
  touchStart(e) {
    this.startPageX = e.changedTouches[0].pageX;
  },
select:function(e){
  app.globalData.me = e.currentTarget.dataset.index
  this.setData({me:e.currentTarget.dataset.index})
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

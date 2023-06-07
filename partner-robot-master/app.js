App({
  globalData: {
    host: 'https://chatgpt.fguo.com', //连接阿里云计算触发器
    teacher: 1, //设置teacher,影响chat界面的图标和人物语音
    me: 1, //设置用户角色，影响
    map: 1, //设置地图，影响聊天背景
    speed:0,
    vip: 0, //vip天数，云端获取VIP截至日期，然后在本地计算，控制能否进入聊天界面
    othervip: 0, //vip天数，云端获取VIP截至日期，然后在本地计算，控制能否进入聊天界面
    vipend: 3, //VIP截至日期
    othervipend:Date.now(),//另一个VIP截至日期
    vipstart: 3, //vip订购日期
    othervipstart: 3, //另一个vip订购日期
    day: 0, //坚持天数，每次进入聊天界面时通过本地缓存计算
    lv: "尚未获得", //勋章
    openid: "", //用户标识符
    name: "冒险者",
    list: "尚未上榜", //排名
    type:0,
    points:0,
    mode:1,
    Avatar:"https://videool.oss-cn-beijing.aliyuncs.com/45245ff8ffaaa1fbc9e2cdc037d3ba08.jpg",
    URL: "wss://nls-gateway.cn-shanghai.aliyuncs.com/ws/v1",
    APPKEY:"8pgX80WntL1sz3yh",
    A:["LTAI5tFDH9mJZ5QU2ErqFjm5", "FwV11XpxwrRYpEAwtUWiDSnQsPKqha", "8pgX80WntL1sz3yh", "4GDAcxQXjEWEG0Kp"],
    B:["LTAI5t6xiBoknf5WaRioLUvR", "4Xk8gP69IiY6yB7lHOqLTRBOFlEk59", " gzO3iSdas1ppDEiK", "4fnlQejrVNSpVZFF"],
    C:["LTAI5tKHmk3ppwVMSWMzTQ8U", "2GOUWvxOSPZqtI0CgEw7YpT7gp1M3c", "AyoFdg1ojHuTJJgs", "K74hLkjefjNh983x"],
    D:["LTAI5tKHmk3ppwVMSWMzTQ8U", "2GOUWvxOSPZqtI0CgEw7YpT7gp1M3c", "AyoFdg1ojHuTJJgs", "K74hLkjefjNh983x"],
    E:[],
    mapl:["",
    "https://mp-e5245a2d-e568-43d9-8bc9-6ace734752d4.cdn.bspapp.com/cloudstorage/8f898050-f8ff-4a37-acc4-3d75d7e383b4.mp4",
    "https://mp-e5245a2d-e568-43d9-8bc9-6ace734752d4.cdn.bspapp.com/cloudstorage/1252c48b-c218-4327-a700-80e2bc13da93.mp4",
    "https://mp-e5245a2d-e568-43d9-8bc9-6ace734752d4.cdn.bspapp.com/cloudstorage/c23090c8-c3c4-43a2-91ce-7cd4e4f05567.mp4",
    "https://mp-e5245a2d-e568-43d9-8bc9-6ace734752d4.cdn.bspapp.com/cloudstorage/9e1df43e-97b1-4c76-b61f-705f2ebba07d.mp4",
    "https://mp-e5245a2d-e568-43d9-8bc9-6ace734752d4.cdn.bspapp.com/cloudstorage/357efc89-9e98-4371-81d3-7d28ff4197a9.mp4",
    "https://mp-e5245a2d-e568-43d9-8bc9-6ace734752d4.cdn.bspapp.com/cloudstorage/05268fda-66da-4316-90ae-0d6a65f05957.mp4",
    "https://mp-e5245a2d-e568-43d9-8bc9-6ace734752d4.cdn.bspapp.com/cloudstorage/192f903d-3966-4730-b5d5-7c941883db39.mp4",
    "https://mp-e5245a2d-e568-43d9-8bc9-6ace734752d4.cdn.bspapp.com/cloudstorage/d811f703-de5a-4d06-9771-70c8cd45a81a.mp4",
    "https://mp-e5245a2d-e568-43d9-8bc9-6ace734752d4.cdn.bspapp.com/cloudstorage/740f21e4-3b6d-4e85-a1cb-70beac0b6bd8.mp4",
    "https://mp-e5245a2d-e568-43d9-8bc9-6ace734752d4.cdn.bspapp.com/cloudstorage/5038d79b-97bf-4e29-9147-8d80b02e7839.mp4",
    "https://mp-e5245a2d-e568-43d9-8bc9-6ace734752d4.cdn.bspapp.com/cloudstorage/5ab58e1c-5a4e-45a0-ba2d-6f673ddd4f90.mp4"]
  },

  onLaunch: function () {

    wx.getSetting({
      success(res) {
        if (!res['scope.record']) {
          wx.authorize({
            scope: 'scope.record'
          })
        }
        if (!res['scope.userInfo']) {
          wx.authorize({
            scope: 'scope.userInfo'
          })
        }
      }
    });
  }

})
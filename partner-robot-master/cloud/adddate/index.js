// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  //插入数据

  return await db.collection('user').add ({
    data: {
      openid:event.openid,
      nickname: event.nickname,
      vip: event.vip,
      day: event.day,
      vipstart:event.startday,
      vipend:event.endday,
      type:event.type,
      points:event.points
    }
  })  
}

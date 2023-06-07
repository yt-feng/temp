// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  let chat = event.detail;
  let date = event.date
  let openid = event.openid
  let info = event.info
  db.collection('user_chat_data').add({
    data:{
      date:date,
      chat:chat,
      openid:openid,
      info:info
    }

  })
}
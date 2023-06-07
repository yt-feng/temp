// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  var check = event.code ? event.code : "" ;  //默认为空，格式 
  let filter = {code:check}
  return await db.collection('agent').where( filter ).get()
  
}
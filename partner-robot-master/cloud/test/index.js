// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境
// 云函数入口函数
exports.main = async (event, context) => {
  db.collection("agent").where({code:"c4ca4238a0b"}).update({data:{fee:0}})
}
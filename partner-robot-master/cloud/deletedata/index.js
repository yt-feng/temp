// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  var filter = event.filter ? event.filter : {} ;  //默认为空，格式 {key:'values'}  

  try {
    return await db.collection("user").where(filter).remove( )
  } catch(err) {
    console.log(err);
  }
}


// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

// 云函数入口函数
exports.main = async (event, context) => {
  var filter = {_id:"93e4b6a0643ffd11094f7f0b531049bd"}

  let sum = await db.collection('ali').where( filter ).get()
  await db.collection("ali").where(filter).update({
    data:{sumuser:sum.data[0].sumuser+1}
  }) 

  return  await sum//查询数据并返回给前端  

}
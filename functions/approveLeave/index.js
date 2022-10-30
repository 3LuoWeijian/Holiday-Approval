// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database();
// 云函数入口函数
exports.main = async (event, context) => {
  const db = cloud.database();
  const wxContext = cloud.getWXContext()

  return await db.collection('leave').doc(event.index_id)
  .update({
    data:{
      pass_fdy:event.pass_fdy
    }
  })
}







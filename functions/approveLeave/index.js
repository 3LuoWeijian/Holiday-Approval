// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database();
// 云函数入口函数
exports.main = async (event, context) => {
  const db = cloud.database();
  const wxContext = cloud.getWXContext()

/*   return await db.collection('leave').doc(event.index_id)
  .update({
    data:{
      pass_fdy:event.pass_fdy
    }
  }) */
  if (event.state == 'agree') {
    return await db.collection('leave').doc(event.index_id)
      .update({
        data: {
          pass_fdy: event.pass_fdy,
          pass_xsc:event.pass_xsc,
          pass_xy:event.pass_xy,
          advice:event.advice,
          checkState:true,
        }
      })
      
  }
  if (event.state == 'reject') {
    return await db.collection('leave').doc(event.index_id)
      .update({
        data: {
          rejectedState: event.rejectedState,
          advice:event.advice,
          checkState:true,
        }
      })
      
  }
}







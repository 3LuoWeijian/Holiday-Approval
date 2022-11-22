// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'cloud1-3g2hjwqc511b3694'
}) // 使用当前云环境

// 云函数入口函数
exports.main = async (event, context) => {
  const db = cloud.database();
  const wxContext = cloud.getWXContext()

  if (event.state == 'agree') {
    return await db.collection('BackRequest').doc(event.index_id)
      .update({
        data: {
          pass_fdy: event.pass_fdy,
          submitState:event.submitState
        }
      })
  }
  if (event.state == 'reject') {
    return await db.collection('BackRequest').doc(event.index_id)
      .update({
        data: {
          rejectedState: event.rejectedState,
          submitState:event.submitState
        }
      })
  }

}
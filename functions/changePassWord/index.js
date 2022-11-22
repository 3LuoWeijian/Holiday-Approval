// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'cloud1-3g2hjwqc511b3694'
})
const db = cloud.database();
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  if(event.people=='teacher')
  {
    return await db.collection("teacher").where({
      sno:event.sno
    }).update({
        data: {
         passWord:event.passWord
        }
      })
  }
  else
  {
    return await db.collection("student").where({
      sno:event.sno
    })
      .update({
        data: {
         passWord:event.passWord
        }
      })

  }
  
}
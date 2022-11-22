// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'cloud1-3g2hjwqc511b3694'
})
const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  if(event.people=='student')
  {
    return await db.collection("advice")
    .add({
      data: {
        reason:event.reason,
        academy:event.academy,
        sno:event.sno,
        name:event.stu_name,
        class:event.class,
        people:event.people
        
      }
    })

  }
  else
  {
    return await db.collection("advice")
    .add({
      data: {
        reason:event.reason,
        academy:event.academy,
        sno:event.sno,
        name:event.tch_name,
        people:event.people
        
      }
    })

  }
  
}
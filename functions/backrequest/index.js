// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database();
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  return await db.collection("BackRequest")
    .add({
      data: {
        stu_name:event.stu_name,
        sno:event.sno,
        class:event.class,
        academy:event.academy,
        phone:event.phone,    
        region:event.region,
        stu_type: event.stu_type,
        Date: event.Date,
        date: event.date,
        campus: event.campus,
        conveyance:event.conveyance,
        timeofconveyance:event.timeofconveyance,
        inresidence :event.inresidence,
        pass_fdy:event.pass_fdy,
        pass_jwc:event.pass_jwc,
        pass_sj:event.pass_sj,
      }
    })

}
// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({env: 'cloud1-3g2hjwqc511b3694'})
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
        riskRegion:event.riskRegion,
        stu_type: event.stu_type,
        setDate: event.setDate,
        arriveDate: event.arriveDate,
        subDate:event.subDate,
        campus: event.campus,
        conveyance:event.conveyance,
        timeofconveyance:event.timeofconveyance,
        inresidence:event.inresidence,
        pass_fdy:event.pass_fdy,
        pass_jwc:event.pass_jwc,
        pass_sj:event.pass_sj,
        fdy_name:event.fdy_name,
        rejectedState:event.rejectedState,
        newImgList:event.newImgList,
      }
    })

}
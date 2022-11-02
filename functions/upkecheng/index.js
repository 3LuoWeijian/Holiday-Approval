// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database();
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  return await db.collection("kecheng")
    .add({
      data: {
        stu_name:event.stu_name,
        class:event.class,
        academy: event.academy,
        absenceDate: event.absenceDate,
        absenceReason: event.absenceReason,
        lessonName:event.lessonName,
        lessonTime:event.lessonTime,
        teacherName:event.teacherName,
        subDate:event.subDate,
        studentClass:event.studentClass,
        campusClass:event.campusClass,
        sno:event.sno,
        pass_fdy:event.pass_fdy,
        rejectedState:event.rejectedState
        //approveState: 0,
      }
    })
}
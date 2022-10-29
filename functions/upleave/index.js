// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database();
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  return await db.collection("leave")
    .add({
      data: {
        stu_name: event.stu_name,
        sno: event.sno,
        class: event.class,
        academy: event.academy,

        pass_fdy: event.pass_fdy,
        pass_jwc: event.pass_jwc,
        pass_sj: event.pass_sj,
        submitState: event.submitState,


        leaveClass: event.leaveClass,
        region: event.region,
        leaveDate: event.leaveDate,
        leaveReason: event.leaveReason,
        returnDate: event.returnDate,
        subDate: event.subDate,
        studentClass: event.studentClass,
        campusClass: event.campusClass,

        //approveState: 0,
      }
    })
}
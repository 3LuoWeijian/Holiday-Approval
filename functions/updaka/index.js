// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  return await db.collection("daka")
    .add({
      data: {
        subDate:event.subDate,
        stu_name:event.stu_name,
        sno:event.sno,
        class:event.class,
        academy:event.academy,
        phone:event.phone,
        fdy:event.fdy,
        region:event.region,
        region1:event.region1,
        OutsideClass:event.OutsideClass,
        SelfHealthClass:event.SelfHealthClass,
        ReportClass:event.ReportClass,
        HealthClass:event.HealthClass,
        FamilyClass:event.FamilyClass,
        BoolFamilyClass:event.BoolFamilyClass,
        Bool1Class:event.Bool1Class,
        Bool2Class:event.Bool2Class,
        Bool3Class:event.Bool3Class,
        BoolgreenClass:event.BoolgreenClass,
        Keyregion:event.Keyregion,
        Vaccine:event.Vaccine,
        Vaccinecounts:event.Vaccinecounts,
        Supplier:event.Supplier,
        InoculateDate:event.InoculateDate,
      }
    })
}
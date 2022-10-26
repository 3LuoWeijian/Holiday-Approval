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
        name:event.name,
        sno:event.sno,
        class:event.class,
        academy:event.academy,
        phone:event.phone,
        msg:event.msg,
        OutsideClassItems:event.OutsideClassItems,
        SelfHealthClassItems:event.SelfHealthClassItems,
        ReportClassItems:event.ReportClassItems,
        HealthClassItems:event.HealthClassItems,
        FamilyClassItems:event.FamilyClassItems,
        BoolFamilyClassItems:event.BoolFamilyClassItems,
        Bool1ClassItems:event.Bool1ClassItems,
        Bool2ClassItems:event.Bool2ClassItems,
        Bool3ClassItems:event.Bool3ClassItems,
        BoolgreenClassItems:event.BoolgreenClassItems,
        KeyregionItems:event.KeyregionItems,
        VaccineItems:event.VaccineItems,
        VaccinecountsItems:event.VaccinecountsItems,
        SupplierItems:event.SupplierItems,
      }
    })
}
// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境
const db = wx.cloud.database();
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  return await db.collection("BackRequest")
    .add({
      data: {    
        region:event.region,
        type: event.type,
        Date: event.Date,
        date: event.data,
        campus: event.campus,
        conveyance:event.conveyance,
        timeofconveyance:event.timeofconveyance,
        inresidence :event.inresidence,
        sno:event.sno,
      }
    })

}
// app.js
App({
  appData: {
    _id: null,
    stu_name: null,
    class: null,
    sno: 'null',
    academy: null,
    phone: null,
    userName: null,
    passWord: null,
    userInfo: null,
    people: "student",
    leavepeople: null,
    dakapeople: null,
    tch_name: null,
    tch_type: null,
    leaveSubmitState: null,
    backSubmitState: null,

  },
  onLaunch: function () {
    if (!wx.cloud) {
      console.error('使用更高的基础库')
    } else {
      wx.cloud.init({
        env: 'cloud1-3g2hjwqc511b3694',
        traceUser: true,
      })
    }
    let token = wx.getStorageSync('token')
    console.log(token.sno)
    db.collection('student').where({
        sno: token.sno
      })
      .get({
        success: function (res) {
          app._id = res.data[0]._id
          app.class = res.data[0].class
          app.stu_name = res.data[0].stu_name
          app.sno = res.data[0].sno
          app.academy = res.data[0].academy
          app.phone = res.data[0].phone
          app.passWord = res.data[0].passWord
          wx.reLaunch({
            url: '../main/main',
          })
          console.log('here')
        }
      })
      
    this.globalData = {}
  }
})
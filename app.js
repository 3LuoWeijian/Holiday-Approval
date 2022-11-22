// app.js
App({
  appData: {
    stu_name: null,
    class: null,
    sno: 'null',
    academy: null,
    phone: null,
    userName:null,
    passWord:null,
    userInfo: null,
    people: "student",
    leavepeople: null,
    dakapeople: null,
    tch_name: null,
    tch_type: null,
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
    this.globalData = {}
  }
})
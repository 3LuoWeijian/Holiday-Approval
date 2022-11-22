// app.js
App({
  appData: {
    _id:null,
    stu_name: null,
    class: null,
    sno: 'null',
    academy: null,
    phone: null,
    userinfo: null,
    people: "student",
    leavepeople: null,
    dakapeople: null,
    tch_name: null,
    tch_type: null,
    leaveSubmitState:null,
    
    backSubmitState:null,
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
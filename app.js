// app.js
wx.cloud.init()
const db = wx.cloud.database();

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
<<<<<<< HEAD
=======

>>>>>>> 18f71a72837f7eced68e10696c7dd1583246b481
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


    var userInfo = wx.getStorageSync('userInfo')
    console.log('首页加载完毕', userInfo)
    if (userInfo.people == 'student') {
      wx.showLoading()
      var that = this;
      db.collection('student').where({
        sno: userInfo.sno,
        passWord: userInfo.passWord
      }).get({
        success: function () {
          that.appData._id = userInfo._id
          that.appData.class = userInfo.class
          that.appData.stu_name = userInfo.stu_name
          that.appData.sno = userInfo.sno
          that.appData.academy = userInfo.academy
          that.appData.phone = userInfo.phone
          that.appData.passWord = userInfo.passWord
          that.appData.people = userInfo.people
          wx.redirectTo({
            url: '/pages/main/main',
          })
        }

      })
    }
    if (userInfo.people == 'teacher') {
      wx.showLoading()
      var that = this;
      db.collection('teacher').where({
        sno: userInfo.sno,
        passWord: userInfo.passWord
      }).get({
        success: function () {
          that.appData.tch_type = userInfo.tch_type
          that.appData.tch_name = userInfo.tch_name
          that.appData.sno = userInfo.sno
          that.appData.academy = userInfo.academy
          that.appData.phone = userInfo.phone
          that.appData.passWord = userInfo.passWord
          that.appData.people = userInfo.people

          wx.switchTab({
            url: '../check/check',
          })
        }

      })
    }
  }

})
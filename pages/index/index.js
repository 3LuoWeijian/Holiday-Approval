// pages/index/index.js
var app = getApp().appData;
const db = wx.cloud.database();
var that = this;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userName: null,
    passWord: null,
    current: 1,
  },
  // 登陆注册监听
  click(e) {
    let index = e.currentTarget.dataset.code;
    this.setData({
      current: index
    })
    console.log(e.currentTarget.dataset.value)
    app.people = e.currentTarget.dataset.value
  },

  /** 
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    app.people = 'student'
  },
  usernameInput: function (event) {
    console.log(event.detail.value)
    this.setData({
      userName: event.detail.value
    })
  },
  passwordInput: function (e) {
    console.log(e.detail.value)
    this.setData({
      passWord: e.detail.value
    })
  },

  loginbtnInput: function () {
    if (app.people == 'student') {
      var passWord = this.data.passWord
      db.collection('student').where({
          sno: this.data.userName,
        })
        .get({
          success: function (res) {
            console.log('成功进入', passWord);
            if (res.data.length == 1 && passWord == res.data[0].passWord) {
              app._id = res.data[0]._id
              app.class = res.data[0].class
              app.stu_name = res.data[0].stu_name
              app.sno = res.data[0].sno
              app.academy = res.data[0].academy
              app.phone = res.data[0].phone
              app.passWord = res.data[0].passWord

              wx.setStorageSync('userInfo', app)

              wx.reLaunch({
                url: '../main/main',
              })
              wx.vibrateLong();
              } else {
                wx.showToast({
                  title: '账号或密码错误！',
                  icon: 'none'
                })
            }


          },
        })
    }
    if (app.people == 'teacher') {
      var passWord = this.data.passWord
      db.collection('teacher').where({
          sno: this.data.userName,
        })
        .get({
          success: function (res) {
            console.log('成功进入', res);
            if (res.data.length == 1 && passWord == res.data[0].passWord) {
              app.tch_type = res.data[0].tch_type
              app.tch_name = res.data[0].tch_name
              app.sno = res.data[0].sno
              app.academy = res.data[0].academy
              app.phone = res.data[0].phone
              app.passWord = res.data[0].passWord

              wx.setStorageSync('userInfo', app)
              console.log(app.tch_type)
              
              wx.switchTab({
                url: '../check/check',
              })

              wx.vibrateLong();
            } else {
              wx.showToast({
                title: '账号或密码错误！',
                icon: 'none'
              })
            }


          },
        })
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */

  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})
// pages/index/index.js
var app = getApp().appData;
const db = wx.cloud.database();
var that = this;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: null,
    password: null,
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
      username: event.detail.value
    })
  },
  passwordInput: function (event) {
    console.log(event.detail.value)
    this.setData({
      password: event.detail.value
    })
  },
  loginbtnInput: function () {
    app.userinfo = {
      username: this.data.username,
      password: this.data.password
    };
    if (app.people == 'student') {
      
      db.collection('student').where({
          sno: this.data.username,
          passWord: this.data.password,
        })
        .get({
          success: function (res) {
            console.log('成功', res);
            if (res.data.length == 1) {
              app.class = res.data[0].class
              app.stu_name = res.data[0].stu_name
              app.sno = res.data[0].sno
              app.academy = res.data[0].academy
              app.phone = res.data[0].phone

              wx.getUserProfile({
                desc: '完善用户信息',
                success: res => {
                  console.log('ok', res.userInfo);
                  let user = res.userInfo
                  //缓存用户信息到本地
                  wx.setStorageSync('user', user)
                  app.userInfo = user
                  if (app.people == 'student') {
                    wx.reLaunch({
                      url: '../main/main',
                    })
                  }
                },
                fail: res => {
                  console.log('fail', res)
                }
              })

              if (app.people == 'student') {
                wx.reLaunch({
                  url: '../main/main',
                })
              } else {
                wx.switchTab({
                  url: '../check/check',
                })
              }
              wx.vibrateLong();
            } else {
              wx.showToast({
                title: '账号或密码错误！',
              })
            }


          },
        })
    }
    if (app.people == 'teacher') {
    
      db.collection('teacher').where({
          sno: this.data.username,
          passWord: this.data.password,
        })
        .get({
          success: function (res) {
            console.log('成功', res);
            if (res.data.length == 1) {
              app.tch_type = res.data[0].tch_type
              app.tch_name = res.data[0].tch_name
              app.sno = res.data[0].sno
              app.academy = res.data[0].academy
              app.phone = res.data[0].phone

              wx.getUserProfile({
                desc: '完善用户信息',
                success: res => {
                  console.log('ok', res.userInfo);
                  let user = res.userInfo
                  //缓存用户信息到本地
                  wx.setStorageSync('user', user)
                  app.userInfo = user
                  if (app.people == 'student') {
                    wx.reLaunch({
                      url: '../main/main',
                    })
                  }
                },
                fail: res => {
                  console.log('fail', res)
                }
              })

             
                wx.switchTab({
                  url: '../check/check',
                })
              
              wx.vibrateLong();
            } else {
              wx.showToast({
                title: '账号或密码错误！',
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
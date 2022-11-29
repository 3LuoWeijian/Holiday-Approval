// pages/my/my.js
const db = wx.cloud.database();
var that = this;
const app = getApp().appData;
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl: defaultAvatarUrl,
    name: null,
  },

  onLoad() {
    var a = wx.getStorageSync('avatarUrl')

    if (a != null) {
      console.log('here')
      this.setData({
        name: app.tch_name,
        avatarUrl: a.avatarUrl
      })
    } else {
      this.setData({
        name: app.tch_name
      })
    }
<<<<<<< HEAD

=======
  },
  //授权登录
   getUserProfile(e){
    wx.getUserProfile({
      desc: '完善用户信息',
      success:res=>{
        console.log('ok',res.userInfo)
        let user = res.userInfo
        //缓存用户信息到本地
        wx.setStorageSync('user', user)
        user.nickName = app.tch_name
        this.setData({
          userInfo:user,
        })
      },
      fail:res=>{
        console.log('fail',res)
      }
      
    })
>>>>>>> 18f71a72837f7eced68e10696c7dd1583246b481

  },

  //跳转到我的信息
  getmyinfo: function () {
    wx.navigateTo({
      url: '/pages/my-info/my-info',
    })
  },
  bindAdvice: function () {
    wx.navigateTo({
      url: '/pages/advice/advice',
    })
  },
  Changepassword: function () {
    wx.navigateTo({
      url: '/pages/Changepassword/Changepassword',
    })
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
  this.onLoad()
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
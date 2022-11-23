// pages/my-info/my-info.js
const app = getApp().appData;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '无',
    class: '无',
    sno: '无',
    phone: '无',
    academy: '无'
  },
  outLogin() {
    wx.setStorageSync('user', null)
    wx.reLaunch({
      url: '/pages/index/index',
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    if (app.people == 'student') {
      this.setData({
        name: app.stu_name,
        class: app.class,
        sno: app.sno,
        phone: app.phone,
        academy: app.academy
      })
    }
    if (app.people == 'teacher') {
      this.setData({
        name: app.tch_name,
        sno: app.sno,
        phone: app.phone,
        academy: app.academy
      })
    }

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },
  changePassWord(){
    wx.navigateTo({
      url: '/pages/Changepassword/Changepassword',
    })

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
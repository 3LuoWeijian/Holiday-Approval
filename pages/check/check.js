// pages/check/check.js


var app=getApp().appData;
const db = wx.cloud.database();
Page({
  onShareAppMessage: function (res) {
    return {
      title: 'ECharts 可以在微信小程序中使用啦！',
      path: '/pages/index/index',
      success: function () { },
      fail: function () { }
    }
  },

  /**
   * 页面的初始数据
   */
  data: {
    type:app.tch_type,
  },

//离校审批
  checkleavefdy(){
    wx.navigateTo({
      url: '/pages/check-leave-fdy/check-leave-fdy',
    })
  },
  //离校审批
  checkleavexy(){
    wx.navigateTo({
      url: '/pages/check-leave-xy/check-leave-xy',
    })
  },

  checkleavexsc(){
    wx.navigateTo({
      url: '/pages/check-leave-xsc/check-leave-xsc',
    })
  },
  

  //课程请假审批
  checkKeCheng(){
    wx.navigateTo({
      url: '/pages/check-kecheng/check-kecheng',
    })
  },
  //返校审批
  getCheckback(){
    wx.navigateTo({
      url: '/pages/check-back/check-back',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      type:app.tch_type,
    })
    console.log(this.data.type)
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
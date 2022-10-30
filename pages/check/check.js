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

  },


  checkleave(){
    wx.navigateTo({
      url: '/pages/check-leave/check-leave',
    })
  },
  kejiashenpi(){
    wx.navigateTo({
      url: '/pages/kejiashenpi/kejiashenpi',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

    
    

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
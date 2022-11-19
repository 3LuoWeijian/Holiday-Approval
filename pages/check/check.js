// pages/check/check.js

var app=getApp().appData;

Page({
  onShareAppMessage: function (res) {
    return {
      title: 'ECharts 可以在微信小程序中使用啦！',
      path: '/pages/index/index',
      success: function () { },
      fail: function () { },
      leavepeople:''
    }
    
  },





  /**
   * 页面的初始数据
   */
  data: {
leavepeople:'null'
  },

  echarts1(){
    wx.navigateTo({
      url: '/pages/L-echarts/L-echarts',
    })
  },
  echarts2(){
    wx.navigateTo({
      url: '/pages/D-echarts/D-echarts',
    })
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
    const db = wx.cloud.database()
    db.collection('leave').where({
      pass_fdy:true
      }).get(
        {
          success:res=>{
            console.log('数据',res)
            this.setData({
            leavepeople:res.data.length
            })
          }
        }
      )
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
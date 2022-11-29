// pages/check/check.js

var app = getApp().appData;
const db = wx.cloud.database()
var util = require('util.js')
Page({
  onShareAppMessage: function (res) {
    return {
      title: 'ECharts 可以在微信小程序中使用啦！',
      path: '/pages/index/index',
      success: function () {},
      fail: function () {},
      leavepeople: '',
      dakapeople: ''
    }

  },

  /**
   * 页面的初始数据
   */
  data: {
    leavepeople: 'null',
    dakapeople: 'null',
    type:null,
  },

  echarts1() {
    app.leavepeople = this.data.leavepeople
    wx.navigateTo({
      url: '/pages/L-echarts/L-echarts',
    })
  },
  echarts2() {
    app.dakapeople = this.data.dakapeople
    wx.navigateTo({
      url: '/pages/D-echarts/D-echarts',
    })
  },
  checkleavefdy() {
    wx.navigateTo({
      url: '/pages/check-leave-fdy/check-leave-fdy',
    })
  },
  checkleavexy() {
    wx.navigateTo({
      url: '/pages/check-leave-xy/check-leave-xy',
    })
  },
  checkleavexsc() {
    wx.navigateTo({
      url: '/pages/check-leave-xsc/check-leave-xsc',
    })
  },
  checkKeCheng() {
    wx.navigateTo({
      url: '/pages/check-kecheng/check-kecheng',
    })
  },
  checkBack(){
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
    var today = util.formatDay(new Date())
    db.collection('leave').where({
        pass_xsc: true,
        fdy_name:app.tch_name
      }).get({
        success: res => {
          console.log('数据', res)
          this.setData({
            leavepeople: res.data.length
          })

        }
      }),

      db.collection('daka').where({
        subDate: today,
        fdy_name:app.tch_name
      }).get({
        success: res => {
          console.log('数据2', res)
          this.setData({
            dakapeople: res.data.length
          })
        }
      })
  },

  onRefresh:function(){
    //导航条加载动画
    wx.showNavigationBarLoading()
    //loading 提示框
    
    this.onLoad()
    wx.showLoading({
      title: 'Loading...',
    })
    
    console.log("下拉刷新啦");
    setTimeout(function () {
      wx.hideLoading();
      wx.hideNavigationBarLoading();
      //停止下拉刷新
      wx.stopPullDownRefresh();
    }, 200)

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh:function(){
    this.onRefresh();
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
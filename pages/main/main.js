// pages/main/main.js
const db = wx.cloud.database();
var that = this;
const app= getApp().appData;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:null,
    isLogin:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:function(options) {
    wx.hideHomeButton()
    let user=wx.getStorageSync('user')
    console.log('用户',user)
    this.setData({
    userInfo:user,
    })
    
    if (wx.getUserProfile) {
      this.setData({
        isLogin:true
      })
    }
    this.onLoad(_options)
  },
  //授权登录
  getUserProfile(e){
    wx.getUserProfile({
      desc: '完善用户信息',
      success:res=>{
        console.log('ok',res.userInfo);
        let user =res.userInfo
        //缓存用户信息到本地
        wx.setStorageSync('user', user)
        this.setData({
          userInfo:user,
        })
      },
      fail:res=>{
        console.log('fail',res)
      }
    })

  },
//退出登录
outLogin(){
  this.setData({
    userInfo:'',
  })
  wx.setStorageSync('user', null)
},
  //离校申请
  Leave(){
    wx.navigateTo({
      url: '/pages/leave/leave',
    })
  },
  //返校申请
  BackRequest(){
    wx.navigateTo({
      url: '/pages/BackRequest/BackRequest',
    })
  },
//课程请假
Kecheng(){
  wx.navigateTo({
    url: '/pages/kecheng/kecheng',
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
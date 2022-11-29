// pages/my-info/my-info.js
const app = getApp().appData;
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl: defaultAvatarUrl,
    name: '无',
    class: '无',
    sno: '无',
    phone: '无',
    academy: '无',
    people:app.people
  },

  //选择头像
  onChooseAvatar(e) {
    const { avatarUrl } = e.detail 
    this.setData({
      avatarUrl,
    })
    console.log(e)
    wx.setStorageSync('avatarUrl', e.detail)
  },

  outLogin() {
    wx.setStorageSync('userInfo', null)
    wx.setStorageSync('avatarUrl', null)
    wx.reLaunch({
      url: '/pages/index/index',
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var a = wx.getStorageSync('avatarUrl')
    console.log('打印',a)
    if(a!=null)
    {
      if (app.people == 'student') {
        this.setData({
          name: app.stu_name,
          class: app.class,
          sno: app.sno,
          phone: app.phone,
          academy: app.academy,
          avatarUrl:a.avatarUrl
        })
      }
      if (app.people == 'teacher') {
        this.setData({
          name: app.tch_name,
          sno: app.sno,
          phone: app.phone,
          academy: app.academy,
          avatarUrl:a.avatarUrl
        })
      }
    }
    else{
      if (app.people == 'student') {
        this.setData({
          name: app.stu_name,
          class: app.class,
          sno: app.sno,
          phone: app.phone,
          academy: app.academy,
        })
      }
      if (app.people == 'teacher') {
        this.setData({
          name: app.tch_name,
          sno: app.sno,
          phone: app.phone,
          academy: app.academy,
        })
      }
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
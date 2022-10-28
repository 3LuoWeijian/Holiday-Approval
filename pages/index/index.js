// pages/index/index.js
var app=getApp().appData;
const db = wx.cloud.database();
var that = this;
Page({

  /**
   * 页面的初始数据
   */
  data:{
    username:null,
    password:null,
    item:[
      {value:"student", name:"我是学生", checked:"true"},
      {value:"teacher", name:"我是老师"}		
    ]
  },

  radioChange:function(e){
	  console.log(e.detail.value)
	  app.people = e.detail.value

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    app.people = 'student'
  },
  usernameInput: function (event) {
    this.setData({
      username:event.detail.value
    })
  },
  passwordInput:function(event){
    this.setData({
      password:event.detail.value
    })
  },
  loginbtnInput:function(){
    app.userinfo = { username: this.data.username, password: this.data.password };
    db.collection('student').where({
      sno:this.data.username,
    })
    .get({
      success:function(res){
        console.log(res);
        app.class = res.data[0].class
        app.name = res.data[0].stu_name
        app.sno = res.data[0].sno
        app.academy = res.data[0].academy
        app.phone = res.data[0].phone
      }
    });
    wx.getUserProfile({
        desc: '完善用户信息',
        success:res=>{
          console.log('ok',res.userInfo);
          let user =res.userInfo
          //缓存用户信息到本地
          wx.setStorageSync('user', user)
          app.userInfo = user
          if(app.people=='student')
          {
            wx.reLaunch({
              url: '../main/main',
            })
          }
        },
        fail:res=>{
          console.log('fail',res)
        }
      })
  
    if(app.people=='student')
    {
      wx.reLaunch({
        url: '../main/main',
      })
    }
    else
    {
      wx.switchTab({
      url: '../check/check',
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
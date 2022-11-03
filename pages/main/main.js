// pages/main/main.js
const db = wx.cloud.database();
var that = this;
const app= getApp().appData;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:app.userInfo,
    isLogin:'',
    processData: [{
      name: '申请提交',
      start: '#fff',
      end: '#EFF3F6',
      icon: '/image/check.png'
    },
    {
      name: '辅导员审批',
      start: 'lightblue',
      end: 'lightblue',
      icon: '/image/shenpi.png'
    },
    {
      name: '教务处审批',
      start: '#EFF3F6',
      end: '#EFF3F6',
      icon: '/image/check.png'
    },
    {
      name: '书记审批',
      start: '#EFF3F6',
      end: '#EFF3F6',
      icon: '/image/check.png'
    },
    {
      name: '完成审批',
      start: '#EFF3F6',
      end: '#fff',
      icon: '/image/check.png'
    }],
  },
  //进度条的状态
  setPeocessIcon: function () {
    var index = 1//记录状态为1的最后的位置
    var processArr = this.data.processData
    // console.log("progress", this.data.detailData.progress)
    for (var i = 0; i < this.data.detailData.progress.length; i++) {
      var item = this.data.detailData.progress[i]
      processArr[i].name = item.word
      if (item.state == 1) {
        index = i
        processArr[i].icon = "/image/fankui.png"
        processArr[i].start = "green"
        processArr[i].end = "green"
      } else {
        processArr[i].icon = "/image/delete.png"
        processArr[i].start = "#EFF3F6"
        processArr[i].end = "#EFF3F6"
      }
    }
    processArr[index].icon = "/image/view.png"
    processArr[index].end = "#EFF3F6"
    processArr[0].start = "#fff"
    processArr[this.data.detailData.progress.length - 1].end = "#fff"
    this.setData({
      processData: processArr
    })
  },


  getmyinfo:function(){
    wx.navigateTo({
      url: '/pages/my-info/my-info',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:function(options) {
    wx.hideHomeButton()
    let user=wx.getStorageSync('user')
    console.log('用户',user)
    if(app.stu_name!=null)
    {
      user.nickName = app.stu_name
    }
    console.log('用户',user)
    this.setData({
    userInfo:user,
    })
    
    if (wx.getUserProfile) {
      this.setData({
        isLogin:true
      })
    }
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
        if(app.stu_name!=null)
        {
          user.nickName = app.stu_name
        }
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

//健康打卡
Daka(){
  wx.navigateTo({
    url: '/pages/Daka/Daka',
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
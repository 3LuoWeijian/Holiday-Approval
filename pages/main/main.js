// pages/main/main.js
const db = wx.cloud.database();
var that = this;
const app= getApp().appData;
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl: defaultAvatarUrl,
    name:app.stu_name,
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
      name: '学院审批',
      start: '#EFF3F6',
      end: '#EFF3F6',
      icon: '/image/check.png'
    },
    {
      name: '学生处审批',
      start: '#EFF3F6',
      end: '#EFF3F6',
      icon: '/image/check.png'
    },
    {
      name: '教务处审批',
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
<<<<<<< HEAD
    var avatarUrl = wx.getStorageSync('avatarUrl')
    if(avatarUrl!=null)
=======
    let user=wx.getStorageSync('user')
    console.log('用户123',wx.getStorageSync('user'))
    if(app.stu_name!=null)
>>>>>>> 18f71a72837f7eced68e10696c7dd1583246b481
    {
      this.setData({
        name:app.stu_name,
        avatarUrl:avatarUrl.avatarUrl
      })
    }
    else{
      this.setData({
        name:app.stu_name,
      })
    }
    
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
//意见反馈
advice(){
  wx.navigateTo({
    url: '/pages/advice/advice',
  })
},
//进度查询
progress(){
  wx.navigateTo({
    url: '/pages/progress/progress',
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
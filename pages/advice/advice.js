// pages/main-secondlevel/tousu/tousu.js
const db = wx.cloud.database();
var that = this;
const app = getApp().appData;
Page({
  data: {
    reason:null,
  },
  onLoad: function () {
  },

  input(e){
    console.log(e.detail.value)
    this.setData({
      reason:e.detail.value
    })

  },
  //提交
  bindsumit(){
    wx.showLoading({
      title: '申请提交中...',
      mask: true,
    })
    if(app.people=='student')
    {
      var data={
        reason:this.data.reason,
        people:app.people,
        academy:app.academy,
        sno:app.sno,
        stu_name:app.stu_name,
        class:app.class,
        people:app.people
      }
      
    }
    
    else
    {
      var data={
        reason:this.data.reason,
        people:app.people,
        academy:app.academy,
        sno:app.sno,
        tch_name:app.tch_name,
        people:app.people
      }
    }
    wx.cloud.callFunction({
      name: "upAdvice",
      data: data,
    }).then(res => {
      console.log(res)
      wx.hideLoading()
      wx.showToast({
        title: '提交成功',
        icon: 'success',
        duration: 2000,
        mask: true,

        success: (res) => {

          setTimeout(() => {
            wx.navigateBack({
              delta: 1,
            })
          }, 500);
        }
      })
    })
    .catch(err => {
      wx.showToast({
        title: '提交失败',
        icon: 'none',
        duration: 2000,
        mask: true
      })
      console.log("失败", err)
    })
    wx.vibrateShort()
  
  }

    
})
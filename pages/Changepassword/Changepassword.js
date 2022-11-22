// pages/password/password.js
//获取应用实例
const app = getApp().appData;
const db = wx.cloud.database();
var that = this;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    passWord: null

  },
  formSubmit: function (e) {
    var oldpwd = e.detail.value.oldpwd;
    var newpwd = e.detail.value.newpwd;
    var newpwd2 = e.detail.value.newpwd2;

    if (oldpwd == '' || newpwd == '' || newpwd2 == '') {
      wx.showToast({
        title: '密码不能为空',
        icon: 'none',
        duration: 1000
      })
    } else if (oldpwd != this.data.passWord) {
      wx.showToast({
        title: '原密码错误',
        icon: 'none',
        duration: 1000
      })
    } else if (newpwd != newpwd2) {
      wx.showToast({
        title: '两次密码输入不一致',
        icon: 'none',
        duration: 1000
      })
    } else {
      wx.showLoading({
        title: '修改申请提交中...',
      })
      var data={
        passWord:newpwd,
        people:app.people,
        sno:app.sno
      }

        wx.cloud.callFunction({
          name: "changePassWord",
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



  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      passWord: app.passWord
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
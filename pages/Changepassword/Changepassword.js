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
    passWord:null
 
  },
  formSubmit: function (e) {
    var oldpwd = e.detail.value.oldpwd;
    var newpwd = e.detail.value.newpwd;
    var newpwd2 = e.detail.value.newpwd2;
 
    console.log('777',app.passWord)
    if (oldpwd == '' || newpwd == '' || newpwd2 == '') {
      wx.showToast({
        title: '密码不能为空',
        icon: 'none',
        duration: 1000
      })}
      else if(oldpwd!=this.data.passWord)
    {
      wx.showToast({
        title: '原密码错误',
        icon:'none',
        duration:1000
      })
    }
     else if (newpwd != newpwd2) {
      wx.showToast({
        title: '两次密码输入不一致',
        icon: 'none',
        duration: 1000
      })
    } else {
   
      wx.showLoading({
        title: '网络请求中......',
      })
    }
dbcollection.update({
	data: {
 
    }
}).then(res => {
	console.log('更新成功')
	this.setData({
		number: 2,
		num: 2,
	})
}).catch(err => {
	console.log('更新失败',err)//失败提示错误信息
})

    
  },
 
        /**
         * 生命周期函数--监听页面加载
         */
        onLoad: function (options) {
          this.setData({
            passWord:app.passWord
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
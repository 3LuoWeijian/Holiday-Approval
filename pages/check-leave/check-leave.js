// pages/leavecheck/leavecheck.js

const db = wx.cloud.database();
const app = getApp().appData;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    leaveList: [],


  },


  bindReject(e) {
    //获取该条记录下唯一的_id值
    console.log(this.data.backlist[e.currentTarget.dataset.index]._id)
    db.collection('BackRequest').where({
      id: this.data.backlist[e.currentTarget.dataset.index]._id
    }).update({
      // data 传入需要局部更新的数据
      data: {
        pass_fdy: 'true'
      },
      fail: function (res) {
        console.log(res)
      }
    })

  },


  callApproveFunc(leave, approveState) {
    console.log('leave = ', leave, approveState)
    wx.showLoading({
      title: '审批提交中',
      mask: true
    })
    wx.cloud.callFunction({
        name: 'approveLeave',
        data: {
          //tno: app.globalData.regInfo.tno,
          //leaveId: leave.id,
          pass_fdy: approveState
        }
      })
      .then(res => {
        wx.hideLoading({
          success: (res) => {
            wx.showToast({
              title: '完成审批',
              icon: 'success',
              duration: 500
            })
          },
        })
        console.log('完成审批')
        //更新一下前端界面的上的请假单表
        /* let newList = this.data.leaveList
        newList[leave.idx].approveState = approveState
        newList[leave.idx].approved = 1
        this.setData({
          leaveList: newList
        })
        this.data.skip -= 1
        this.callUpMsg(leave.sno,
          'leave',
          leave.id,
          new Date()) */
      })
      .catch(err => {
        console.error(err)
        wx.hideLoading({
          success: (res) => {
            wx.showToast({
              title: '审批提交失败，请稍候重试',
              icon: 'none',
              duration: 1500,
              mask: true
            })
          },
        })
      })
  },
  rejectBtn(e) {
    console.log(e)
    //this.callApproveFunc(res.currentTarget.dataset, false)
    console.log(this.data)
    
    
  },

  passBtn(res) {
    this.callApproveFunc(res.currentTarget.dataset, true)
    /*  console.log(this.data.leaveList[e.currentTarget.dataset.index]._id) */
  },

  onLoad(options) {
    let that = this
    db.collection('leave').where({
      campusClass: '大学城',
    }).get({
      success: function (res) {
        console.log('=', res)
        that.setData({
          leaveList: res.data
        }, () => {})
        console.log('成功', that.data.leaveList)

      }
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
// pages/check-kecheng/check-kecheng.js
const db = wx.cloud.database();

const app = getApp().appData;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    kechengList: [],
  },
  rejectBtn(e) {
    //获取该条记录下唯一的_id值
    wx.showLoading({
      title: '驳回中...',
      mask: true
    })
    console.log(this.data.kechengList[e.currentTarget.dataset.index]._id)
    var data = {
      state: "reject",
      rejectedState: true,
      index_id: this.data.kechengList[e.currentTarget.dataset.index]._id,
    }
    console.log(data)
    wx.cloud.callFunction({
        name: "approveKecheng",
        data: data,
      })
      .then(res => {
        console.log(res)
        wx.hideLoading()
        wx.showToast({
          title: '驳回成功',
          icon: 'success',
          duration: 2000,
          mask: true,
        })
        this.onLoad()
      })
      .catch(err => {
        wx.showToast({
          title: '驳回失败',
          icon: 'none',
          duration: 2000,
          mask: true
        })
        console.log("失败", err)
      })

  },


  //通过
  passBtn(e) {
    //获取该条记录下唯一的_id值
    wx.showLoading({
      title: '通过中...',
      mask: true
    })
    console.log(this.data.kechengList[e.currentTarget.dataset.index]._id)
    var data = {
      state:"agree",
      pass_fdy: true,
      index_id: this.data.kechengList[e.currentTarget.dataset.index]._id,
    }
    console.log(data)
    wx.cloud.callFunction({
        name: "approveKecheng",
        data: data,
      })
      .then(res => {
        console.log(res)
        wx.hideLoading()
        wx.showToast({
          title: '通过成功',
          icon: 'success',
          duration: 2000,
          mask: true,
        })
        this.onLoad()
      })
      .catch(err => {
        wx.showToast({
          title: '通过失败',
          icon: 'none',
          duration: 2000,
          mask: true
        })
        console.log("失败", err)
      })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let that = this
    db.collection('kecheng').where({
      pass_fdy: false,
      rejectedState:false,
    }).get({
      success: function (res) {
        console.log('=', res)
        that.setData({
          kechengList: res.data
        }, () => {})
        console.log('成功', that.data)

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
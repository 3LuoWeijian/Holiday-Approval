// pages/tol-view/tol-view.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    processData: [{
      name: '申请提交',
      start: '#fff',
      end: '#EFF3F6',
      icon: '/image/daka.png'
    },
    {
      name: '辅导员审批',
      start: '#EFF3F6',
      end: '#EFF3F6',
      icon: '/image/check.png'
    },
    {
      name: '教务处审批',
      start: '#EFF3F6',
      end: '#EFF3F6',
      icon: '/image/daka.png'
    },
    {
      name: '审批结果',
      start: '#EFF3F6',
      end: '#EFF3F6',
      icon: '/image/daka.png'
    },
    {
      name: '取消审批',
      start: '#EFF3F6',
      end: '#fff',
      icon: '/image/daka.png'
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
          processArr[i].start = "#45B2FE"
          processArr[i].end = "#45B2FE"
        } else {
          processArr[i].icon = "/image/shenpi.png"
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
    

  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {  

    
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
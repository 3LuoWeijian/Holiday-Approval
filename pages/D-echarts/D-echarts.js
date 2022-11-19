import * as echarts from '../../ec-canvas/echarts' // 这个是自己实际的目录


function initChart(canvas, width, height, dpr) { // 这部分是固定的不需要 是通用的
  var pageArr = getCurrentPages()
  console.log("当前页面", pageArr[pageArr.length - 1].data)
  var num = pageArr[pageArr.length - 1].data
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);
  // 这是 唯一需要更改的，可根据实际情况api更改图标
  // option里根据需求修改
  var option = {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      top: '5%',
      left: 'center'
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '20',
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: [
          { value: 1048, name: '已打卡人数' },
          { value: 735, name: '未打卡人数' }
        
        ]
      }
    ]
  };

  chart.setOption(option);
  return chart;
}

Page({
  data: {
    ec: {
      onInit: initChart,
    },
    leavepeople: '',
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    const db = wx.cloud.database()
    db.collection('leave').where({
      pass_fdy: true
    }).get({
      success: res => {
        console.log('数据', res)
        that.setData({
          leavepeople: res.data.length
        })
      }
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
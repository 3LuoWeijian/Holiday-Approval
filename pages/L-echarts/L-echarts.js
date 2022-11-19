import * as echarts from '../../ec-canvas/echarts' // 这个是自己实际的目录

var app=getApp().appData;

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
    title: {

      subtext: '学生人数情况',
      left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      left: 'left'
    },
    series: [{
      name: 'Access From',
      type: 'pie',
      radius: '50%',
      data: [{
          value: 482 - pageArr[pageArr.length - 1].data.leavepeople,
          name: '在校人数'
        },
        {
          value: pageArr[pageArr.length - 1].data.leavepeople,
          name: '未返校人数'
        },

      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }]
  };

  chart.setOption(option);
  return chart;
}

Page({
  data: {
    ec: {
      onInit: initChart, 
    },
    leavepeople: ''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // let that = this
    // const db = wx.cloud.database()
    // db.collection('leave').where({
    //   pass_fdy: true
    // }).get({ 
    //   success: res => {
    //     console.log('数据', res)
    //     that.setData({
    //       leavepeople: res.data.length
    //     });
      
    //   } 
    // })
    this.setData({
      leavepeople:app.leavepeople   
    })
    console.log(this.data.leavepeople,'lp')
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
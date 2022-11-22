import * as echarts from '../../ec-canvas/echarts' // 这个是自己实际的目录
const db = wx.cloud.database()
var app=getApp().appData;
var util = require('util.js')
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
  var option ={
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    legend: {
      data: [
'已打卡人数',
'未打卡人数',
'离校人数',
'在校人数'

      ]
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        selectedMode: 'single',
        radius: [0, '30%'],
        label: {
          position: 'inner',
          fontSize: 13
        },
        labelLine: {
          show: false
        },
        data: [
          
          { value:pageArr[pageArr.length - 1].data.dakapeople, name: '已打卡人数' },
          { value: 482-pageArr[pageArr.length - 1].data.dakapeople, name: '未打卡人数' },
 
        ]
      },
      {
        name: 'Access From',
        type: 'pie',
        radius: ['45%', '60%'],
        labelLine: {
          length: 10
        },
  
        data: [
          { value: 482 - pageArr[pageArr.length - 1].data.leavepeople, name: '在校人数' },
          { value:pageArr[pageArr.length - 1].data.leavepeople, name: '离校人数' }
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
    leavepeople: null,
    dakapeople: null
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // var that = this
    // var today = util.formatDay(new Date())
    // db.collection('leave').where({
    //     pass_xsc: true
    //   }).get({
    //     success: res => {
    //       console.log('数据', res)
    //       this.setData({
    //         leavepeople: res.data.length
    //       })
 
    //     }
    //   }),
    //   db.collection('daka').where({
    //     subDate: today
    //   }).get({
    //     success: res => {
    //       console.log('数据2', res)
    //       this.setData({
    //         dakapeople: res.data.length  
    //       })
         
    //     }
    //   })
    this.setData({
      leavepeople:app.leavepeople,
      dakapeople:app.dakapeople

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
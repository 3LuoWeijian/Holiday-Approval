// pages/progress/progress.js
const db = wx.cloud.database();
const app= getApp().appData;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    current:0,
    leavelist:null,
    backlist:null,
    kechenglist:null,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let that = this
    if(this.data.current==0)
    {
      db.collection('leave').orderBy('subDate', 'desc').where({
      sno:app.sno,
      }).get({
        success:function(res){
          that.setData({
            leavelist:res.data
          },()=>{ })
        console.log('成功0',that.data.leavelist)
          
        }
      })
    }

    if(this.data.current==1)
    {
      db.collection('BackRequest').orderBy('subDate', 'desc').where({
      sno:app.sno,
      }).get({
        success:function(res){
          that.setData({
            backlist:res.data
          },()=>{ })
        console.log('成功1',that.data.backlist)
          
        }
      })
    }

    if(this.data.current==2)
    {
      db.collection('kecheng').orderBy('subDate', 'desc').where({
      sno:app.sno,
      }).get({
        success:function(res){
          that.setData({
            kechenglist:res.data
          },()=>{ })
        console.log('成功2',that.data.kechenglist)
          
        }
      })
    }
    

  },
  click(e) {
    let index = e.currentTarget.dataset.code;
    this.setData({
      current: index
    })
    console.log(this.data.current)
    this.onLoad()
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
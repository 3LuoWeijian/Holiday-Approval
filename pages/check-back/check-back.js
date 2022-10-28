// pages/check-leave/check-leave.js
const db = wx.cloud.database();
const app= getApp().appData;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    backlist:[],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let that = this
    db.collection('BackRequest').where({
      pass_fdy:'false'
    }).get({
      success:function(res){
        console.log('=',res.data)
        that.setData({
          backlist:res.data
        },()=>{ })
       console.log('成功',that.data.backlist)
        
      }
    })
  },

  //通过
  bindAgree(e){
    //获取该条记录下唯一的_id值
    wx.showLoading({
      title: '通过中...',
      mask: true
    })
    console.log(this.data.backlist[e.currentTarget.dataset.index]._id)
    var data = {
      pass_fdy:"true",
      index_id:this.data.backlist[e.currentTarget.dataset.index]._id,
    }
    console.log(data)
    wx.cloud.callFunction({
      name:"check-back",
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
      console.log("失败",err)
    })
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },
  /*
     * 图片预览
     * @param e
     */
    previewImg(e) {
      let currentUrl = e.currentTarget.dataset.src;
      console.log('无',e.currentTarget.dataset.src)
      let urls = this.data.backlist[e.currentTarget.dataset.index].imgList
      console.log('zg',this.data.backlist[e.currentTarget.dataset.index].imgList)
      wx.previewImage({
        current: currentUrl, // 当前显示图片的http链接
        urls: urls // 需要预览的图片http链接列表
      })
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
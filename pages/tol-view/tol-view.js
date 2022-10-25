// pages/tol-view/tol-view.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
	show: true, //显示选择图片的按钮
    imgList: [
 
    ],
    maxPhoto: 10, //最大上传10张图片
    
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

  chooseImg(e) {
    if (this.NextTap) {
      return;
    }
    this.NextTap = true;
    setTimeout(() => {
      this.NextTap = false;
    }, 1500) //1.5秒之后可以再次点击，防止用户重复点击
    wx.showActionSheet({
      itemList: ['从相册中选择', '拍照'],
      success: (res) => {
        if (!res.cancel) {
          if (res.tapIndex == 0) {
            this.chooseWxImage('album') //相册
          } else if (res.tapIndex == 1) {
            this.chooseWxImage('camera') //拍照
          }
        }
      }
    })
  },
  /**
   * 上传照片
   * @param {*} type
   */
  chooseWxImage: function (type) {
    let {  imgList, maxPhoto } = this.data
    if (imgList.length > 10) {
      wx.showToast({
        title: '最多上传10张',
        icon: 'none',
        duration: 2000
      })
      return
    }
    wx.chooseImage({
 
      count: maxPhoto - imgList.length, // 最多可以选择多少张图片
      sizeType: ['original', 'compressed'], //所选的图片的尺寸
      sourceType: [type], //图片来源
      success: (res) => {
        console.log(res)
        let tempFilePaths = res.tempFilePaths //成功后返回的的路径
        console.log(tempFilePaths)
        //把图片对应的路径都追加到数组中
        tempFilePaths.forEach(item => {
          imgList.push(item)
        })
        this.setData({
          imgList: imgList,
          show: imgList.length >= 10 ? false : true
        })
      }
    })
  },
  /*
   * 图片预览
   * @param e
   */
  previewImg(e) {
    let currentUrl = e.currentTarget.dataset.src;
    let urls = this.data.imgList
    wx.previewImage({
      current: currentUrl, // 当前显示图片的http链接
      urls: urls // 需要预览的图片http链接列表
    })
  },
  /**
   * 删除上传的图片
   * @param e
   */
  deleteUpload(e) {
    console.log(e)
    let {index} = e.currentTarget.dataset;
  
    let {imgList} = this.data;
    imgList.splice(index, 1)
    this.setData({
      imgList: imgList,
      show: imgList.length >= 10 ? false : true
    })
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
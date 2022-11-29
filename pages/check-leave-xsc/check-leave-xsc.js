// pages/leavecheck/leavecheck.js

const db = wx.cloud.database();


const app = getApp().appData;


Page({

  /**
   * 页面的初始数据
   */
  data: {
    leaveList: [],
    tch_type: '',
    advice: '疫情期间，出行需遵守防疫规则',
    destination: '全部',
    checkState: false,
    select: false,
    select_check: false,
    tihuoWay: '门店自提',
    riskState:'全部',
  },

  bindShowMsg() {//请假类别下拉框
    this.setData({
      select: !this.data.select,
      select_check:false,
      select_risk:false,
    })
  },

  bindShowCheckMsg() {//审核情况下拉框
    this.setData({
      select_check: !this.data.select_check,
      select:false,
      select_risk:false,
    })
  },
  bindShowRiskMsg() {//风险地区下拉框
    this.setData({
      select_risk: !this.data.select_risk,
      select:false,
      select_check:false,
    })
  },
  mySelect(e) {//请假类别选择
    var name = e.currentTarget.dataset.name
    this.setData({
      destination: name,
      select: false
    })
    this.onLoad()
    console.log(this.data.destination)
  },
  myCheckSelect(e) {//审核情况选择
    var name = e.currentTarget.dataset.name
    if (name == '已审核') {
      this.setData({
        checkState: true,
        select_check: false
      })
    }
    if (name == '未审核') {
      this.setData({
        checkState: false,
        select_check: false
      })
    }

  },

  myRiskSelect(e) {//风险地区选择
    var name = e.currentTarget.dataset.name
    this.setData({
      riskState: name,
      select_risk: false
    })
    this.onLoad()
    console.log(this.data.destination)
  },

  set: function (e) {
    this.setData({
      advice: e.detail.value
    })
    console.log(this.data.advice)
  },
  
  previewImg(e) {//预览图片
    let currentUrl = e.currentTarget.dataset.src;
    
    let urls = this.data.leaveList[e.currentTarget.dataset.index].newImgList
    console.log('zg', this.data.leaveList[e.currentTarget.dataset.index].newImgList)
    wx.previewImage({
      current: currentUrl, // 当前显示图片的http链接
      urls: urls // 需要预览的图片http链接列表
    })
  },

  rejectBtn(e) {

    //获取该条记录下唯一的_id值
    wx.showLoading({
      title: '驳回中...',
      mask: true
    })
    console.log(this.data.leaveList[e.currentTarget.dataset.index]._id)

    var data = {
      advice: this.data.advice,
      state: "reject",
      rejectedState: true,
      check_xsc: true,
      index_id: this.data.leaveList[e.currentTarget.dataset.index]._id,
    }


    console.log(data)

    
    wx.cloud.callFunction({
        name: "approveLeave",
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

        this.setData({
          advice: ''
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
    console.log(this.data.leaveList[e.currentTarget.dataset.index]._id)

    var data = {
      state: "agree",
      advice: this.data.advice,
      pass_xsc: true,
      check_xsc: true,
      index_id: this.data.leaveList[e.currentTarget.dataset.index]._id,
    }

    



    console.log(data)
    wx.cloud.callFunction({
        name: "approveLeave",
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
  //撤回
  withdraw(e){
    wx.showLoading({
      title: '撤回中...',
      mask: true
    })
    //console.log(this.data.leaveList[e.currentTarget.dataset.index]._id)

    var data = {
      state: "withdraw", 
      pass_xsc: false,
      check_xsc: false,
      rejectedState:false,
      index_id: this.data.leaveList[e.currentTarget.dataset.index]._id,
    }
    console.log(data)
    wx.cloud.callFunction({
        name: "approveLeave",
        data: data,
      })
      .then(res => {
        console.log(res)
        wx.hideLoading()
        wx.showToast({
          title: '撤回成功',
          icon: 'success',
          duration: 2000,
          mask: true,
        })
        this.onLoad()
      })
      .catch(err => {
        wx.showToast({
          title: '撤回失败',
          icon: 'none',
          duration: 2000,
          mask: true
        })
        console.log("失败", err)
      })

  },
  onLoad(options) {

    let that = this
    
      db.collection('leave')
        .orderBy('submitTime', 'desc')
        .where({
          pass_fdy:true,
          pass_xy: true,   
          
          //fdy_name: app.tch_name, //学生对应辅导员的功能，为了测试暂时注释掉
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
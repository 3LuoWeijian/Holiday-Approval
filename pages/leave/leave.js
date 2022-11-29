// leave.js
// 获取应用实例

const db = wx.cloud.database();
var that = this;
const app = getApp().appData;

const FileSystemManager = wx.getFileSystemManager()

var util = require('util.js')
Page({  
  /**
   * 页面的初始数据
   */
  data: {
    stu_name: '',
    class: '',
    academy: '',
    phone: '',
    sno: '', //新增
    /* imgPath: '',
    fid1: '', */
    fid2: '',
    pass_fdy: false, //辅导员通过情况
    pass_xy: false, //学院通过情况
    pass_xsc: false, //教务处通过情况

    check_fdy: false, //辅导员审核情况
    check_xy: false, //学院审核情况
    check_xsc: false, //教务处审核情况


    rejectedState: false, //0表示未审核，1表示驳回
    checkState: false,
    nowDate: '', //今天日期
    leaveDate: '',
    returnDate: '',
    fdy_name: '肖章益',
    array: ['肖章益', '中国', '巴西', '日本'],
    objectArray: [{
        id: 0,
        name: '肖章益'
      },
      {
        id: 1,
        name: '中国'
      },
      {
        id: 2,
        name: '巴西'
      },
      {
        id: 3,
        name: '日本'
      }
    ],
    index: 0,


    show: true, //显示选择图片的按钮
    imgList: [],
    newImgList: [],
    maxPhoto: 10, //最大上传10张图片

    contactName: '', //紧急联系人姓名
    contactPhone: '', //紧急联系人电话


    stu_type: '本科生',
    campusClassItems: [{
        name: 'daxuecheng',
        value: '大学城',
        checked: 'true'
      },
      {
        name: 'guihuagang',
        value: '桂花岗'
      },
      {
        name: 'huangpu',
        value: '黄埔'
      },
    ],
    campusClass: '大学城', //
    region: null,
    customItem: '全部',
    leaveClassItems: [{
        name: 'lixiao',
        value: '离校不离穗',
        checked: 'true'
      },
      {
        name: 'lisui',
        value: '离穗'
      },
      {
        name: 'chusheng',
        value: '出省'
      },
      {
        name: 'xiuxue',
        value: '休学'
      },
      {
        name: 'liuxue',
        value: '留学'
      },
    ],
    leaveClass: '离校不离穗',
    reasonLength: 0,
    riskRegion: "低风险",
    errmsg: "",
    advice: '', //审核意见
    submitTime: '', //提交时间
    stu_id: '', //用于存储该卡片的学生的_id
  },
  //辅导员名字
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value,

    })
    this.setData({
      fdy_name: this.data.objectArray[this.data.index].name
    })
    console.log(this.data.fdy_name)
  },

  //学生类别
  bindTypechange(e) {
    console.log(e.detail)
    this.setData({
      stu_type: e.detail.value
    })
  },

  //是否住校
  bindRiskRegionchange(e) {
    console.log(e.detail.value)
    this.setData({
      riskRegion: e.detail.value
    })
    console.log(this.data.riskRegion)
  },
  //校区类别
  radioCampusClassChange: function (e) {
    var str = null;
    for (var value of this.data.campusClassItems) {
      if (value.name === e.detail.value) {
        str = value.value;
        break;
      }
    }
    this.setData({
      campusClass: str
    });
  },


  //请假类别
  radioClassChange: function (e) {
    var str = null;
    for (var value of this.data.leaveClassItems) {
      if (value.name === e.detail.value) {
        str = value.value;
        break;
      }
    }
    this.setData({
      leaveClass: str
    });
  },


  //外出地点
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },


  // 离开日期变化时返回日期最小为离开日期
  bindLeaveDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      leaveDate: e.detail.value,
      returnDate: e.detail.value
    })
  },
  bindReturnDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      returnDate: e.detail.value
    })
  },



  //紧急联系人姓名
  bindContactNameInput: function (e) {
    this.setData({
      contactName: e.detail.value
    })
  },
  //紧急联系人电话
  bindContactPhoneInput: function (e) {
    this.setData({
      contactPhone: e.detail.value
    })
  },

  lookRiskRegion(){
    wx.navigateToMiniProgram({
      appId: 'wxbebb3cdd9b331046',
      path: 'page/index/index',
      extraData: {
        foo: 'bar'
      },
      envVersion: 'develop',
      success(res) {
        // 打开成功
      }
    })
  },

  textCount: function (e) {
    var len = e.detail.value.length
    if (len <= 50) {
      this.setData({
        reasonLength: len,
      })
    }
  },
  textBlur: function (e) {
    var len = e.detail.value.length
    if (len == 0) {
      this.setData({
        errmsg: "字数为0"
      })
    } else if (len <= 10) {
      this.setData({
        errmsg: "字数太少了，写多点吧"
      })
    }
  },


  //是否住校
  bindRiskRegionchange(e) {
    console.log(e.detail.value)
    this.setData({
      riskRegion: e.detail.value
    })
    console.log(this.data.riskRegion)
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
    let {
      imgList,
      maxPhoto
    } = this.data
    if (imgList.length > 10) {
      wx.showToast({
        title: '最多上传10张',
        icon: 'none',
        duration: 2000
      })
      return
    }
    var that = this
    wx.chooseImage({

      count: maxPhoto - imgList.length, // 最多可以选择多少张图片
      sizeType: ['compressed'], //所选的图片的尺寸
      sourceType: [type], //图片来源
      success: (res) => {
        console.log(res)
        let tempFilePaths = res.tempFilePaths //成功后返回的的路径
        console.log(tempFilePaths)
        //把图片对应的路径都追加到数组中
        tempFilePaths.forEach(item => {
          imgList.push(item)
        })
        //上传到云存储
        var newImgList = []
        for (var i = 0; i < tempFilePaths.length; i++) {
          wx.cloud.uploadFile({
            cloudPath: 'stuPhoto/' + this.data.academy + '/' + this.data.sno + new Date().getTime() + Math.floor(Math.random() * 1000) + '.jpg',
            filePath: tempFilePaths[i],
            success: res => {
              console.log('上传成功', res.fileID)
              newImgList.push(res.fileID)
            }
          })
        }
        console.log('云存储序列', newImgList)
        that.setData({
          newImgList: newImgList,
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
    console.log(e)
    let currentUrl = e.currentTarget.dataset.src;
    console.log('wu', e.currentTarget.dataset.src)
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
    let {
      index
    } = e.currentTarget.dataset;
    let {
      newImgList
    } = this.data;
    let {
      imgList
    } = this.data;
    imgList.splice(index, 1)
    newImgList.splice(index, 1)
    this.setData({
      imgList: imgList,
      newImgList: newImgList,
      show: imgList.length >= 10 ? false : true
    })
  },



  submit: function (e) {
    var that = this
    var reasonLen = e.detail.value.leaveReason.length
    
    //提交成功的情况
    var leaveReason = e.detail.value.leaveReason
  
    db.collection('leave')
      .orderBy('submitTime', 'desc')
      .where({
        sno: app.sno
      }).get({
        success: function (res) {
          console.log('集合长度',res.data.length)
          if(res.data.length==0){ if (reasonLen > 10 && (that.data.imgList.length == that.data.newImgList.length)) {
            // console.log('form submit 事件',e.detail.value)
            wx.showLoading({
              title: '申请提交中...',
              mask: true
            })
            var data = {
              //sno: app.globalData.regInfo.sno,
              stu_name: that.data.stu_name,
              class: that.data.class,
              academy: that.data.academy,
              sno: that.data.sno,
              stu_id: that.data.stu_id, //存储该卡片学生的_id

              pass_fdy: that.data.pass_fdy,
              pass_xsc: that.data.pass_xsc,
              pass_xy: that.data.pass_xy,

              check_fdy: that.data.check_fdy,
              check_xy: that.data.check_xy,
              check_xsc: that.data.check_xsc,


              rejectedState: that.data.rejectedState,
              checkState: that.data.checkState,

              region: that.data.region,
              leaveDate: that.data.leaveDate,
              returnDate: that.data.returnDate,
              contactName: that.data.contactName,
              contactPhone: that.data.contactPhone,

              leaveReason: leaveReason,
              submitTime: that.data.submitTime,
              leaveClass: that.data.leaveClass,
              stu_type: that.data.stu_type,
              campusClass: that.data.campusClass,

              newImgList: that.data.newImgList,
              riskRegion: that.data.riskRegion,
              fdy_name: that.data.fdy_name,


            }
            console.log('data = ', data)

            wx.cloud.callFunction({
                name: "upleave",
                data: data
              })
              .then(res => {
                // console.log(res)
                wx.hideLoading()
                wx.showToast({
                  title: '提交成功',
                  icon: 'success',
                  duration: 2000,
                  mask: true,
                  success: (res) => {
                    console.log('upleave调用成功')
                    setTimeout(() => {
                      wx.navigateBack({
                        delta: 1,
                      })
                    }, 2000);
                  }
                })
              })
              .catch(err => {
                wx.showToast({
                  title: '提交失败',
                  icon: 'none',
                  duration: 2000,
                  mask: true
                })
                console.log(err)
              })
          } else {
            if (reasonLen == 0) {
              this.setData({
                errmsg: "*请假理由为空"
              })
            } else if (reasonLen < 10) {
              this.setData({
                errmsg: "*字数少于10字，不能提交噢"
              })
            } else {
              this.setData({
                errmsg: ""
              })
            }
          }}
          if (res.data[0].pass_xsc == false && res.data[0].rejectedState == false) {
            wx.showToast({
              title: '请勿重复提交',
              icon:'none',
            })
            return
          }
          

          if (reasonLen > 10 && (that.data.imgList.length == that.data.newImgList.length)) {
            // console.log('form submit 事件',e.detail.value)
            wx.showLoading({
              title: '申请提交中...',
              mask: true
            })
            var data = {
              //sno: app.globalData.regInfo.sno,
              stu_name: that.data.stu_name,
              class: that.data.class,
              academy: that.data.academy,
              sno: that.data.sno,
              stu_id: that.data.stu_id, //存储该卡片学生的_id

              pass_fdy: that.data.pass_fdy,
              pass_xsc: that.data.pass_xsc,
              pass_xy: that.data.pass_xy,

              check_fdy: that.data.check_fdy,
              check_xy: that.data.check_xy,
              check_xsc: that.data.check_xsc,


              rejectedState: that.data.rejectedState,
              checkState: that.data.checkState,

              region: that.data.region,
              leaveDate: that.data.leaveDate,
              returnDate: that.data.returnDate,
              contactName: that.data.contactName,
              contactPhone: that.data.contactPhone,

              leaveReason: leaveReason,
              submitTime: that.data.submitTime,
              leaveClass: that.data.leaveClass,
              stu_type: that.data.stu_type,
              campusClass: that.data.campusClass,

              newImgList: that.data.newImgList,
              riskRegion: that.data.riskRegion,
              fdy_name: that.data.fdy_name,


            }
            console.log('data = ', data)

            wx.cloud.callFunction({
                name: "upleave",
                data: data
              })
              .then(res => {
                // console.log(res)
                wx.hideLoading()
                wx.showToast({
                  title: '提交成功',
                  icon: 'success',
                  duration: 2000,
                  mask: true,
                  success: (res) => {
                    console.log('upleave调用成功')
                    setTimeout(() => {
                      wx.navigateBack({
                        delta: 1,
                      })
                    }, 2000);
                  }
                })
              })
              .catch(err => {
                wx.showToast({
                  title: '提交失败',
                  icon: 'none',
                  duration: 2000,
                  mask: true
                })
                console.log(err)
              })
          } else {
            if (reasonLen == 0) {
              this.setData({
                errmsg: "*请假理由为空"
              })
            } else if (reasonLen < 10) {
              this.setData({
                errmsg: "*字数少于10字，不能提交噢"
              })
            } else {
              this.setData({
                errmsg: ""
              })
            }
          }



        }
      })




  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // leaveDate和returnDate的初始化
    var today = util.formatDay(new Date())
    var time = util.formatTime(new Date())
    this.setData({
      submitTime: time,
      nowDate: today,
      leaveDate: today,
      returnDate: today,
      stu_name: app.stu_name,
      class: app.class,
      sno: app.sno,
      academy: app.academy,
      phone: app.phone,
      stu_id: app._id,
    })
    console.log(today)

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
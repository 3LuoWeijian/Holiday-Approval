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
    pass_fdy: false, //辅导员审核情况
    pass_sj: false, //书记审核情况
    pass_jwc: false, //教务处审核情况
    submitState: false, //提交状态，暂时未用到
    rejectedState: false, //0表示未审核，1表示驳回
    nowDate: '', //今天日期
    leaveDate: '',
    returnDate: '',
    fdy_name: '',
    array: ['肖章益', '中国', '巴西', '日本'],
    objectArray: [
      {
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
    index:0,
    

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
    region: ['广东省', '广州市', '海珠区'],
    customItem: '全部',
    leaveClassItems: [{
        name: 'shijia',
        value: '事假',
        checked: 'true'
      },
      {
        name: 'bingjia',
        value: '病假'
      },
      {
        name: 'shixi',
        value: '实习'
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
    leaveClass: '事假',
    reasonLength: 0,
    riskRegion: false,
    errmsg: "",
  },
//辅导员名字
  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value,
      
    })
    this.setData({
      fdy_name:this.data.objectArray[this.data.index]
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
    } else if (len < 10) {
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
    var reasonLen = e.detail.value.leaveReason.length
    if (reasonLen > 10 && (this.data.imgList.length == this.data.newImgList.length)) {
      // console.log('form submit 事件',e.detail.value)
      wx.showLoading({
        title: '申请提交中...',
        mask: true
      })
      var data = {
        //sno: app.globalData.regInfo.sno,
        stu_name: this.data.stu_name,
        class: this.data.class,
        academy: this.data.academy,
        sno: this.data.sno,

        pass_fdy: this.data.pass_fdy,
        pass_jwc: this.data.pass_jwc,
        pass_sj: this.data.pass_sj,
        submitState: this.data.submitState,
        rejectedState: this.data.rejectedState,

        region: this.data.region,
        leaveDate: this.data.leaveDate,
        returnDate: this.data.returnDate,
        contactName: this.data.contactName,
        contactPhone: this.data.contactPhone,

        leaveReason: e.detail.value.leaveReason,
        subDate: this.data.nowDate,
        leaveClass: this.data.leaveClass,
        stu_type: this.data.stu_type,
        campusClass: this.data.campusClass,

        newImgList: this.data.newImgList,
        riskRegion: this.data.riskRegion,
        fdy_name:this.data.fdy_name,
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
    this.setData({
      nowDate: today,
      leaveDate: today,
      returnDate: today,
      stu_name: app.name,
      class: app.class,
      sno: app.sno,
      academy: app.academy,
      phone: app.phone,
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
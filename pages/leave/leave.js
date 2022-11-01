// leave.js
// 获取应用实例

const db = wx.cloud.database();
var that = this;
const app= getApp().appData;

const FileSystemManager = wx.getFileSystemManager()

var util = require('util.js')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    stu_name: '',
    class:'',
    academy: '',
    phone: '', 
    sno: '',//新增
    /* imgPath: '',
    fid1: '', */
    fid2: '',
    pass_fdy: false, //辅导员审核情况
    pass_sj: false,//书记审核情况
    pass_jwc: false, //教务处审核情况
    submitState:false,//提交状态，暂时未用到
    rejectedState:false,//0表示未审核，1表示驳回
    nowDate: '',//今天日期
    leaveDate: '',
    returnDate: '',

    contactName:'',//紧急联系人姓名
    contactPhone:'',//紧急联系人电话
    
    studentClassItems: [{ //改为stu_class
        name: 'benkesheng',
        value: '本科生',
        checked: 'true'
      },
      {
        name: 'yanjiusheng',
        value: '研究生'
      },
    ],
    studentClass: '本科生',
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
    errmsg: "",
  },
  //学号sno

  bindSnoInput: function (e) {
    this.setData({
      sno: e.detail.value
    })
  },
  //学生类别
  radioStudentClassChange: function (e) {
    var str = null;
    for (var value of this.data.studentClassItems) {
      if (value.name === e.detail.value) {
        str = value.value;
        break;
      }
    }
    this.setData({
      studentClass: str
    });
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
  //上传图片
  /* upImg() {
    const that = this;
    wx.chooseMessageFile({
      count: 1,
      type: 'image',
      success(res) {
        console.log("选择成功")
        wx.cloud.uploadFile({
          cloudPath: '123.png',
          filePath: res.tempFiles[0].path, // 文件路径

          success: res => {
            
            console.log("上传成功", res)

            that.setData({
              imgPath: res.fileID
            })
            console.log(that.data.imgPath)
          },
          fail: err => {
            // handle error
            console.log("上传失败", res)
          }
        })
      },
      fail() {
        console.log("选择失败")

      }

    })
  },
 */

  //预览图片
  /* openImg(){
    var that = this;
    wx.cloud.downloadFile({
      fileID: (that.data.fid1),
      success: res => {
   
        console.log(res.tempFilePath)
        console.log("下载预览成功"),
          wx.openDocument({
            filePath: res.tempFilePath,
            success: () => {
              console.log("打开成功")
            },
            fail: () => {
              console.log("打开失败1")
            }
          })
      },
      fail: err => {
        // handle error
        console.log("打开失败2", res)
      }
    })

  }, */

  //上传word文档
  upDocx() {
    const _that = this;
    wx.chooseMessageFile({
      count: 1,
      type: 'file',
      success(res) {
        console.log("选择成功")
        wx.cloud.uploadFile({
          cloudPath: '123.docx',
          filePath: res.tempFiles[0].path, // 文件路径

          success: res => {
            console.log("上传成功", res)

            that.setData({
              fid2: res.fileID
            })
            console.log(_that.data.fid2)



          },
          fail: err => {
            // handle error
            console.log("上传失败", res)
          }
        })
      },
      fail() {
        console.log("选择失败")

      }

    })

  },

  //预览word文档
  openDocx() {

    var that = this;
    wx.cloud.downloadFile({
      fileID: (that.data.fid2),
      success: res => {

        console.log(res.tempFilePath)
        console.log("下载预览成功")
        

            FileSystemManager.open({
              filePath: res.tempFilePath,
              flag: 'r',
              success(res) {
                console.log(res)
              }


            })
            
          }
            
        
      
      
    })
  },
/* wx.openDocument({
              filePath: (savedFilePath),
              fileType:'docx',
              success: () => {
                console.log("打开成功")
              },
              fail: () => {
                console.log("打开失败",res)
              }
            }) */


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
      stu_name:app.name,
      class:app.class,
      sno:app.sno,      
      academy:app.academy,
      phone:app.phone,
    })
    console.log(today)

  },


  submit: function (e) {
    var reasonLen = e.detail.value.leaveReason.length
    if (reasonLen > 10) {
      // console.log('form submit 事件',e.detail.value)
      wx.showLoading({
        title: '申请提交中...',
        mask: true
      })
      var data = {
        //sno: app.globalData.regInfo.sno,
        stu_name:this.data.stu_name,
        class:this.data.class,
        academy:this.data.academy,
        sno: this.data.sno,

        pass_fdy:this.data.pass_fdy,
        pass_jwc:this.data.pass_jwc,
        pass_sj:this.data.pass_sj,
        submitState:this.data.submitState,
        rejectedState:this.data.rejectedState,
        
        region: this.data.region,
        leaveDate: this.data.leaveDate,
        returnDate: this.data.returnDate,
        contactName:this.data.contactName,
        contactPhone:this.data.contactPhone,

        leaveReason: e.detail.value.leaveReason,
        subDate: this.data.nowDate,
        leaveClass: this.data.leaveClass,
        studentClass: this.data.studentClass,
        campusClass: this.data.campusClass,
      
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
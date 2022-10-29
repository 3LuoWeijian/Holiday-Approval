// pages/kecheng/kecheng.js

const db = wx.cloud.database();
var that = this;
const app= getApp().appData;
var util = require('util.js')
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    stu_name: '',
    class:'',
    academy: '',
    phone: '', 
    sno: '',//新增
    reasonLength:'',
    lessonName: '',
    lessonTime: '',
    teacherName: '',
    absenceDate: '',
    reasonLength: 0,
    errmsg: "",
    
    nowDate: '',
    leaveDate: '',
    returnDate: '',
    studentClassItems: [{
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
    campusClass: '大学城',
    absenceReason: ''

  },

  /**
   * 组件的方法列表
   */
  methods: {


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
    //课程全称
    bindLessonNameInput: function (e) {
      this.setData({
        lessonName: e.detail.value
      })
    },
    //课程节次
    bindLessonTimeInput: function (e) {
      this.setData({
        lessonTime: e.detail.value
      })
    },
    //课程全称
    bindTeacherNameInput: function (e) {
      this.setData({
        teacherName: e.detail.value
      })
    },

    onLoad: function (options) {
      // leaveDate和returnDate的初始化
      var today = util.formatDay(new Date())
      this.setData({
        nowDate: today,
        absenceDate: today,
        stu_name:app.name,
        class:app.class,
        sno:app.sno,      
        academy:app.academy,
        phone:app.phone,





      })
      console.log(today)
    },

    //请假时间
    bindAbsenceDateChange: function (e) {
      console.log('picker发送选择改变，携带值为', e.detail.value)
      this.setData({
        absenceDate: e.detail.value,

      })
    },
    textCount: function (e) {
      var len = e.detail.value.length
      if (len <= 150) {
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
    submit: function (e) {
      var reasonLen = e.detail.value.absenceReason.length
      if (reasonLen > 10) {
        // console.log('form submit 事件',e.detail.value)
        wx.showLoading({
          title: '申请提交中...',
          mask: true
        })
        var data = {
          sno: this.data.sno,
          absenceDate: this.data.absenceDate,
          lessonName: this.data.lessonName,
          lessonTime: this.data.lessonTime,
          teacherName: this.data.teacherName,
          subDate: this.data.nowDate,
          studentClass: this.data.studentClass,
          campusClass: this.data.campusClass,
          absenceReason:e.detail.value.absenceReason
        }
        console.log('data = ', data)
        wx.cloud.callFunction({
            name: "upkecheng",
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
  }
})
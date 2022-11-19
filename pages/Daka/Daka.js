var util = require('./utils/util.js');
var myDate = new Date();
const db = wx.cloud.database();
var that = this;
const app= getApp().appData;
Page({
 /**
   * 页面的初始数据
   */
  data: {
    shows: false, //控制下拉列表的显示隐藏，false隐藏、true显示
    classDatas: 
    ['肖章益','唐思雅','aaa','bbb','ccc'], //下拉列表的数据
    indexs: 0, //选择的下拉列 表下标,
    InoculateDate:myDate.toLocaleDateString(),
    subDate:null,
    stu_name:null,
    sno:null,
    class:null,
    academy:null,
    phone:null,
    region:'广州大学学生公寓',
    region1:'广州',
    isjiantou:true,   //箭头切换
    OutsideClassItems: [
      { name: 'fou', value: '否', checked: 'true' },
      { name: 'shi', value: '是' },
    ],
    OutsideClass:'否',
    SelfHealthClassItems: [
      { name: 'zhengchang', value: '正常', checked: 'true' },
      { name: 'bushi', value: '不适' },
    ],
    SelfHealthClass:'正常',
    ReportClassItems: [
      { name: 'yinxing', value: '阴性', checked: 'true' },
      { name: 'yangxing', value: '阳性' },
    ],
    ReportClass:'阴性',
    HealthClassItems: [
      { name: 'zhengchang', value: '正常', checked: 'true' },
      { name: 'geli', value: '隔离' },
      { name: 'wuzhengzhuangganranzhe', value: '无症状感染者' },
      { name: 'yisihuoquezhen', value: '疑似/确诊' },
      { name: 'yisizhuanpaichu', value: '疑似转排除' },
    ],  
    HealthClass:'正常',
    FamilyClassItems: [
      { name: 'zhengchang', value: '正常', checked: 'true' },
      { name: 'geli', value: '隔离' },
      { name: 'wuzhengzhuangganranzhe', value: '无症状感染者' },
      { name: 'yisihuoquezhen', value: '疑似/确诊' },
      { name: 'yisizhuanpaichu', value: '疑似转排除' },
    ],
    FamilyClass:'正常',
    BoolFamilyClassItems: [
      { name: 'fou', value: '否', checked: 'true' },
      { name: 'shi', value: '是' },
    ],
    BoolFamilyClass:'否',
    Bool1ClassItems: [
      { name: 'fou', value: '否', checked: 'true' },
      { name: 'shi', value: '是' },
    ],
    Bool1Class:'否',
    Bool2ClassItems: [
      { name: 'fou', value: '否', checked: 'true' },
      { name: 'shi', value: '是' },
    ],
    Bool2Class:'否',
    Bool3ClassItems: [
      { name: 'fou', value: '否', checked: 'true' },
      { name: 'shi', value: '是' },
    ],
    Bool3Class:'否',
    BoolgreenClassItems: [
      { name: 'shi', value: '是', checked: 'true' },
      { name: 'fou', value: '否' },
    ],
    BoolgreenClass:'是',
    KeyregionItems: [
      { name: 'fou', value: '否', checked: 'true' },
      { name: 'shi', value: '是' },
    ],
    Keyregion:'否',
    VaccineItems: [
      { name: 'shi', value: '是', checked: 'true' },
      { name: 'fou', value: '否' },
    ],
    Vaccine:'是',
    VaccinecountsItems: [
      { name: 'yizhen', value: '一针'},
      { name: 'liangzhen', value: '两针' },
      { name: 'sanzhen', value: '三针', checked: 'true' },
    ],
    Vaccinecounts:'三针',
   SupplierItems: [
      { name: 'shengwu', value: '生物'},
      { name: 'kexing', value: '科兴' },
      { name: 'zhifei', value: '智飞'},
      { name: 'kangtai', value: '康泰'},
      { name: 'qita', value: '其他'},
    ],
    Supplier:'生物',
  },

  bindDateChange: function(e) {
    console.log(e.detail.value)
    this.setData({
      InoculateDate: e.detail.value
    })
  },
  iptHandler(e){
    this.setData({
        // 通过e.detail.value 获取文本框最新值
        region:e.detail.value
    })
  },
  kptHandler(e){
    this.setData({
        // 通过e.detail.value 获取文本框最新值
        region1:e.detail.value
    })
  },
   // 点击下拉显示框
  selectTaps() {
    this.setData({
      shows: !this.data.shows,
    });
  },
  // 点击下拉列表
  optionTaps(e) {
    let Indexs = e.currentTarget.dataset.index; //获取点击的下拉列表的下标
    console.log(Indexs)
    this.setData({
      indexs: Indexs,
      shows: !this.data.shows
    });

  },


  radioOutsideClassChange: function (e) {
    var str = null;
    for (var value of this.data.OutsideClassItems) {
      if (value.name === e.detail.value) {
        str = value.value;
        break;
      }
    }
    this.setData({OutsideClass: str});
  },

  radioSelfHealthClassChange: function (e) {
    var str = null;
    for (var value of this.data.SelfHealthClassItems) {
      if (value.name === e.detail.value) {
        str = value.value;
        break;
      }
    }
    this.setData({SelfHealthClass: str});
  },

  radioHealthClassChange: function (e) {
    var str = null;
    for (var value of this.data.HealthClassItems) {
      if (value.name === e.detail.value) {
        str = value.value;
        break;
      }
    }
    this.setData({HealthClass: str});
  },

  radioFamilyClassChange: function (e) {
    var str = null;
    for (var value of this.data.FamilyClassItems) {
      if (value.name === e.detail.value) {
        str = value.value;
        break;
      }
    }
    this.setData({FamilyClass: str});
  },

  radioBool1ClassChange: function (e) {
    var str = null;
    for (var value of this.data.Bool1ClassItems) {
      if (value.name === e.detail.value) {
        str = value.value;
        break;
      }
    }
    this.setData({Bool1Class: str});
  },
  radioBool2ClassChange: function (e) {
    var str = null;
    for (var value of this.data.Bool2ClassItems) {
      if (value.name === e.detail.value) {
        str = value.value;
        break;
      }
    }
    this.setData({Bool2Class: str});
  },

  radioBool3ClassChange: function (e) {
    var str = null;
    for (var value of this.data.Bool3ClassItems) {
      if (value.name === e.detail.value) {
        str = value.value;
        break;
      }
    }
    this.setData({Bool3Class: str});
  },

  radioBoolgreenClassChange: function (e) {
    var str = null;
    for (var value of this.data.BoolgreenClassItems) {
      if (value.name === e.detail.value) {
        str = value.value;
        break;
      }
    }
    this.setData({BoolgreenClass: str});
  },

  radioKeyregionClassChange: function (e) {
    var str = null;
    for (var value of this.data.KeyregionItems) {
      if (value.name === e.detail.value) {
        str = value.value;
        break;
      }
    }
    this.setData({Keyregion: str});
  },

  radioVaccineClassChange: function (e) {
    var str = null;
    for (var value of this.data.VaccineItems) {
      if (value.name === e.detail.value) {
        str = value.value;
        break;
      }
    }
    this.setData({Vaccine: str});
  },

  radioVaccinecountsClassChange: function (e) {
    var str = null;
    for (var value of this.data.VaccinecountsItems) {
      if (value.name === e.detail.value) {
        str = value.value;
        break;
      }
    }
    this.setData({Vaccinecounts: str});
  },
  
   radioSupplierClassChange: function (e) {
    var str = null;
    for (var value of this.data.SupplierItems) {
      if (value.name === e.detail.value) {
        str = value.value;
        break;
      }
    }
    this.setData({Supplier: str});
  }, 

  onLoad: function (options) {
    this.setData({
      stu_name:app.stu_name,
      class:app.class,
      sno:app.sno,      
      academy:app.academy,
      phone:app.phone,
     
    })
    // 调用函数时，传入new Date()参数，返回值是日期和时间
    var subDate = util.formatTime(new Date());
    // 再通过setData更改Page()里面的data，动态更新页面的数据
    this.setData({
      subDate: subDate
    });
  },
 
submit: function (e) {
      wx.showLoading({
        title: '申请提交中...',
        mask: true
      })
      var data = {
        //sno: app.globalData.regInfo.sno,
        //提交日期
        subDate: this.data.subDate,
        //学生姓名
        stu_name: this.data.stu_name,
        //学生学号
        sno: this.data.sno,
        //学生班级
        class:this.data.class,
        //学生学院
        academy: this.data.academy,
        //学生电话
        phone:this.data.phone,
        //辅导员
        stu_fdy:this.data.stu_fdy,
        //校内居住地址
        region:this.data.region,
        //目前所在地
        region1:this.data.region1,
        selectcontent:this.data.selectcontent,
        //当日是否外出
        OutsideClass:this.data.OutsideClass,
        //本人身体状况
        SelfHealthClass:this.data.SelfHealthClass,
        //近一次核酸结果
        ReportClass:this.data.ReportClass,
        //本人健康情况
        HealthClass:this.data.HealthClass,
        //
        FamilyClass:this.data.FamilyClass,
        //
        BoolFamilyClass:this.data.BoolFamilyClass,
        //
        Bool1Class:this.data.Bool1Class,
        Bool2Class:this.data.Bool2Class,
        Bool3Class:this.data.Bool3Class,
        BoolgreenClass:this.data.BoolgreenClass,
        Keyregion:this.data.Keyregion,
        Vaccine:this.data.Vaccine,
        Vaccinecounts:this.data.Vaccinecounts,
        Supplier:this.data.Supplier,
        InoculateDate:this.data.InoculateDate
      }
      console.log('data = ', data)
      wx.cloud.callFunction({
          name: "updaka",
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
     
  },
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


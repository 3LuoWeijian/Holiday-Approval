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
    classDatas: ['计算机学院', '环境科学与工程学院', '网络安全学院','新闻传播学院','音乐舞蹈学院','生命科学学院','教育学院','马克思学院','外国语学院','土木学院'], //下拉列表的数据
  
    indexs: 0, //选择的下拉列 表下标,
    date:myDate.toLocaleDateString(),
    name:null,
    sno:null,
    class:null,
    academy:null,
    phone:null,
    msg:'广州大学学生公寓',
    isjiantou:true,   //箭头切换
    selectcontent:[
      {id:1,name:"肖章益"},
      {id:2,name:"唐思雅"},
    ],
    value:undefined,   //选中的值
    valueid:undefined,  //选中的id
    OutsideClassItems: [
      { name: 'fou', value: '否', checked: 'true' },
      { name: 'shi', value: '是' },
    ],
    SelfHealthClassItems: [
      { name: 'zhengchang', value: '正常', checked: 'true' },
      { name: 'bushi', value: '不适' },
    ],
    ReportClassItems: [
      { name: 'yinxing', value: '阴性', checked: 'true' },
      { name: 'yangxing', value: '阳性' },
    ],
    HealthClassItems: [
      { name: 'zhengchang', value: '正常', checked: 'true' },
      { name: 'geli', value: '隔离' },
      { name: 'wuzhengzhuangganranzhe', value: '无症状感染者' },
      { name: 'yisihuoquezhen', value: '疑似/确诊' },
      { name: 'yisizhuanpaichu', value: '疑似转排除' },
    ],  
    FamilyClassItems: [
      { name: 'zhengchang', value: '正常', checked: 'true' },
      { name: 'geli', value: '隔离' },
      { name: 'wuzhengzhuangganranzhe', value: '无症状感染者' },
      { name: 'yisihuoquezhen', value: '疑似/确诊' },
      { name: 'yisizhuanpaichu', value: '疑似转排除' },
    ],
    BoolFamilyClassItems: [
      { name: 'fou', value: '否', checked: 'true' },
      { name: 'shi', value: '是' },
    ],
    Bool1ClassItems: [
      { name: 'fou', value: '否', checked: 'true' },
      { name: 'shi', value: '是' },
    ],
    Bool2ClassItems: [
      { name: 'fou', value: '否', checked: 'true' },
      { name: 'shi', value: '是' },
    ],
    Bool3ClassItems: [
      { name: 'fou', value: '否', checked: 'true' },
      { name: 'shi', value: '是' },
    ],
    BoolgreenClassItems: [
      { name: 'shi', value: '是', checked: 'true' },
      { name: 'fou', value: '否' },
    ],
    KeyregionItems: [
      { name: 'fou', value: '否', checked: 'true' },
      { name: 'shi', value: '是' },
    ],
    VaccineItems: [
      { name: 'shi', value: '是', checked: 'true' },
      { name: 'fou', value: '否' },
    ],
    VaccinecountsItems: [
      { name: 'yizhen', value: '一针'},
      { name: 'liangzhen', value: '两针' },
      { name: 'sanzhen', value: '三针', checked: 'true' },
    ],
   SupplierItems: [
      { name: 'shengwu', value: '生物'},
      { name: 'kexing', value: '科兴' },
      { name: 'zhifei', value: '智飞'},
      { name: 'kangtai', value: '康泰'},
      { name: 'qita', value: '其他'},
    ],
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
  bindDateChange: function(e) {
    console.log(e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  iptHandler(e){
    this.setData({
        // 通过e.detail.value 获取文本框最新值
        msg:e.detail.value
    })
  },

    // 下拉框收起和下拉
    changejiantou(){
      this.setData({
        isjiantou:!this.data.isjiantou
      })
    },
    // 选择数据后回显
    changecontent(e){
      this.setData({
        value:e.currentTarget.dataset.datavalue.name,
        valueid:e.currentTarget.dataset.datavalue.id,
        isjiantou:true
      })
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
    for (var value of this.data.KeyregionClassItems) {
      if (value.name === e.detail.value) {
        str = value.value;
        break;
      }
    }
    this.setData({KeyregionClass: str});
  },

  radioVaccineClassChange: function (e) {
    var str = null;
    for (var value of this.data.VaccineClassItems) {
      if (value.name === e.detail.value) {
        str = value.value;
        break;
      }
    }
    this.setData({VaccineClass: str});
  },

  radioVaccinecountsClassChange: function (e) {
    var str = null;
    for (var value of this.data.VaccinecountsClassItems) {
      if (value.name === e.detail.value) {
        str = value.value;
        break;
      }
    }
    this.setData({VaccinecountsClass: str});
  },
  
   radioSupplierClassChange: function (e) {
    var str = null;
    for (var value of this.data.SupplierClassItems) {
      if (value.name === e.detail.value) {
        str = value.value;
        break;
      }
    }
    this.setData({SupplierClass: str});
  }, 

  onLoad: function (options) {
    this.setData({
      name:app.name,
      class:app.class,
      sno:app.sno,      
      academy:app.academy,
      phone:app.phone,
    })
    // 调用函数时，传入new Date()参数，返回值是日期和时间
    var time = util.formatTime(new Date());
    // 再通过setData更改Page()里面的data，动态更新页面的数据
    this.setData({
      time: time
    });
  },
 
submit: function (e) {
    
      wx.showLoading({
        title: '申请提交中...',
        mask: true
      })
      var data = {
        //sno: app.globalData.regInfo.sno,
        
       
        name: this.data.name,
        sno: this.data.sno,
        class:this.data.class,
        academy: this.data.academy,
        phone:this.data.phone,
        msg:this.data.msg,
        selectcontent:this.data.selectcontent,
        OutsideClassItems:this.data.OutsideClassItems,
        SelfHealthClassItems:this.data.SelfHealthClassItems,
        ReportClassItems:this.data.ReportClassItems,
        HealthClassItems:this.data.HealthClassItems,
        FamilyClassItems:this.data.FamilyClassItems,
        BoolFamilyClassItems:this.data.BoolFamilyClassItems,
        Bool1ClassItems:this.data.Bool1ClassItems,
        Bool2ClassItems:this.data.Bool2ClassItems,
        Bool3ClassItems:this.data. Bool3ClassItems,
        BoolgreenClassItems:this.data.BoolgreenClassItems,
        KeyregionItems:this.data.KeyregionItems,
        VaccineItems:this.data. VaccineItems,
        VaccinecountsItems:this.data. VaccinecountsItems,
        SupplierItems:this.data. SupplierItems
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


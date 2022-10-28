// pages/leavecheck/leavecheck.js

const db = wx.cloud.database();
var that = this;
const app= getApp().appData;
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
    leaveList:[],
  },

  /**
   * 组件的方法列表
   */
  methods: {

    onLoad:function(options) {
      this.setData({
        name:app.name,
        class:app.class,
        academy:app.academy,
        
      })
    },
  

  }
})

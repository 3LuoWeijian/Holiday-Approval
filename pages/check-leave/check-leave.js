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
        advice: '',
        destination: '离校不离穗',
        checkState:false,
      },
      bindDestinationTypechange(e) {
        console.log(e.detail)
        this.setData({
          destination: e.detail.value
        })
        this.onLoad()
        console.log(this.data.destination)
      },
      
      bindAgreeTypechange(e) {
        console.log(e.detail)
        this.setData({
          checkState: Boolean(e.detail.value)
        })
        this.onLoad()
        console.log(this.data.checkState)
      },

      set: function (e) {
        this.setData({
          advice: e.detail.value
        })
        console.log(this.data.advice)
      },
      reset: function (e) {
        this.setData({
          advice: ''
        })
        console.log(e.detail.value, this.data.advice)
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
        if (app.tch_type == 'fdy') {
          var data = {
            state: "agree",
            pass_fdy: true,
            
            index_id: this.data.leaveList[e.currentTarget.dataset.index]._id,
          }
        }
        if (app.tch_type == 'xy') {
          var data = {
            state: "agree",
            pass_xy: true,
            index_id: this.data.leaveList[e.currentTarget.dataset.index]._id,
          }
        }
        if (app.tch_type == 'xsc') {
          var data = {
            state: "agree",
            pass_xsc: true,
            index_id: this.data.leaveList[e.currentTarget.dataset.index]._id,
          }
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
      onLoad(options) {

        let that = this
        if (app.tch_type == 'fdy') {
          db.collection('leave').where({
            pass_fdy: false,
            rejectedState: false,
            leaveClass:that.data.destination,
            //checkState:that.data.checkState,
            fdy_name: app.tch_name, //学生对应辅导员德功能，为了测试暂时注释掉
          }).get({
            success: function (res) {
              console.log('=', res)
              that.setData({
                leaveList: res.data
              }, () => {})
              console.log('成功', that.data.leaveList)

            }
          })
          //}
          if (app.tch_type == 'xy') {
            db.collection('leave').where({
              pass_fdy: true,
              pass_xy: false,
              rejectedState: false,

            }).get({
              success: function (res) {
                console.log('=', res)
                that.setData({
                  leaveList: res.data
                }, () => {})
                console.log('成功', that.data.leaveList)

              }
            })
          }
          if (app.tch_type == 'xsc') {
            db.collection('leave').where({
              pass_fdy: true,
              pass_xy: true,
              pass_xsc: false,
              rejectedState: false,

            }).get({
              success: function (res) {
                console.log('=', res)
                that.setData({
                  leaveList: res.data
                }, () => {})
                console.log('成功', that.data.leaveList)

              }
            })
          }
        }
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
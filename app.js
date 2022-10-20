// app.js
App({
  appData:{
    userinfo:null,
    people:"student",
    },
    onLaunch: function(){
        if(!wx.cloud){
            console.error('使用更高的基础库')
        }else{
            wx.cloud.init({
                env:'cloud1-3g2hjwqc511b3694',
                traceUser:true,
            })
        }
        this.globalData={}
    }
})

  
  


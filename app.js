//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
    // this.initCar()
  },
  globalData: {
    userInfo: null
  },
  //购物车
  cart:wx.getStorageSync('car')||[],
  //加入购物车
  addCart(id,title,price,img){
    if(this.cart.length===0){
      this.cart.push({
        id,
        title,
        price,
        img,
        count:1
      })
    }else{
      let judge=0;
      this.cart.forEach((ele)=>{
        if(ele.id===id){
          ele.count++;
          judge=1
        }
      })
      if(judge==0){
        this.cart.push({
          id,
          title,
          price,
          img,
          count: 1
        })
      }
      
    }
    console.log(this.cart)
    wx.setStorageSync('car', this.cart)
    wx.setStorage({
      key: 'car',
      data: this.cart,
      success: (res) => {
        console.log(res)
      },
      fail: (res) => {
        console.log(res)
      },
    })
    this.setBadge()
  },
  //设置购物车图标的badge
  setBadge(){
    wx.setTabBarBadge({
      index: 2,
      text: this.cart.reduce((result,item)=>{
        result+=item.count
        return result
      },0).toString(),
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  }


})
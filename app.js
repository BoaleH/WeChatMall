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

  // 自定义的状态，用于存放数据
  state: {
    //购物车
    shoppingCart: wx.getStorageSync('shoppingCar') || [], // 购物车的逻辑是：应该先从本地取数据，本地没数据再请求网络，网络没数据再重新存
  },
  
  cart:wx.getStorageSync('car')||[],
  //加入购物车
  addShoppingCar(id, title, price, img, count, whichType) {
    // 如果没有购物车数据
    if (this.state.shoppingCart.find((ele) => {
      return ele.id === id;
    })) {
      console.log('有该商品')
      // 如果购物车有该商品的数据
      this.state.shoppingCart.forEach((ele) => {
        if (ele.id === id) {
          // 判断有无这个商品类型
          let hasType = false;
          ele.list.forEach((item) => {
            if (item.whichType === whichType) {
              item.count += count;
              hasType = true;
            }
          })
          // 如果没有这个商品类型的数据
          if (hasType === false) {
            ele.list.push({
              whichType,
              price,
              count
            })
          }
        } 
      })

      // 存储购物车数据到本地
      wx.setStorageSync('shoppingCar', this.state.shoppingCart);
      console.log('加入购物车成功', this.state.shoppingCart)
      wx.showToast({
        title: '加入购物车成功',
        icon: ''
      })
    } else {
      console.log('没有该商品')
      // 如果购物车没有该商品的数据
      this.state.shoppingCart.push({
        id,
        img,
        title,
        list: [
          {
            whichType,
            price,
            count
          }
        ]
      })
      // 存储购物车数据到本地
      wx.setStorageSync('shoppingCar', this.state.shoppingCart);
      console.log('加入购物车成功', this.state.shoppingCart)
      wx.showToast({
        title: '加入购物车成功',
        icon: ''
      })
    }
  },

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
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
    openid: '',
    userInfo: null,
    _showPictureDetail: false,
    _pictureTime: '',
    _pictureAddress: '',
    //改变量用户存放全局变量修改过程中的值传递, 传递对象
    data: {}
  },

  // 自定义的状态，用于存放数据
  state: {
    //购物车
    shoppingCart: wx.getStorageSync('shoppingCar') || [], // 购物车的逻辑是：应该先从本地取数据，本地没数据再请求网络，网络没数据再重新存
    shoppingCartAllChecked: false,
    allValue: 0,
    allCount: 0,
    te: 3,
    oo: 999
  },

  // 监听购物车数据变化，因为pages和component虽然可以获取到app.js的数据，但是无法动态根据app.js的变化自动更新页面的数据渲染
  // watch(){
  //   let obj = this.state
  //   Object.defineProperty(obj, 'shoppingCart', {  // 第一个参数是对象，第二个参数是参数对象的自定义属性，第三个参数是属性描述符（也是一个对象）
  //     // value: this.state.shoppingCart // 相当于get的return this.state.shoppingCart,即把his.state.shoppingCart赋值给obj.shoppingCart
  //     writable: true, // 表示shoppingCart可以改变
  //     configrable: true, // 描述属性是否配置，以及可否删除
  //     enumerable: true, // 描述属性是否会出现在for in 或者 Object.keys()的遍历中
  //     get: function() { // 返回一个值，作为shoppingCart的属性值
  //       console.log('取值')
  //       return this.state.shoppingCart
  //     },
  //     set: function() { // 只要shoppingCart的属性值（即get return出去的数据）发生改变们就会执行里面的代码

  //     }
  //   })
  // },

  watch(method) {
    var obj = this.globalData;
    Object.defineProperty(obj, "data", {  //这里的 data 对应 上面 globalData 中的 data
      configurable: true,
      enumerable: true,
      set: function (value) {  //动态赋值，传递对象，为 globalData 中对应变量赋值
        console.log(value, 223, this)
        this._showPictureDetail = value.showPictureDetail;
        this._pictureTime = value.pictureTime;
        this._pictureAddress = value.pictureAddress;
        method(value);
      },
      get: function () {  //获取全局变量值，直接返回全部
        return this.globalData;
      }
    })
  },
  
  watch2(method, val) {
    var obj = this.state; // 创建一个对象，或者说是添加一个监听对象, 其作为Object.defineProperty的第一个参数，这个obj可以在函数外部设置，
                          // 由于指针的关系，因此这个obj就是this.state 
    console.log('进入watch2')
    Object.defineProperty(obj, "te", {  // te是obj的一个自定义属性，之后的get和set都与obj（即this.state的te）属性变化有关
      configurable: true,
      enumerable: true,
      get() { // 获取（或者说是使用this.state.te）时触发
        console.log('这是获得的this', this)
        return val  // 返回值是获取te的值，相当于实际把this.state.te赋值为7
        // 必须要有返回值，否则在使用this.state.te的时候，打印的是undefine
      },
      set(newValue) { // 设置this.state.te的时候触发，参数newValue就是新设置的this.state.te值
        console.log('这是新设立的te', newValue)
        console.log('这是最新的this', this)
      }
      
    })
  },

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
              count,
              typeChecked: false
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
        goodsChecked: false,
        list: [
          {
            whichType,
            price,
            count,
            typeChecked: false
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
    this.setBadge();
  },

  // shoppingCart所有的goodsChecked和typeChecked都不选（用于重新进入cart页的初始化）
  clearAllChecked() {
    this.state.shoppingCart.length > 0 && this.state.shoppingCart.forEach((ele) => {
      ele.goodsChecked = false;
      ele.list.length > 0 && ele.list.forEach((item) => {
        item.typeChecked = false
      })
    })
    this.state.shoppingCartAllChecked = false
  },

  // shoppingCart全选
  allChecked() {
    this.state.shoppingCart.length > 0 && this.state.shoppingCart.forEach((ele) => {
      ele.goodsChecked = true;
      ele.list.length > 0 && ele.list.forEach((item) => {
        item.typeChecked = true
      })
    })
    this.state.shoppingCartAllChecked = true
  },

  // 点击购物车全选按钮
  hindleClickAllChecked() {
    if (this.state.shoppingCartAllChecked) {
      this.state.shoppingCartAllChecked = false
      this.clearAllChecked();
    } else {
      this.state.shoppingCartAllChecked = true
      this.allChecked();
    }
  },

  // 勾选shoppingCart某一项的goodsChecked
  clickGoodsChecked(id) {
    let num = this.state.shoppingCart.length;
    this.state.shoppingCart.length > 0 && this.state.shoppingCart.forEach((ele) => {
      if (id == ele.id) {
        if (ele.goodsChecked) {
          num -= 1;
          this.state.shoppingCartAllChecked = false;
          ele.goodsChecked = false
          ele.list.length > 0 && ele.list.forEach((item) => {
            item.typeChecked = false
          })
        } else {
          ele.goodsChecked = true
          ele.list.length > 0 && ele.list.forEach((item) => {
            item.typeChecked = true
          })
        }
        console.log(this.state.shoppingCart)
      } else {
        if (!ele.goodsChecked) {
          num -= 1;
        }
      }
    })
    if (num == this.state.shoppingCart.length) {
      this.state.shoppingCartAllChecked = true;
    }
    wx.setStorageSync('shoppingCar', this.state.shoppingCart);
  },

  // 勾选shoppingCart某一项的typeChecke
  clickTypeChecked(id, whichType) {
    let allGoodsCheck = this.state.shoppingCart.length; // 定义一个变量用于统计shoppingCart有多少个goodsChecked为true
    this.state.shoppingCart.length > 0 && this.state.shoppingCart.forEach((ele) => {  // 循环外层
      if (id == ele.id) { 
        let num = ele.list.length; // 定义一个变量用于统计list有多少个checked是为true
        ele.list.length > 0 && ele.list.forEach((item) => {
          if (item.whichType == whichType) {  // 如果循环的是商品项
            if (item.typeChecked) {
              item.typeChecked = false;
              ele.goodsChecked =false;
              this.state.shoppingCartAllChecked = false
              num -= 1;
              allGoodsCheck -= 1;
            } else {
              item.typeChecked = true;
            }
          } else { // 如果循环的不是商品项
            if (!item.typeChecked) {
              num -= 1;
              allGoodsCheck -= 1;
              ele.goodsChecked = false;
              this.state.shoppingCartAllChecked = false
            }
          } 
        })
        if (num == ele.list.length) { // 如果list全部选中，则勾选goodsChecked
          ele.goodsChecked = true;
        }
      } else { // 如果循环的不是所点击的商品类
        if (!ele.goodsChecked) {
          allGoodsCheck -= 1;
        }
      }
    })
    if (allGoodsCheck == this.state.shoppingCart.length) {
      this.state.shoppingCartAllChecked = true
    }
    wx.setStorageSync('shoppingCar', this.state.shoppingCart);
  },

  // 结算(或删除)，即删除checked的goodsChecked和typeChecke
  delGoodsCheckedOrTypeChecke() {
    console.log('223')
    this.state.shoppingCart.length > 0 && this.state.shoppingCart.forEach((ele, index) => {
      if (ele.goodsChecked) {
        console.log('进入1')
        this.state.shoppingCart.splice(index, 1)
      } else {
        ele.list.length > 0 && ele.list.forEach((item, index2) => {
          console.log('进入2')
          if (item.typeChecked) {
            ele.list.splice(index2, 1)
          }
        })
      }
    })
    wx.setStorageSync('shoppingCar', this.state.shoppingCart);
    this.setBadge();
  },

  // 增加购物车商品数量
  addCount(id, whichType) {
    this.state.shoppingCart.forEach((ele) => {
      if (ele.id == id) {
        ele.list.length > 0 && ele.list.forEach((item) => {
          if (item.whichType == whichType) {
            item.count += 1;
          }
          return item
        })
      }
      return ele;
    })
    wx.setStorageSync('shoppingCar', this.state.shoppingCart);
    this.setBadge();
  },

  // 减少购物车商品数量
  lessCount(id, whichType) {
    this.state.shoppingCart.forEach((ele) => {
      if (ele.id == id) {
        ele.list.length > 0 && ele.list.forEach((item) => {
          if (item.whichType == whichType && item.count >= 2) {
            item.count -= 1;
          }
        })
      }
    })
    wx.setStorageSync('shoppingCar', this.state.shoppingCart);
    this.setBadge();
  },

  // 输入商品数量
  inputCount(id, whichType, num) {
    this.state.shoppingCart.forEach((ele) => {
      if (ele.id == id) {
        ele.list.length > 0 && ele.list.forEach((item) => {
          if (item.whichType == whichType) {
            if (/^[0-9]+$/.test(num)) {
              num = parseInt(num);
              item.count = num;
            }
          }
        })
      }
    })
    wx.setStorageSync('shoppingCar', this.state.shoppingCart);
    this.setBadge();
  },

  // 清空所有购物车
  clearAllGoods() {
    this.state.shoppingCart = [];
    this.shoppingCartAllChecked = false;
    wx.setStorageSync('shoppingCar', this.state.shoppingCart);
    this.setBadge();
  },

  // 计算选中商品数量和总价格
  goodsCount() {
    let allValue = 0;
    let allCount = 0;
    let bigNum = 0;
    let littleNum = 0;
    this.state.shoppingCart.length > 0 && this.state.shoppingCart.forEach((ele) => {
      ele.list.length > 0 && ele.list.forEach((item) => {
        if (item.typeChecked) {
          let bNum = item.price.toString();
          let arr = [];
          if (bNum.indexOf('.') > 0) {
            arr = bNum.split('.');
            bigNum += arr[0] * item.count * 10000;
            littleNum += arr[1] * item.count * 1000;
          } else {
            bigNum += item.price * item.count * 10000
          }


          // allValue += item.price * item.count;
          allCount += item.count;
        }
      })
    })
 
    allValue = (bigNum + littleNum)/10000

    this.state.allValue = allValue;
    this.state.allCount = allCount;
  },

  //设置购物车图标的badge
  setBadge(){
    let count = 0;
    this.state.shoppingCart.length > 0 && this.state.shoppingCart.forEach((ele) => {
      ele.list.length > 0 && ele.list.forEach((item) => {
        count += item.count
      })
    })
    wx.setTabBarBadge({
      index: 1,
      text: count.toString(),
      success: (res) => {},
      fail: (res) => {},
      complete: (res) => {},
    })
  },
  
  addTe() {
    this.state.te ++
    console.log(this.state.te, '增加')
  }
})
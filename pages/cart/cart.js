// pages/car/car.js
const app=getApp();


Page({

  /**
   * 页面的初始数据
   */
  data: {
    cart: [],
    shoppingCartAllChecked: false,
    allValue: 0,
    allCount: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.updateData();
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
    // 初始化让所有商品全不选
    app.clearAllChecked()
    this.updateData();
    // app.setBadge()
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

  },

  // 增加商品数量
  addGoodsNum(e) {
    let id = e.target.dataset.pid;
    let whichType = e.target.dataset.whichtype;
    app.addCount(id, whichType);
    this.updateData();
  },

  // 减少商品数量
  lessGoodsNum(e) {
    let id = e.target.dataset.pid;
    let whichType = e.target.dataset.whichtype;
    app.lessCount(id, whichType);
    this.updateData();
  },

  // 输入商品数量
  inputGoodsNum(e) {
    let id = e.target.dataset.pid;
    let whichType = e.target.dataset.whichtype;
    let num = e.detail.value;
    app.inputCount(id, whichType, num);
    this.updateData();
  },

  // 删除选中商品
  delCheckedGoods() {
    app.delGoodsCheckedOrTypeChecke()
    this.updateData()
    wx.showToast({
      title: '删除成功',
      icon: ''
    })
  },

  // 清空购物车所有商品
  clearAllGoods() {
    app.clearAllGoods()
    this.updateData()
  },

  // 结算
  checkoutGoods() {
    app.delGoodsCheckedOrTypeChecke()
    this.updateData()
    wx.showToast({
      title: '结算成功',
      icon: ''
    })
  },

  // 每做一次修改app.js数据的操作就要手动更新setData，因为页面和组件不会自动跟随app.js的数据变化而变化
  updateData(e) {
    e && console.log(e.detail) // e.detail可以获取子组件想要传给父组件的值
    app.goodsCount();
    this.setData({
      cart: app.state.shoppingCart,
      shoppingCartAllChecked: getApp().state.shoppingCartAllChecked,
      allValue: app.state.allValue,
      allCount: app.state.allCount
    })

  },

  // 获取自定义子组件，用于测试父组件调用子组件的方法
  getMyCheck() {
    // 获取子组件实例
    this.myCheck = this.selectComponent("#myCheck")
    // 调用子组件的函数
    this.myCheck.showLog()
  }
})
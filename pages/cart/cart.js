// pages/car/car.js
const app=getApp();


Page({

  /**
   * 页面的初始数据
   */
  data: {
    cart: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      cart: app.state.shoppingCart
    })
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
    this.setData({
      cart: app.state.shoppingCart
    })
    app.setBadge()
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
  addGoodsNum() {

  },

  // 减少商品数量
  lessGoodsNum() {

  },

  // 输入商品数量
  inputGoodsNum() {

  },

  // 选中一个商品项
  checkGoodsOnce() {

  },

  // 选中一类商品项
  checkGoodsType() {

  },

  // 选中所有商品项
  checkGoodsAll() {

  },

  // 结算
  checkoutGoods() {
    
  }
})
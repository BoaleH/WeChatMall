// pages/te/te.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    te: app.state.te
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    getApp().watch2(this.data.te)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成s
   */
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

  },

  // 增加te
  addte(){
    // 修改 app 全局属性值， 由于 globalData.data 是个对象，因为涉及到修改多个参数，所以需要传递对象
    this.data.te ++
    console.log(this.data.te)
    app.addTe()
    // this.updateTe()
  },

  // 更新te
  updateTe() {
    getApp().watch2(this.data.te)
  }
})
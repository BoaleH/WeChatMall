// pages/shouye/shouye.js
import { getHomeNavType } from './../../utils/server';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    navList: [],
    noTodayNavList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取导航数据
    getHomeNavType()
    .then((res) => {
      console.log(res.data.data.list);
      this.setData({
        navList: res.data.data.list,
        noTodayNavList: res.data.data.list.filter((ele) => {
          return ele.name !== '今日推荐'
        })
      });
      console.log(this.data)
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

  // 去搜索页
  toSearch() {
    wx.navigateTo({
      url: '/pages/sousuo/sousuo',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  }
})
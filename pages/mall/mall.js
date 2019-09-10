// pages/mall/mall.js
import { getGoodsNav, getMallGoodsList } from './../../utils/ajax.js'
Page({

  getNav(){
    getGoodsNav()
    .then(resp=>{
      this.setData({
        goodsNav:resp.data.data.list
      })
    })
  },

  chooseNav(e){
    getMallGoodsList(e.target.dataset.pid)
    .then(resp=>{
      this.setData({
        goodsList: resp.data.data.items.list.filter(ele=>{
          return ele.itemType==0
        })
      })
    })
    this.setData({
      chooseNavId: e.target.dataset.pid
    })
  },

  initGoodsList(){
    getMallGoodsList(1)
      .then(resp => {
        this.setData({
          goodsList: resp.data.data.items.list.filter(ele => {
            return ele.itemType == 0
          })
        })
      })
    this.setData({
      chooseNavId: 1
    })
  },

  /**
   * 页面的初始数据
   */
  data: {
    goodsNav:[],
    chooseNavId:null,
    goodsList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getNav()
    this.initGoodsList()
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
    getApp().setBadge()
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

  }
})
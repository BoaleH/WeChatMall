// pages/sousuo/sousuo.js
import {
  getHotWord,
  getGoodsType,
  getSearchGoodsList
} from './../../utils/server';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    hotWords: [],
    goodsTypes: [],
    whichInput: '',
    historySearch: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 做ajax请求获取热搜词汇
    getHotWord()
    .then((res) => {
      const hotWords = res.data.data.hotWords;
      this.setData({
        hotWords
      });
    })
    // 做ajax请求获取商品分类
    getGoodsType()
    .then((res) => {
      const goodsTypes = res.data.data.list;
      goodsTypes.shift();
      this.setData({
        goodsTypes
      })
    })
    // 从localstorage里获取历史搜索
    let historySearch = wx.getStorageSync('historySearch');
    if (historySearch && historySearch.length > 0) {
      this.setData({
        historySearch
      });
    }
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

  changeInput(e) {
    this.setData({
      whichInput: e.detail.value
    })

  },
  // 点击热门搜索
  clickHotWord(e) {
    let val = e.target.dataset.val
    this.storageHistory(val);
  },

  // 展示搜索结果商品列表
  toSearchDetail() {
    let whichInput = this.data.whichInput;
    this.storageHistory(whichInput);
    // 请求搜索结果商品列表
    let data = {
      word: whichInput, // 搜索词
      start: 0, // 0价格从低到高，1价格从高到低
      sort: 0,  // 分页，即从哪个数目开始20、40、60...
      minPrice: 0, // 最小价格
      maxPrice: 99999 // 最高价格
    }
    getSearchGoodsList(data)
    .then((res) => {
      console.log(res)
    })
    .catch((error) => {
      console.log(error)
    })

  },

  // 存储历史搜索
  storageHistory(pid) {
    // 先从locastorage里取
    let historySearch = wx.getStorageSync('historySearch');
    if (!historySearch) {
      wx.setStorageSync('historySearch', [pid]);
      console.log(wx.getStorageSync('historySearch'));
    } else {
      let arr = historySearch;
      // 先判断数组是否有这个值，没有才push
      if (arr.indexOf(pid) === -1) {
        arr.push(pid);
        wx.setStorageSync('historySearch', arr);
        console.log(wx.getStorageSync('historySearch'));
      } else {
        console.log('已有重复值');
      }
    }
  }
})
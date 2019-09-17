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
    historySearch: [],
    goodsList: [],
    nextIndex: 0,
    perpage: 0,
    total: 0,
    isEnd: false,
    nowSearch: '',
    sort: 0
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
    // 重新请求商品列表
    if (this.data.isGoodListShow) {
      let data = {
        word: this.data.whichInput, // 搜索词
        start: 0, // 分页，即从哪个数目开始20、40、60...
        sort: this.data.sort,  // 0默认，1价格最小排列，2销量最高排列
        minPrice: 0, // 最小价格
        maxPrice: 99999 // 最高价格
      }
      this.requestGoodsList(data)
    } else {
      wx.stopPullDownRefresh();
    }
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.isGoodListShow) {
      let data = {
        word: this.data.whichInput, // 搜索词
        start: this.data.nextIndex, // 分页，即从哪个数目开始20、40、60...
        sort: this.data.sort,  // 0默认，1价格最小排列，2销量最高排列
        minPrice: 0, // 最小价格
        maxPrice: 99999 // 最高价格
      }
      this.requestGoodsList(data, true)
    }
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
  getSearchGoodsList(e) {
    let whichInput = e.target.dataset.whichsearch;
    this.setData({
      whichInput
    })
    console.log(whichInput);
    this.storageHistory(whichInput);
    // 请求搜索结果商品列表
    let data = {
      word: whichInput, // 搜索词
      start: 0, // 分页，即从哪个数目开始20、40、60...
      sort: this.data.sort,  // 0默认，1价格最小排列，2销量最高排列
      minPrice: 0, // 最小价格
      maxPrice: 99999 // 最高价格
    }
    this.requestGoodsList(data)

  },

  // 请求商品列表
  requestGoodsList(data, isScrollUpdate) {
    getSearchGoodsList(data)
    .then((res) => {
      // 停止下拉刷新
      wx.stopPullDownRefresh();
      let goodsList = res.data.data.list;
      let goodsArr = [];
      // goodsArr.concat(this.data.goodsList);
      goodsList.length > 0 && goodsList.forEach((ele) => {
        // 处理商品价格的格式
        let price = ele.price + '';
        let arr = price.split('.')
        console.log(typeof price)
        ele.strongPrice = arr[0]
        ele.digitPrice = arr[1]
        if (ele.platform == 1) {
          ele.platform = '淘宝';
        } else {
          ele.platform = '天猫';
        }
        // 筛选非商品
        if (ele.price) {
          goodsArr.push(ele);
        }
      })
      console.log(res.data.data.list)
      this.setData({
        goodsList: isScrollUpdate ? goodsArr.concat(this.data.goodsList) : goodsArr,
        nextIndex: res.data.data.nextIndex,
        perpage: res.data.data.perpage,
        isEnd: res.data.data.isEnd,
        isGoodListShow: true
      })
    })
    .catch((error) => {
      console.log(error)
      // 停止下拉刷新
      wx.stopPullDownRefresh();
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
      if (arr.indexOf(pid) === -1 && pid) {
        arr.push(pid);
        wx.setStorageSync('historySearch', arr);
        console.log(wx.getStorageSync('historySearch'));
      } else {
        console.log('已有重复值');
      }
    }
  },

  // 修改sort
  changeTab(e) {
    // console.log(e.detail)
    this.setData({
      sort: e.detail
    })
    // 请求商品列表
    let data = {
      word: this.data.whichInput, // 搜索词
      start: 0, // 分页，即从哪个数目开始20、40、60...
      sort: this.data.sort,  // 0默认，1价格最小排列，2销量最高排列
      minPrice: 0, // 最小价格
      maxPrice: 99999 // 最高价格
    }
    this.requestGoodsList(data)
  },

  // 返回按钮的点击事件
  backButton() {
    console.log(1)
    if (this.data.isGoodListShow) {
      console.log(2)
      this.setData({
        isGoodListShow: false
      })
    } else {
      console.log(3)
      wx.switchTab({
        url: '/pages/home/home',
      })
    }
  }
})
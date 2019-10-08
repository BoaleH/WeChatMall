// pages/shouye/shouye.js
import { 
  getHomeNavType,
  getGoodsListByNav,
  getAddressCity,
  getHomeShowData,
  getMoreGoodsList

} from '../../utils/server';
import handleGoodsList from '../../utils/handleGoodsList'

const app=getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    navList: [],
    noTodayNavList: [],
    isNavImgShow: false,
    isTypeNavShow: false,
    typeNavList: [],
    goodsList: [],
    nowCity: '定位中...',
    banners: [],
    sortType: 1,  // 当前商品列表类别
    nextIndex: 20, // 分页
    loadmorePrompt: '加载中...',
    isEnd: false  // 分页是否到尽头
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取导航数据
    this.getHomeNavType();
    // 获取当前城市
    this.getCity();
    // 每一个tabbar页面初始化都要调用setBadge才会显示tabbar的badge
    app.setBadge();
    // 获取首页数据展示
    this.getHomeShowData();
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
    console.log('下拉刷新')
    this.reLoad()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log('上拉加载更多')
    // 加载更多
    this.getMoreGoodsList()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  // 获取导航数据
  getHomeNavType() {
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

  // 获取定位城市
  getCity() {
    wx.getLocation({
      type: '',
      altitude: true,
      success: (res) => {
        const { latitude, longitude } = res;
        getAddressCity(latitude, longitude)
        .then((res) => {
          console.log(res.data.result.address_component.city)
          this.setData({
            nowCity: res.data.result.address_component.city
          })
        })
      }
    })
  },

  // 获取首页展示数据
  getHomeShowData() {
    getHomeShowData()
    .then((res) => {
      let data = res.data.data;
      let goodsList = handleGoodsList(data.items.list);
      this.setData({
        banners: data.banners,
        goodsList,
        sortType: 1,
        nextIndex: data.items.nextIndex,
        isEnd: data.items.isEnd
      })
      console.log(res.data.data)
    })
  },

  // 加载更多商品
  getMoreGoodsList() {
    console.log(this)
    let sortType = this.data.sortType;
    let nextIndex = this.data.nextIndex;
    console.log(sortType, nextIndex)
    if (!this.data.isEnd) {
      getMoreGoodsList(sortType, nextIndex)
      .then((res) => {
        console.log(res)
        console.log(res.data.data)
        let arr = handleGoodsList(res.data.data.list)
        let goodsList = this.data.goodsList.concat(arr)
        this.setData({
          nextIndex: res.data.data.nextIndex,
          isEnd: res.data.data.isEnd,
          goodsList
        })
      })
    } else {
      this.setData({
        loadmorePrompt: '已经加载所有商品'
      })
    }
  },

  // 下拉刷新
  reLoad() {
    let id = this.data.sortType;
    getGoodsListByNav(id)
    .then((res) => {
      // 停止下拉刷新
      wx.stopPullDownRefresh();
      let items = res.data.data.items;
      let goodsList = handleGoodsList(items.list);
      this.setData({
        goodsList,
        isEnd: items.isEnd,
        nextIndex: items.nextIndex
      })
    })
  },

  // 去搜索页
  toSearch() {
    wx.navigateTo({
      url: '/pages/search/search',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },

  // 点击导航
  clickNav(e) {
    let id;
    if (e.target.dataset.pid) {
      id = e.target.dataset.pid
    } else {
      id = e.currentTarget.dataset.pid
    }
    console.log(id)
    getGoodsListByNav(id)
    .then((res) => {
      console.log(res.data.data.items.list)
      console.log(res.data.data.categories)
      this.setData({
        goodsList: handleGoodsList(res.data.data.items.list),
        typeNavList: res.data.data.categories,
        isTypeNavShow: true,
        isNavImgShow: false,
        sortType: id,
        nextIndex: 20,
        isEnd: res.data.data.items.isEnd
      })
    })
  },

  // 展示图片导航
  showNavImg() {
    this.setData({
      isNavImgShow: true
    })
  },

  // 隐藏图片导航
  hideNavImg() {
    this.setData({
      isNavImgShow: false
    })
  }

})
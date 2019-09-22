// pages/shouye/shouye.js
import { 
  getHomeNavType,
  getGoodsListByNav,
  getAddressCity

} from '../../utils/server';
import handleGoodsList from '../../utils/handleGoodsList'

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
    nowCity: '定位中...'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取导航数据
    this.getHomeNavType();
    // 获取当前城市
    this.getCity();
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
    console.log('sdadd')
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
        isNavImgShow: false
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
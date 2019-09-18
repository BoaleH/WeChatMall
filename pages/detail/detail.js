// pages/detail/detail.js
import {
  getGoodDetail
} from './../../utils/server';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: 0,
    photo: [],
    title: '',
    descContentList: [],
    priceStrong: '',
    priceLittle: '',
    originPrice: 0,
    saleNum: 0,
    // typeArr: ['','','',''],
    typeArr: [
      {
        title: '套餐一',
        highLight: false
      },
      {
        title: '套餐二',
        highLight: false
      },
      {
        title: '套餐三',
        highLight: false
      },
      {
        title: '套餐四',
        highLight: false
      }
    ],
    count: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let id = options.id
    this.setData({
      id
    })
    getGoodDetail(14819870)
    .then((res) => {
      console.log(res.data.data.detail);
      let detail = res.data.data.detail;
      let priceStr = detail.price + '';
      let priceArr = priceStr.split('.');
      this.setData({
        photo: detail.photo,
        title: detail.title,
        descContentList: detail.descContentList.filter((ele) => {
          return ele.photo.width === 790
        }),
        priceStrong: priceArr[0],
        priceLittle: priceArr[1] ? priceArr[1] : '',
        originPrice: detail.originPrice,
        saleNum: detail.saleNum
      })
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

  // 输入数量
  inputCount(e) {
    console.log(e.detail.value)
    if (/^[0-9]+$/.test(e.detail.value)) {
      console.log('全是数字')
      this.setData({
        count: e.detail.value
      })
    } else {
      console.log('非纯数字')
      let nowCount = this.data.count;
      this.setData({
        count: nowCount
      })
    }
  },

  // 减少数量
  subtractCount() {
    let nowCount = -- this.data.count;
    this.setData({
      count: nowCount
    })
  },

  // 增加数量
  addCount() {
    let nowCount = ++ this.data.count;
    this.setData({
      count: nowCount
    })
  },

  // 点击类型
  clickType(e) {
    console.log(e.target.dataset.index)
    let arr = JSON.parse(JSON.stringify(this.data.typeArr));
    arr[e.target.dataset.index].highLight = true;
    this.setData({
      typeArr: arr
    })
  }
})
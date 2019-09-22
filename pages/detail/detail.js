// pages/detail/detail.js
import {
  getGoodDetail
} from './../../utils/server';

let app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    pid: 0,
    photo: [],
    title: '',
    descContentList: [],
    priceStrong: '',
    priceLittle: '',
    originPrice: 0,
    saleNum: 0,
    typeArr: [
      {
        title: '套餐一',
        highLight: true
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
    count: 1, // 默认购买数量为1
    whichType: '套餐一', // 默认套餐一
    img: '',
    price: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getGoodDetail(options.id);
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

  // 获取详情数据
  getGoodDetail(id) {
    getGoodDetail(id)
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
        saleNum: detail.saleNum,
        price: detail.price,
        img: detail.image,
        pid: detail.id
      })
    })
  },

  // 输入数量
  inputCount(e) {
    let val = e.detail.value;
    if (/^[0-9]+$/.test(val)) {
      val = parseInt(val);
      console.log(typeof val, val)
      console.log('全是数字')
      this.setData({
        count: val
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
    let nowCount = this.data.count;
    if (nowCount >= 2) {
      -- nowCount;
      this.setData({
        count: nowCount
      })
    }
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
    let arr = JSON.parse(JSON.stringify(this.data.typeArr));
    // 先将所有的类型全部设为未选择
    arr.forEach((ele, index) => {
      ele.highLight = false;
      // 将所选的类型设置高亮，并设置当前所选类型
      if (index == e.target.dataset.index) {
        ele.highLight = true;
        this.setData({
          whichType: ele.title
        })
      }
    })
    this.setData({
      typeArr: arr
    })
  },

  // 加入购物车
  addCart() {
    let id = this.data.pid;
    let title = this.data.title;
    let price = this.data.price;
    let img = this.data.img;
    let count = this.data.count;
    let whichType = this.data.whichType;
    app.addShoppingCar(id, title, price, img, count, whichType);
  }
})
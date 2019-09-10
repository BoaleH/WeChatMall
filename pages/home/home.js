// pages/home/home.js
Page({



  toSearch:()=>{
    wx.navigateTo({
      url: '/pages/search/search',
    })
  },

  getAddress(){
    wx.getLocation({
      type: '',
      altitude: true,
      success: (res) => {
        console.log(res)
        const { latitude, longitude } =res
        const key = 'PF5BZ-RCZ6X-HQX4P-ZIZBG-UWGKQ-CYFF5'
        wx.request({
          url: `https://apis.map.qq.com/ws/geocoder/v1/?location=${latitude},${longitude}&key=${key}&get_poi=1`,
          data: '',
          header: {},
          method: 'GET',
          dataType: 'json',
          responseType: 'text',
          success: (res) => {
            console.log(res.data.result.ad_info.city)
            this.setData({
              positionCity: res.data.result.ad_info.city,
              hasPositionSuccess:1
            })
          },
        })
      }
    })
  },


  /**
   * 页面的初始数据
   */
  data: {
    positionImg:'./../../icon/position.png',
    positionCity:'定位中...',
    hasPositionSuccess:0,
    swiperImg: [
      'http://img1.lukou.com/static/p/commodity/img/20190422-105814.jpeg',
      'http://img1.lukou.com/static/p/commodity/img/20190417-100001.jpeg'
      ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getAddress()
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
// pages/map/map.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    markers: [{ // 地图标记点
      iconPath: "/icon/address.png",
      id: 0,
      latitude: 22.71991,
      longitude: 114.24779,
      width: 50,
      height: 50
    }],
    polyline: [{  // 地图划线
      points: [{
        longitude: 114.24779,
        latitude: 22.71991
      }, {
        longitude: 114.24765,
        latitude: 22.61991
      }],
      color: "#FF0000DD",
      width: 2,
      dottedLine: false
    }],
    controls: [{  // 地图控制按钮，一般在这里做一些点击事件的操作
      id: 1,
      iconPath: '/icon/control.png',
      position: {
        left: 0,
        top: 300 - 50,
        width: 50,
        height: 50
      },
      clickable: true
    }],
    ClipboardData: ''
  },
  regionchange(e) { // 地图视野变化触发的事件
    console.log(e.type)
  },
  markertap(e) {  // 点击标记点的事件处理
    console.log(e.markerId)
  },
  controltap(e) { // 点击地图控制按钮触发的事件
    console.log(e.controlId)
    wx.openLocation({
      latitude: 23.71991,
      longitude: 114.24779,
      scale: 14,
      name: '深圳公园',
      address: '这是地址的详细说明，如6巷8号',
      success: function(res) {
        console.log(res)
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  openActionSheet(){
    wx.showActionSheet({
      itemList: [
        '工作项1',
        '工作项2',
        '工作项3'
      ],
      itemColor: '#f00',
      success: function(res) {
        console.log(res.tapIndex)
        switch(res.tapIndex) {
          case 0:
            console.log('这是工作项1');
            break;
          case 1:
            console.log('这是工作项2');
            break;
          case 2:
            console.log('这是工作项3');
            break;
        }
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  // 拨打电话
  phoneCall() {
    wx.makePhoneCall({
      phoneNumber: '13222222222', // 自定义电话号码
      success: function(res) {
        console.log(res)
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  // 添加到通讯录
  addContact() {
    wx.addPhoneContact({
      photoFilePath: '',
      nickName: '',
      lastName: '',
      middleName: '',
      firstName: '黄博',
      remark: '',
      mobilePhoneNumber: '13222222222',
      weChatNumber: '',
      addressCountry: '',
      addressState: '',
      addressCity: '',
      addressStreet: '',
      addressPostalCode: '',
      organization: '',
      title: '',
      workFaxNumber: '',
      workPhoneNumber: '',
      hostNumber: '',
      email: '',
      url: '',
      workAddressCountry: '',
      workAddressState: '',
      workAddressCity: '',
      workAddressStreet: '',
      workAddressPostalCode: '',
      homeFaxNumber: '',
      homePhoneNumber: '',
      homeAddressCountry: '',
      homeAddressState: '',
      homeAddressCity: '',
      homeAddressStreet: '',
      homeAddressPostalCode: '',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  // 复制到剪贴板
  setClipboard() {
    wx.setClipboardData({
      data: '深圳市中兴科技大厦',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  // 获取剪贴板的内容
  getClipboard() {
    console.log(222)
    wx.getClipboardData({
      success: (res) => {
        console.log(res)
        this.setData({
          ClipboardData: res.data
        })
      },
      fail: (res) => {},
      complete: (res) => {},
    })
  },
  // 获取用户信息
  getUserInfo(e) {
    console.log(e)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.getLocation({
      type: '',
      altitude: true,
      success: (res) => {
        console.log(res);
        // this.setData({
        //   markers: [{
        //     iconPath: "/icon/address.png",
        //     id: 0,
        //     latitude: res.latitude,
        //     longitude: res.longitude,
        //     width: 50,
        //     height: 50
        //   }]
        // })
      },
      fail: (res) => {},
      complete: (res) => {},
    })
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

  }
})
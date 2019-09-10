// pages/search/search.js
//引入封装好的ajax方法
import { getHotSearch} from './../../utils/ajax.js'

import { getSearchGoodsList } from './../../utils/ajax.js'

Page({

  printSearch(){
    getHotSearch()        //调用封装好的ajax方法，是基于promise的
    .then(resp=>{
      console.log(resp)
    })
  },

  //搜索框输入事件，改变inputValue
  inp(e){

    this.setData({
      inputValue: e.detail.value
    })
  },

  //获取最近搜索
  getRecentSearch(){
    wx.getStorage({
      key: 'recentSearch',
      success: (res)=> { 

        this.setData({
          recentSearch: res.data
        })
      },
      fail: (res)=> {
        console.log(res)
        console.log(this.data.recentSearch)
      },

      complete: (res)=> {},
    })
  },

  //点击热门搜索词，改变input值
  clickHotWord(e){
    this.setData({
      inputValue: e.target.dataset.hotword
    })
  },


  //点击搜索，跳转到搜索页，并存储最近搜索到localstorage
  toSearchList(){
    this.setData({
      isHotSearchShow:false       //隐藏热门搜索，显示搜索出来的商品列表
    })

    let arr = this.data.recentSearch.slice(0)   //拷贝recentSearch
    //去重后再存进recentSearch
    if (arr.indexOf(this.data.inputValue)===-1){
      arr.push(this.data.inputValue)
    }


    this.setData({
      recentSearch:arr
    })

    wx.setStorage({
      key: 'recentSearch',
      data: this.data.recentSearch,
      success: (res)=> {
        console.log(res)
      },
      fail: (res)=> {
        console.log(res)
      },
      complete: (res)=> {},
    })

    getSearchGoodsList(this.data.inputValue)
    .then(resp=>{
      this.setData({
        perpage: resp.data.data.perpage,
        nextIndex: resp.data.data.nextIndex,
        isEnd: resp.data.data.isEnd,
        goodsList: resp.data.data.list
      })
    })
  },

  /**
   * 页面的初始数据
   */
  data: {
    hotWords:[],
    recentSearch:[],
    inputValue:'',
    isHotSearchShow:true,
    perpage:0,
    nextIndex:0,
    isEnd:false,
    goodsList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取热门搜索
    getHotSearch()
    .then(resp=>{
      this.setData({
        hotWords: resp.data.data.hotWords
      })
    })
    //获取最近搜索
    this.getRecentSearch()

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

  }
})
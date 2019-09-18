
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    goodsList: Array,
    isSortBarShow: Boolean
  },


  pageLifetimes: {

  },

  /**
   * 组件的生命周期
   */
  lifetimes: {
 
  },

  
  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 改变排序方式
    changeTab(e) {
      // 触发自定义事件，改变父组件的sort
      this.triggerEvent("changeSort", e.target.dataset.tab);
    },

    // 跳转去详情
    toDetail(e) {
      let id = e.target.dataset.pid || e.currentTarget.dataset.pid;
      console.log(id);
      wx.navigateTo({
        url: `/pages/detail/detail?id=${id}`
      })
    }
  }
})

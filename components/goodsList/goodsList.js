const app = getApp()

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    searchWord:String,
    perpage: String,
    nextIndex: String,
    isEnd:Boolean,
    goodsList:Array
  },




  /**
   * 组件的生命周期
   */
  lifetimes: {
    attached() { 

      let getgoodsList=setInterval(()=>{
        if (this.properties.goodsList.length!=0){
          this.initProductList()
          clearInterval(getgoodsList)
        }
      },500)
    }
  },

  
  /**
   * 组件的初始数据
   */
  data: {
    hotWords: 'dsad',
    productList: []
  },

  /**
   * 组件的方法列表
   */
  methods: {
    p(){
      console.log(this.properties)
      this.properties.hotWords='333'
      console.log(this.data)
    },
    
    initProductList() {
      let arr = this.properties.goodsList.slice(0)
      arr=arr.filter((ele) => {
        return ele.itemType == 0
      })
      this.productList=arr.slice(0)
    },
    //转去详情页
    toDetail(e){
      console.log(e.currentTarget.dataset.pid)
      wx.navigateTo({
        url: `/pages/detail/detail?id=${e.currentTarget.dataset.pid}`,
        success: function(res) {},
        fail: function(res) {},
        complete: function(res) {},
      })
    },
    //添加购物车
    addCar(e){
      console.log(e.target.dataset.pid)
      let id = e.target.dataset.pid
      let title = e.target.dataset.title
      let price = e.target.dataset.price
      let img = e.target.dataset.img
      app.addCart(id,title,price,img)
      wx.showToast({
        title: '添加购物车成功',
        icon: 'success',
        image: '',
        duration: 1000,
        mask: true,
      })
    }
  }
})

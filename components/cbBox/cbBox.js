// components/cbBox/cbBox.js
const app = getApp();

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    ischecked: Boolean, // 是否选中
    pid: String,  // 商品id
    whichtype: String, // 商品类别
    btntype: String // 按钮种类，商品大类按钮goodsChecked，商品单项按钮typeChecked，商品全选按钮allchecked
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
    hindleClick() {
      if (this.properties.btntype === 'goodsChecked') {
        console.log('商品大类按钮')
        app.clickGoodsChecked(this.properties.pid)
      } else if (this.properties.btntype === 'typeChecked') {
        console.log('商品单项按钮')
        app.clickTypeChecked(this.properties.pid, this.properties.whichtype)
      } else {
        console.log('商品全选按钮')
        app.hindleClickAllChecked(this.properties.ischecked)
      }
      // 触发自定义事件, 以调用父组件的方法
      this.triggerEvent('updateCart', '这是要传给父组件的值')
    },

    // 用于测试父组件调用子组件的方法
    showLog() {
      console.log('测试')
    }
  }
})

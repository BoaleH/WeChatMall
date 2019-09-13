const baseURL='http://www.xiongmaoyouxuan.com'          //创建基本的baseURL

class Ajax{                       //创建一个类，相当于是创建一个构造函数

  get(url,data){                  //get方法

    wx.showLoading({              //loading状态，让页面在请求数据的时候显示loading状态
      title: '加载中',
      mask: true,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })


    return new Promise((resolve,reject)=>{      //返回一个Promise对象

      wx.request({                    //配合微信的wx.request方法
        url: baseURL+url,
        data: data || {},             //如果没有传data，默认为一个空对象
        method: 'GET',
        dataType: 'json',
        responseType: 'text',
        success: (res)=> {
          resolve(res)                //请求成功，执行resolve，传递res  (这样promise对象执行then就可以获取ajax请求到的数据)
         },

        fail: (res) => {              //请求失败，执行reject，传递res  (这样promise对象执行catch就可以获取失败的原因)
          reject(res)                 //实际项目中这里还会统一做错误处理
         },
        
        complete: (res) => {          //请求完成
          wx.hideLoading()            //关闭loading状态
        },
      })
    })
  }

  post(url,data){                               //post方法

    wx.showLoading({                            //loading状态，让页面在请求数据的时候显示loading状态
      title: '加载中',
      mask: true,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })

    return new Promise((resolve, reject) => {   //返回一个Promise对象

      wx.request({                              //配合微信的wx.request方法
        url: baseURL + url,
        data: data || {},                        //如果没有传data，默认为一个空对象
        method: 'POST',
        dataType: 'json',
        responseType: 'text',
        success: (res) => {                     //请求成功，执行resolve，传递res  (这样promise对象执行then就可以获取ajax请求到的数据)
          resolve(res)
         },
        
        fail: (res) => {                        //请求失败，执行reject，传递res  (这样promise对象执行catch就可以获取失败的原因)
          reject(res)                           //实际项目中这里还会统一做错误处理
        },

        complete: (res) => {                    //请求完成
          wx.hideLoading()                      //关闭loading状态
        },

      })
    })
  }

}


const ajax=new Ajax()                   //创建一个Ajax的实例


export default ajax               //如果想在page中使用Ajax的实例，则写这一句，new Ajax()返回的是一个Ajax实例，是promise对象
                                        //这句不写都可以

//获取热搜
export const getHotSearch=()=>{         //如果想在page里直接用ajax方法，像以前用axios一样，可以直接export请求函数即可
  return ajax.get('/api/search/home')
}


//获取搜索出的商品列表
export const getSearchGoodsList = (word) => {         //如果想在page里直接用ajax方法，像以前用axios一样，可以直接export请求函数即可
  return ajax.get(`/api/search?word=${word}&start=40&sort=0&couponOnly=NaN&minPrice=0&maxPrice=99999`)
}


//获取商品导航栏
export const getGoodsNav = () => {         //如果想在page里直接用ajax方法，像以前用axios一样，可以直接export请求函数即可
  return ajax.get(`/api/tabs?sa=`)
}


//获取mall商品列表
export const getMallGoodsList = (id) => {         //如果想在page里直接用ajax方法，像以前用axios一样，可以直接export请求函数即可
  return ajax.get(`/api/tab/${id}?start=0`)
}


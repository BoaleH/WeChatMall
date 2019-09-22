import ajax from './ajax.js';

// 获取定位城市
export const getAddressCity = (latitude, longitude) => {
  let key = 'PF5BZ-RCZ6X-HQX4P-ZIZBG-UWGKQ-CYFF5' // 腾讯地图的应用使用码
  return ajax.get(`https://apis.map.qq.com/ws/geocoder/v1/?location=${latitude},${longitude}&key=${key}&get_poi=1`, {}, true)
} 

// 获取首页导航类别
export const getHomeNavType = (data) => {
  return ajax.get('/api/tabs?sa=')
}

// 获取热搜
export const getHotWord = (data) => {
  return ajax.get('/api/search/home');
}

// 获取商品分类
export const getGoodsType = (data) => {
  return ajax.get('/api/tabs?sa=');
}

// 获取搜索结果商品列表
export const getSearchGoodsList = (data) => {
  return ajax.get('/api/search', data)
}

// 点击导航请求商品列表
export const getGoodsListByNav = (id) => {
  return ajax.get(`/api/tab/${id}?start=0`)
}

// 获取商品详情
export const getGoodDetail = (id) => {
  return ajax.get(`/api/detail?id=${id}&normal=1&sa=`)
}
import ajax from './ajax.js';

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
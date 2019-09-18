const handleGoodsList = (goodsList) => {
  let goodsArr = [];
  goodsList.length > 0 && goodsList.forEach((ele) => {
    // 处理商品价格的格式
    let price = ele.price + '';
    let arr = price.split('.')
    ele.strongPrice = arr[0]
    ele.digitPrice = arr[1]
    if (ele.platform == 1) {
      ele.platform = '淘宝';
    } else {
      ele.platform = '天猫';
    }
    // 筛选非商品
    if (ele.price) {
      goodsArr.push(ele);
    }
  })
  return goodsArr;
}

export default handleGoodsList
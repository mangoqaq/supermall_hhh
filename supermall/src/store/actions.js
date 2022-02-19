import {
  ADD_COUNTER,
  ADD_TO_CART
} from './mutation-types'


export default {
  addCart(context, payload) {
    // console.log('--context--',context);
    // console.log('--payload--',payload);
    // 判断商品是否已经在数组中，如果在，则增加数量，否则增加该商品信息到数组中
    // 方法1 
    // let oldProduct = null
    // state.cartList.push(payload)
    // for(let item of state.cartList){
    //     if (item.iid === payload.iid){
    //         oldProduct = item
    //     }
    // }
    // if(oldProduct){
    //     oldProduct.count+=1
    // }else{
    //     payload.count = 1
    //     state.cartList.push(payload)
    // }
    // 方法2
    // let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
    // if (oldProduct) {
    //   context.commit(ADD_COUNTER, oldProduct)
    //   // oldProduct.count +=1
    // } else {
    //   payload.count = 1
    //   context.commit(ADD_TO_CART, payload)
    //   // state.cartList.push(payload)
    // }
    // 使用promise封装方法2
    return new Promise((resolve, reject) => {
      let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
      if (oldProduct) {
        context.commit(ADD_COUNTER, oldProduct)
        resolve('当前商品数量加一')
      } else {
        payload.count = 1
        context.commit(ADD_TO_CART, payload)
        resolve('添加了新的商品')
      }
    })
  }
}

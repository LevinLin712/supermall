import {
  ADD_COUNTER,
  ADD_TO_CART
} from './mutations_types.js'
  
  
export default{
  // mutations唯一的目的就是修改state中状态
  // mutations中的每个方法尽可能完成的事件比较单一一点
  // addCart(state,payload){
  //   // 1.查找之前数组中是否有商品
  //   let oldProduct = state.cartList.find(item => item.iid === payload.iid)
    
  //   // 2.判断oldProduct
  //   if(oldProduct){
  //     oldProduct.count += 1
  //   }else{
  //     payload.count = 1
  //   state.cartList.push(payload)
  //   }
  // }
  [ADD_COUNTER](state,payload){
    payload.count++
  },
  [ADD_TO_CART](state,payload){
    payload.checked = true
  state.cartList.push(payload)
  }
}
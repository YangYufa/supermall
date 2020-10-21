const actions = {
  //context解构
  addToCart({state, commit}, payload) {
    return new Promise((resolve,reject)=>{
      let oldProduct = state.cartList.find(item => {
        return item.iid === payload.iid
      })
      if (oldProduct) {
        commit('addCount', oldProduct)
        resolve('当前商品数量+1')
      } else {
        commit('addCart', payload)
        resolve('添加了新商品')
      }
    })
  }
}

export default actions

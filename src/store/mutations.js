const mutations={
  addCart(state,payload){
    payload.count = 1
    payload.checked = true
    state.cartList.push(payload)
  },
  addCount(state,payload){
    payload.count++
  }
}

export default mutations

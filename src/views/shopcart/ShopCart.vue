<template>
  <div class="shop-cart">
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>
<!--    要有插槽才能放中间-->
    <cart-list class="cart-list">
      <scroll class="content" ref="scroll">
        <cart-list-item class="cart-list-item" v-for="(item,index) in cartList" :key="index" :product="item"></cart-list-item>
      </scroll>
    </cart-list>
    <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>

<script>
  import NavBar from '../../components/common/navbar/NavBar'
  import Scroll from '../../components/common/scroll/Scroll'
  import CartList from './childComps/CartList'
  import CartListItem from './childComps/CartListItem'
  import CartBottomBar from './childComps/CartBottomBar'

  import {mapGetters} from 'vuex'

  export default {
    name: "ShopCart",
    components:{
      NavBar,
      CartList,
      CartListItem,
      Scroll,
      CartBottomBar
    },
    computed:{
      ...mapGetters([
        'cartLength',
        'cartList'
      ])
    },
    mounted() {
      console.log(this.$store.getters.cartList)
    },
    activated() {
      this.$refs.scroll.refresh()
    }
  }
</script>

<style scoped>
  .nav-bar{
    background-color: var(--color-tint);
    color: #fff;
    font-weight: 700;
  }
  .shop-cart{
    height: 100vh;
    /*要被内容撑到足够才能100%*/
    /*height: 100%;*/
  }
  .cart-list{
    height: calc(100% - 44px - 49px - 40px)
  }
  .content{
    height: 100%;
    overflow: hidden;
  }
</style>

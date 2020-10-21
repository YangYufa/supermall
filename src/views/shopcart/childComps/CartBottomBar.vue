<template>
  <div class="cart-bottom-bar-container">
    <div class="button-content">
      <check-button class="check-button" :is-checked="isSelectAll" @click.native="checkAll"></check-button>
      <span>全选</span>
    </div>
    <div class="price">
      合计:{{totalPrice}}
    </div>
    <div class="calculate" @click="calcClick">
      去计算:{{checkLength}}
    </div>
  </div>
</template>

<script>
  import CheckButton from '../../../components/common/checkButton/CheckButton'
  import {mapGetters} from 'vuex'

  export default {
    name: "CartBottomBar",
    components: {
      CheckButton
    },
    computed:{
      ...mapGetters([
        'cartLength',
        'cartList'
      ]),
      totalPrice(){
        return '￥' + this.$store.state.cartList.filter(item=>{
          return item.checked
        }).reduce((preValue,item)=>{
          return preValue + item.price * item.count
        },0).toFixed(2)
      },
      checkLength(){
        return this.$store.state.cartList.filter(item=>{
          return item.checked
        }).length
      },
      isSelectAll(){
        // 1.
        if(this.cartList.length === 0){
          return false
        }
        /*for(let item of this.cartList){
          if(!item.checked){
            return false
          }
        }
        return true*/
        //这些对数组的方法，如果数组为空是不进行操作的
        // 2.
        // return !this.cartList.filter(item=>!item.checked).length
        // 3.
        // return !this.cartList.find(item=>!item.checked)
        // 4.
        // return !this.cartList.some(item=>!item.checked)
        // 5.
        return this.cartList.every(item=>item.checked)
      }
    },
    methods:{
      checkAll(){
        if(this.isSelectAll){
          this.cartList.forEach(item=>item.checked = false)
        }
        else{
          this.cartList.forEach(item=>item.checked = true)
        }
      },
      calcClick(){
        if(!this.checkLength){
          this.$toast.show('请选择购买的商品',2000)
        }
      }
    }
  }
</script>

<style scoped>
  .cart-bottom-bar-container {
    height: 40px;
    background-color:#e7e7e7;
    /*position: relative;
    bottom: 40px;*/
    line-height: 40px;
    display: flex;
    justify-content: space-between;
    font-size: 14px;
  }
  /*这里可以这么理解，上面的行高让右边的span居中了，下面的center让flex的两个对其了，但是div里面的图片
  还没有对其，用line-height再对其*/
  .button-content{
    display: flex;
    align-items: center;
    font-size: 12px;
  }
  .check-button{
    line-height: 20px;
  }
  .calculate{
    width: 80px;
    background-color: var(--color-tint);
    text-align: center;
  }
  .price{
    flex: 1;
    margin-left: 20px;
  }
</style>

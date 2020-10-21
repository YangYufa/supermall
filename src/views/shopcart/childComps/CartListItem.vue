<template>
  <div class="cart-list-item">
    <div class="check-button">
      <check-button :is-checked="product.checked" @click.native="checkListItem"></check-button>
    </div>
    <div class="item-img">
      <img v-lazy="product.image" alt="">
    </div>
    <div class="item-info">
      <div class="item-title">{{product.title}}</div>
      <div class="item-desc">{{product.desc}}</div>
      <div class="info-bottom clear-fix">
        <div class="item-price left">￥{{product.price}}</div>
        <div class="item-count right">x{{product.count}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import CheckButton from '../../../components/common/checkButton/CheckButton'

  export default {
    name: "cartListItem",
    props:{
      product:{
        type:Object,
        default(){
          return null
        }
      }
    },
    components:{
      CheckButton
    },
    mounted() {
    },
    methods:{
      checkListItem(){
        this.product.checked = !this.product.checked
      }
    }
  }
</script>

<style scoped>
  .cart-list-item{
    display: flex;
    padding: 8px;
    width: 100%;
    border-bottom: 1px solid #d5d5d5;
  }
  .item-img img{
    width: 80px;
    height: 100px;
    border-radius: 5px;
    margin-right: 10px;
  }
  .item-info{
    position: relative;
    /*竟然要overflow：hidden省略号才能起作用，好像是flex弄的*/
    overflow: hidden;
  }
  .item-title, .item-desc {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .item-title{
    color: #4c4c4c;
    font-size: 16px;
    padding-bottom: 16px;
  }
  .item-desc{
    font-size: 14px;
    color: #7e7e7e;
  }
  .info-bottom{
    position: absolute;
    bottom: 10px;
    flex: 0;
    width: 100%;
  }
  .item-price{
    color:#ff5111;
  }
  .check-button{
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>

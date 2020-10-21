<template>
  <div class="check-button-container" :class="{checked:isChecked}">
    <img src="~assets/img/cart/tick.svg" alt="">
  </div>
</template>

<script>
  export default {
    name: "checkButton",
    props:{
      isChecked:{
        type:Boolean,
        default:false
      }
    }
  }
</script>

<style scoped>
  .check-button-container{
    border-radius: 50%;
    border:solid 2px #ccc;
    width: 18px;
    height: 18px;
    cursor: pointer;
  }
  /*为什么这里设置border-radius不能把它变圆，而要设置外层div*/
  .check-button-container img{
    /*width: 16px;
    height: 16px;
    border-radius: 50%;*/
  }
  .checked{
    /*图片就一个√，背景是透明的*/
    background-color: #ff8198;
    border-color: #ff8198;
  }
</style>

<template>
  <div class="good-info" v-if="Object.keys(detailInfo).length !==0">
    <div class="info-desc clear-fix">
      <div class="start"></div>
      <div class="desc">{{detailInfo.desc}}</div>
      <div class="end"></div>
    </div>
    <div class="info-key">{{detailInfo.detailImage[0].key}}</div>
    <div class="info-list">
      <!--如果没判断detailInfo存不存在，会有很多问题-->
      <img alt="" v-for="(item,index) in detailInfo.detailImage[0].list" v-lazy="item" @load="imageLoad">
    </div>
  </div>
</template>

<script>
  export default {
    name: "DetailGoodInfo",
    props:{
      detailInfo:{
        type:Object,
        default(){
          return {}
        }
      }
    },
    data(){
      return {
        imageCounter:0,
        imageLength:0
      }
    },
    watch:{
      detailInfo(){
        this.imageLength = this.detailInfo.detailImage[0].list.length
      }
    },
    methods:{
      imageLoad(){
        if(++this.imageCounter === this.imageLength){
          this.$emit('imageLoad')
        }
      }
    }
  }
</script>

<style scoped>
  .good-info{
    padding:15px 0;
    border-bottom: 4px solid #f2f2f4;
  }
  /*搞半天原来是class重名了,之前那个忘记添加scoped了*/
  .info-list img{
    width: 100%;
  }
  .info-desc{
    padding: 0 8px;
  }
  .info-desc .desc{
    padding: 8px 0;
    font-size: 14px;
  }
  .info-key {
    margin: 10px 0 10px 15px;
    color: #333;
    font-size: 15px;
  }

  .info-desc .start,.info-desc .end{
    width: 90px;
    height: 2px;
    background-color: #9d9d9d;
    position: relative;
  }
  .info-desc .start{
    float: left;
  }
  .info-desc .end{
    float: right;
  }
  .info-desc .start::before,.info-desc .end::after{
    content: '';
    /*绝对定为变成了块元素才能设置宽高*/
    width: 10px;
    height: 10px;
    background-color: #2d2d2d;
    position: absolute;
    bottom:0;
  }
  .info-desc .end::after {
    right: 0;
  }
</style>

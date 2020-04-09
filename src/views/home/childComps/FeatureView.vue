<template>
  <div class="feature">
    <a href="https://act.mogujie.com/zzlx67">
    <img src="~assets/img/home/recommend_bg.jpg" alt="">
   </a>
    <!--<a :href="featureLink">
      <img :src="featureImage" alt="">
    </a>-->
  </div>
</template>

<script>
  export default {
    name: 'FeatureView',
    props: {
      // 没错，但是好像只能直接弄进去，props传进来无效
      /*featureLink: {
        type: String
      },
      featureImage: {
        type: String
      }*/
    },
    // props:['featureLink','featureImage']
    created(){
      /*console.log(this.featureImage)
      console.log(this.featureLink)*/
    }
  }
</script>

<style scoped>
  .feature img {
    width: 100%;
    vertical-align: bottom;
  }
</style>

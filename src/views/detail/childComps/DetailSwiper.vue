<template>
  <Swiper class="detail-swiper">
    <SwiperItem v-for="(item,index) in topImages" :key="index">
      <img v-lazy="item" alt="">
    </SwiperItem>
  </Swiper>
</template>

<script>
  import {Swiper,SwiperItem} from 'components/common/swiper'

  export default {
    name: "DetailSwiper",
    props:{
      topImages:{
        type:Array,
        default(){
          return []
        }
      }
    },
    components:{
      Swiper,
      SwiperItem
    },
    mounted() {
    }
  }
</script>

<style scoped>
  .detail-swiper{
    height: 300px;
    overflow: hidden;
  }
</style>

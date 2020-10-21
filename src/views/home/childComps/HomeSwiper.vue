<template>
  <div>
    <swiper>
      <swiper-item v-for='item in banners' :key='item.acm'>
        <a :href="item.link">
          <img v-lazy="item.image" :alt="item.title" :title="item.title" @load="swiperImgLoad">
        </a>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import {Swiper,SwiperItem} from 'components/common/swiper'

export default {
  name: "HomeSwiper",
  props:{
    banners:{
      type:Array,
      default(){
        return []
      }
    }
  },
  data(){
    return {
      isLoad:false
    }
  },
  components:{
    Swiper,
    SwiperItem
  },
  methods:{
    swiperImgLoad(){
      //第一种防止重复响应
      /*if(!this.isLoad){
        this.$emit('swiperImgLoad')
        this.isLoad = true
      }*/
    //  第二种通过.once修饰符，只想赢一次,这里用once不行，因为是不同的标签，在home中用比较正确
      this.$emit('swiperImgLoad')
    }
  }
};
</script>

<style scoped>
</style>

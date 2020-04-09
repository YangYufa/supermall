<template>
  <div>
    <slider>
      <slider-item v-for='item in banners' :key='item.acm'>
        <a :href="item.link">
          <img :src="item.image" :alt="item.title" :title="item.title">
        </a>
      </slider-item>
    </slider>
  </div>
</template>

<script>
import {Slider,SliderItem} from 'components/common/slider'

export default {
  name: "HomeSlider",
  props:{
    banners:{
      type:Array,
      default(){
        return []
      }
    }
  },
  components:{
    Slider,
    SliderItem
  }
};
</script>

<style scoped>
</style>
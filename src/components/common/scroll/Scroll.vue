<template>
  <div class="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'

  export default {
    name: "Scroll",
    props: {
      probeType: {
        type: Number,
        default: 0
      },
      pullUpLoad:{
        type:Boolean,
        default: false
      }
    },
    data() {
      return {
        scroll
      }
    },
    mounted() {
      this.scroll = new BScroll(document.querySelector('.content'), {
        probeType: this.probeType,
        click: true,
        pullUpLoad: this.pullUpLoad
      })
      if(this.probeType===2||this.probeType===3){
        this.scroll.on('scroll', (position) => {
          this.$emit('scroll',position)
        })
      }
      if(this.pullUpLoad){
        this.scroll.on('pullingUp',()=>{
          this.$emit('pullingUp')
        })
      }
    },
    methods: {
      //其实这个也没必要，太多封装真的烦
      scrollTo(x, y, time = 600) {
        // 不这样做有时候会爆出scroll或者scrollTo是undefined
        this.scroll&&this.scroll.scrollTo&&this.scroll.scrollTo(x, y, time)
      },
      finishPullUp(){
        //保证对象不是空的
        this.scroll&&this.scroll.finishPullUp&&this.scroll.finishPullUp()
      },
      refresh(){
        this.scroll&&this.scroll.refresh&&this.scroll.refresh()
      },
      getScrollY(){
        return this.scroll?this.scroll.y:0
      }
    }
  }
</script>

<style scoped>

</style>

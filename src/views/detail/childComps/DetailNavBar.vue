<template>
  <nav-bar>
    <div slot="left" @click="backClick">
      <img src="~assets/img/common/back.svg" alt="" class="back">
    </div>
    <div slot="center" class="title">
      <div class="title-item" v-for="(item,index) in titles" :class="{active:index===currentIndex}" @click="titleItemClick(index)">{{item}}</div>
    </div>
  </nav-bar>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'

  export default {
    name: "DetailNavBar",
    components: {
      NavBar
    },
    data(){
      return{
        titles:['商品','参数','评论','推荐'],
        currentIndex:0
      }
    },
    methods:{
      titleItemClick(index){
        this.currentIndex = index
        this.$emit('titleItemClick',index)
      },
      backClick(){
        this.$router.back()
      }
    }
  }
</script>

<style scoped>
  .title{
    display: flex;
  }
  .title-item{
    flex:1;
  }
  .active{
    color:pink;
  }
  .back{
    margin-top:12px;
  }
</style>

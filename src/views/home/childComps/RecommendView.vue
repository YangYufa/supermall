<template>
  <div class="recommend" >
    <div class="recommend-item" v-for="(item,index) in recommends" :key="index">
      <a :href="item.link">
        <img :src="item.image" :alt="item.title" :title="item.title" />
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "RecommendView",
  props: {
    recommends:{
      type:Array,
      default(){
        return []
      }
    }
  }
};
</script>

<style scoped>
.recommend{
  width: 100%;
  display: flex;
  text-align: center;
  /* 接近白色更加淡 */
  border-bottom: 10px solid #eee;
  padding: 10px 0 25px;
}
.recommend-item{
  flex-grow: 1;
  font-size: 12px;
}
.recommend-item img{
  width: 70px;
  height: 70px;
  margin-bottom: 5px;
}
</style>
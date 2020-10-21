<template>
  <div class="base-info" v-if="Object.keys(goods).length>0">
    <div class="info-title">{{goods.title}}</div>
    <div class="info-price">
      <span class="n-price">{{goods.newPrice}}</span>
      <del class="o-price">{{goods.oldPrice}}</del>
      <span class="discount" v-if="goods.discount">{{goods.discount}}</span>
    </div>
    <div class="info-other">
      <span>{{goods.columns[0]}}</span>
      <span>{{goods.columns[1]}}</span>
      <span>{{goods.services[goods.services.length-1].name}}</span>
    </div>
    <div class="info-service">
      <span class="info-service-item" v-for="index in goods.services.length-1" :key="index">
        <img v-lazy="goods.services[index-1].icon" alt />
        <span>{{goods.services[index-1].name}}</span>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailBaseInfo",
  props: {
    goods: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  mounted() {}
};
</script>

<style scoped>
.base-info {
  padding: 5px 10px;
  border-bottom: 4px solid #f2f2f4;
}
.info-title {
  padding: 10px 0;
  font-size: 14px;
}
.info-price {
  position: relative;
  padding-bottom: 10px;
}
.n-price {
  color: #f47078;
}
.o-price {
  color: #9c9796;
  font-size: 12px;
  margin: 0 5px;
}
.discount {
  color: white;
  padding: 2px 4px;
  border-radius: 30%;
  background-color: #f47078;
  font-size: 13px;
  position: absolute;
  top: -3px;
}
.info-other {
  display: flex;
  justify-content: space-between;
  color: #9c9796;
  font-size: 12px;
  padding-bottom: 10px;
}
.info-service {
  display: flex;
  justify-content: space-between;
  padding-bottom: 10px;
}
.info-service-item img {
  width: 12px;
}
.info-service-item span {
  font-size: 12px;
}
</style>

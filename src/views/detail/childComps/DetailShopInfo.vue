<template>
  <div class="shop-info">
    <div class="shop-top">
      <img v-lazy="shop.logo" alt class="shop-logo" />
      <span class="shop-name">{{shop.name}}</span>
    </div>
    <div class="shop-middle">
      <div class="shop-middle-left">
        <div class="shop-cells">
          <div class="cells-count">{{shop.sells|sellCountFilter}}</div>
          <div class="cells-text">总销量</div>
        </div>
        <div class="goods-count">
          <div class="shop-goods-count">{{shop.goodsCount}}</div>
          <div class="goods-count-text">全部宝贝</div>
        </div>
      </div>
      <div class="shop-middle-right">
        <table>
          <tr v-for="(item,index) in shop.score" :key="index">
            <td>{{item.name}}</td>
            <td class="score" :class="{'score-better':item.isBetter}">{{item.score}}</td>
            <td class="better" :class="{'better-more':item.isBetter}">
              <span>{{item.isBetter?'高':'低'}}</span>
            </td>
          </tr>
        </table>
      </div>
    </div>
    <div class="shop-bottom">
      <div class="shop-enter">进店逛逛</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailShopInfo",
  props: {
    shop: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  filters: {
    sellCountFilter(value) {
      return value < 10000 ? value : (value / 10000).toFixed(1) + "万";
    }
  }
};
</script>

<style scoped>
.shop-info {
  padding: 15px 10px;
  border-bottom: 4px solid #f2f2f4;
}
.shop-logo {
  width: 34px;
  height: 34px;
  border-radius: 50%;
}
.shop-top {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}
.shop-name {
  font-size: 16px;
}
.shop-middle {
  display: flex;
  width: 100%;
  align-items: center;
  margin-bottom: 10px;
  font-size: 14px;
}
.shop-middle-left {
  flex: 1;
  display: flex;
  justify-content: space-evenly;
  border-right: 2px solid #e8e8e7;
  text-align: center;
}
.cells-count,
.shop-goods-count {
  margin-bottom: 5px;
}
.shop-middle-right {
  flex: 1;
  display: flex;
  justify-content: center;
}
.shop-middle-right table {
  border-spacing: 10px;
}
.shop-middle-right .score {
  color: #9bb67d;
}
.shop-middle-right .better {
  color: white;
  background-color: #9bb67d;
}
.shop-middle-right .score-better {
  color: #d69297;
}
.shop-middle-right .better-more {
  background-color: #d69297;
}
.shop-enter {
  width: 33%;
  padding: 2px 0;
  background-color: #f0f3f6;
  text-align: center;
  margin: 0 auto 10px;
  border-radius: 8px;
}
</style>

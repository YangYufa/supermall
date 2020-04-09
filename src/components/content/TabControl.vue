<template>
  <div class="tab-control">
    <div
      class="tab-control-item"
      v-for="(item,index) in titles"
      :key="item"
      :class="{active:index===currentIndex}"
      @click="tabClick(index)"
    >
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabControl",
  props: {
    titles: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      currentIndex: 0
    };
  },
  methods: {
    tabClick(index) {
      this.currentIndex = index;
      this.$emit('tabClick',index)
    }
  }
};
</script>

<style scoped>
.tab-control {
  display: flex;
  width: 100%;
  text-align: center;
  height: 40px;
  line-height: 40px;
  box-sizing: border-box;
  background-color: #fff;
}
.tab-control-item {
  flex-grow: 1;
}
.tab-control-item span {
  padding-bottom: 5px;
}
.active {
  color: var(--color-high-text);
}
.active span {
  border-bottom: 1px solid var(--color-tint);
}
</style>

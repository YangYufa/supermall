<template>
  <div id="tab-bar">
    <!--以后可能放别的组件-->
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: "TabBar"
  }
</script>

<style scoped>
  #tab-bar{
    height: 49px;
    background: #f6f6f6;
    display: flex;
    position: fixed;
    bottom: 0;
    left: 0;
    /*right: 0;*/
    width: 100%;
    box-shadow: 0 -1px 10px rgba(100,100,100,.3);
  }
</style>

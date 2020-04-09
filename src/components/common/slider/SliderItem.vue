<template>
    <div class="slide">
      <slot></slot>
    </div>
</template>

<script>
	export default {
		name: "SliderItem"
	}
</script>

<style scoped>
  .slide {
    width: 100%;
    /* 不收缩 */
    flex-shrink: 0;
  }

  .slide img {
    width: 100%;
  }
</style>

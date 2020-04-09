<template>
	<div class="tab-bar-item" @click="itemClick">
		<!--以后可能修改内容-->
		<div v-if="!isActive">
			<slot name="item-icon"></slot>
		</div>
		<div v-else>
			<slot name="item-icon-active"></slot>
		</div>
		<!--这里class是变量-->
		<!--<div :class="{active:isActive}">-->
		<div :style="activeStyle">
			<slot name="item-text"></slot>
		</div>
	</div>
</template>

<script>
	export default {
		name: "TabBarItem",
		data: function() {
			return {
				// isActive:false
			}
		},
		props: {
			path: {
				type: String
			},
			activeColor: {
				type: String,
				default: 'red'
			}
		},
		computed: {
			isActive() {
				return this.$route.path.indexOf(this.path) !== -1
			},
			activeStyle() {
				return this.isActive ? {
					color: this.activeColor
				} : {}
			}
		},
		methods: {
			itemClick() {
				if (this.$route.path !== this.path) {
					this.$router.push(this.path)
				}
			}
		}
	}
</script>

<style scoped>
	.tab-bar-item {
		text-align: center;
		flex-grow: 1;
	}

	.tab-bar-item img {
		width: 24px;
		height: 24px;
		vertical-align: bottom;
		margin-top: 2px;
	}

	/*.active{
    color: red;
  }*/
</style>

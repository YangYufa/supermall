<template>
	<div class="good-list">
		<goods-list-item v-for="item in goods" :key='item.iid' :goodsItem='item' class="good-list-item">
		</goods-list-item>
	</div>
</template>

<script>
	import GoodsListItem from './GoodsListItem'
	export default{
		name:'GoodList',
		props:{
			goods:{
				type:Array,
				default:[]
			}
		},
		components:{
			GoodsListItem
		}
	}
</script>

<style>
  .good-list{
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
  }
  .good-list-item{
    width: 48%;
  }
</style>

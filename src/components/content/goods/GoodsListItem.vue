<template>
	<div class="good-list-item" @click="itemClick">
<!--    <img :src="showImage" alt="" @load="imageLoad">-->
    <img v-lazy="showImage" alt="" @load="imageLoad">
    <div class="good-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span><span class="star"></span><span class="collect">{{goodsItem.cfav}}</span>
    </div>
	</div>
</template>

<script>
	export default{
		name:'GoodsListItem',
		props:{
			goodsItem:{
				type:Object,
				default:{}
			}
		},
    computed:{
		  showImage(){
		    return this.goodsItem.image||this.goodsItem.show.img
      }
    },
    methods:{
		  imageLoad(){
		    this.$bus.$emit('itemImgLoad')
      },
      itemClick(){
		    this.$router.push('/detail/'+this.goodsItem.iid)
      }
    }
	}
</script>

<style scoped>
  .good-list-item{
    text-align: center;
    /*哎，其实哦都是为了有些图片不够长啊*/
    position: relative;
    /*留padding给ab的用的，放图片描述用的*/
    padding-bottom: 40px;
    font-size: 12px;
  }
  .good-list-item img{
    width: 100%;
  }
  .good-info{
    position: absolute;
    /*有了w就不用right来弄了，没有w，布局会很奇怪，用r才能解决，但是有了w就又不用r了*/
    /*也就是说用绝对定为最好加上宽度*/
    width: 100%;
    left: 0;
    /*right: 0;*/
    bottom: 5px;
  }
  .good-info p{
    overflow: hidden;
    white-space: nowrap;
    /*省略号*/
    text-overflow: ellipsis;
  }
  .good-info .star{
    display: inline-block;
    width: 14px;
    height: 14px;
    background:url("~assets/img/common/collect.svg") 0 0/14px 14px;
  }
</style>

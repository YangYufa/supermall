<template>
<div id="home">
  <nav-bar class="nav-home">
    <div slot='center'>购物街</div>
  </nav-bar>
  <home-slider :banners='banners' class="home-slider"></home-slider>
  <recommend-view :recommends='recommends'></recommend-view>
  <!--<feature-view featureImage="~assets/img/home/recommend_bg.jpg" featureLink="https://act.mogujie.com/zzlx67"></feature-view>-->
  <feature-view></feature-view>
  <tab-control :titles="['流行','新款','精选']" class="tab-control" @tabClick="tabClick"></tab-control>
	<goods-list :goods = showGoods ></goods-list>
</div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/TabControl'
import GoodsList from 'components/content/goods/GoodsList'

import HomeSlider from './childComps/HomeSlider'
import RecommendView from './childComps/RecommendView'
import FeatureView from './childComps/FeatureView'


import {getHomeMultidata,getHomeGoods} from 'network/home'

export default {
  name: "Home",
  components:{
    NavBar,
    HomeSlider,
    RecommendView,
    FeatureView,
    TabControl,
		GoodsList
  },
  data(){
    return {
      banners:[],
      recommends:[],
			goods:{
				pop:{page:0,list:[]},
				new:{page:0,list:[]},
				sell:{page:0,list:[]}
			},
      currentType:'pop'
    }
  },
  computed:{
    showGoods(){
      return this.goods[this.currentType].list
    }
  },
	methods:{
    /**
     * 网络请求相关的方法
     */
		getHomeMultidata(){
			getHomeMultidata().then(res=>{
			  // console.log(res);
			  this.banners = res.data.banner.list
			  this.recommends = res.data.recommend.list
			})
		},
		getHomeGoods(type){
			// page = this.goods[type].page + 1
			getHomeGoods(type,++(this.goods[type].page)).then(res =>{
				this.goods[type].list.push(...res.data.list)
			})
		},
    /**
     * 事件监听
     */
    tabClick(index){
      switch (index) {
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
      }
    }
	},
  created(){
    this.getHomeMultidata()
		this.getHomeGoods('pop')
		this.getHomeGoods('new')
		this.getHomeGoods('sell')
  }
};
</script>

<style scoped>
#home{
  padding-top: 44px;
}
.nav-home{
  width: 100%;
  background-color: var(--color-tint);
  color:#fff;
  position: fixed;
  left:0;
  top:0;
  bottom:0;
  right:0;
  z-index: 8;
}
/* 这样不行，后面slider上去就没效果了 */
/* .home-slider{
  padding-top: 44px;
} */
.tab-control{
  position: sticky;
  top:44px;
}
</style>

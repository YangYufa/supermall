<template>
  <div id="home">
    <nav-bar class="nav-home">
      <div slot='center'>购物街</div>
    </nav-bar>
    <scroll class="content" ref="scroll" :probe-type="3" :pull-up-load="true"
            @scroll="scrollContent" @pullingUp="loadMore">
      <home-slider :banners='banners' class="home-slider"></home-slider>
      <recommend-view :recommends='recommends'></recommend-view>
      <!--<feature-view featureImage="~assets/img/home/recommend_bg.jpg" featureLink="https://act.mogujie.com/zzlx67"></feature-view>-->
      <feature-view></feature-view>
      <tab-control :titles="['流行','新款','精选']" class="tab-control" @tabClick="tabClick"></tab-control>
      <goods-list :goods=showGoods></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import Scroll from 'components/common/scroll/Scroll'
  import TabControl from 'components/content/TabControl'
  import GoodsList from 'components/content/goods/GoodsList'
  import BackTop from 'components/content/backTop/BackTop'


  import HomeSlider from './childComps/HomeSlider'
  import RecommendView from './childComps/RecommendView'
  import FeatureView from './childComps/FeatureView'


  import {getHomeMultidata, getHomeGoods} from 'network/home'

  export default {
    name: "Home",
    components: {
      NavBar,
      HomeSlider,
      RecommendView,
      FeatureView,
      TabControl,
      GoodsList,
      Scroll,
      BackTop
    },
    data() {
      return {
        banners: [],
        recommends: [],
        goods: {
          pop: {page: 0, list: []},
          new: {page: 0, list: []},
          sell: {page: 0, list: []}
        },
        currentType: 'pop',
        isShowBackTop: false
      }
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list
      }
    },
    methods: {
      /**
       * 网络请求相关的方法
       */
      getHomeMultidata() {
        getHomeMultidata().then(res => {
          // console.log(res);
          this.banners = res.data.banner.list
          this.recommends = res.data.recommend.list
        })
      },
      getHomeGoods(type) {
        // page = this.goods[type].page + 1
        getHomeGoods(type, ++(this.goods[type].page)).then(res => {
          this.goods[type].list.push(...res.data.list)
          this.$refs.scroll.scroll.finishPullUp()
          this.$refs.scroll.scroll.refresh()
        })
      },
      /**
       * 事件监听
       */
      tabClick(index) {
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
      },
      backClick() {
        // this.$refs.scroll.scrollTo(0,0,600)
        this.$refs.scroll.scroll.scrollTo(0, 0, 600)
      },
      scrollContent(position) {
        this.isShowBackTop = position.y < -1000
      },
      loadMore(){
        this.getHomeGoods(this.currentType)
      }
    },
    created() {
      this.getHomeMultidata()
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
    }
  };
</script>

<style scoped>
  #home {
    /*padding-top: 44px;*/
    height: 100vh;
    position: relative;
  }

  .nav-home {
    width: 100%;
    background-color: var(--color-tint);
    color: #fff;
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    z-index: 8;
  }

  /* 这样不行，后面slider上去就没效果了 */
  /* .home-slider{
    padding-top: 44px;
  } */
  .tab-control {
    position: sticky;
    top: 44px;
    z-index: 8;
  }

  .content {
    /*height:calc(100% - 93px);
    overflow: hidden;
    margin-top: 44px;*/
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
    overflow: hidden;
  }
</style>

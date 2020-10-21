<template>
  <div id="home">
    <nav-bar class="nav-home">
      <div slot='center'>购物街</div>
    </nav-bar>
    <tab-control :titles="['流行','新款','精选']" class="tab-control" @tabClick="tabClick" ref="tabControl1" :class="{fixed:isTabFixed}" v-show="isTabFixed"></tab-control>
    <scroll class="content" ref="scroll" :probe-type="3" :pull-up-load="true"
            @scroll="listenShowBackTop" @pullingUp="loadMore">
      <home-swiper :banners='banners' class="home-swiper" @swiperImgLoad.once="swiperImgLoad"></home-swiper>
      <recommend-view :recommends='recommends'></recommend-view>
      <feature-view featureImage="~assets/img/home/recommend_bg.jpg" featureLink="https://act.mogujie.com/zzlx67"></feature-view>
      <feature-view></feature-view>
      <tab-control :titles="['流行','新款','精选']" class="tab-control" @tabClick="tabClick" ref="tabControl2" :class="{fixed:isTabFixed}"></tab-control>
      <goods-list :goods=showGoods></goods-list>
      <!--<ul>
      <li v-for="(item,index) in 1256" :key="index">111</li>
    </ul>-->
    </scroll>
    <back-top @click.native="backTop" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
  import {debounce} from "common/utils";

  import NavBar from 'components/common/navbar/NavBar'
  import Scroll from 'components/common/scroll/Scroll'
  import TabControl from 'components/content/TabControl'
  import GoodsList from 'components/content/goods/GoodsList'
  // import BackTop from 'components/content/backTop/BackTop'


  import HomeSwiper from './childComps/HomeSwiper'
  import RecommendView from './childComps/RecommendView'
  import FeatureView from './childComps/FeatureView'


  import {getHomeMultidata, getHomeGoods} from 'network/home'

  import {itemImgListenerMixin,backTopMixin} from '../../common/mixin'

  export default {
    name: "Home",
    components: {
      NavBar,
      HomeSwiper,
      RecommendView,
      FeatureView,
      TabControl,
      GoodsList,
      Scroll,
      // BackTop
    },
    mixins:[itemImgListenerMixin,backTopMixin],
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
        isShowBackTop: false,
        tabOffsetTop:0,
        isTabFixed:false,
        saveY:0,
        imageLoadCounter:0,
        showGoodsLength:0
      }
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list
      }
    },
    watch:{
      //检测goods可能不行，它是对象,
      //用deep解决
      goods:{
        handler(nValue,oValue){
          this.showGoodsLength = this.goods[this.currentType].list.length
        },
        immediate:true,
        deep:true
      }
      /*showGoods(){
        this.showGoodsLength = this.goods[this.currentType].list.length
      }*/
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
          // this.$refs.scroll.scroll.finishPullUp()
          this.$refs.scroll.finishPullUp()
          // this.$refs.scroll.scroll.refresh()
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
        this.$refs.tabControl1.currentIndex = index
        this.$refs.tabControl2.currentIndex = index
      },
      //用mixin替代
      /*backClick() {
        this.$refs.scroll.scrollTo(0, 0, 600)
        // this.$refs.scroll.scroll.scrollTo(0, 0, 600)
      },
      scrollContent(position) {
        console.log('scroll2')
        //这个-1000可以弄成一个常量
        this.isShowBackTop = position.y < -1000
        this.isTabFixed = position.y < -this.tabOffsetTop
      },*/
      loadMore() {
        this.getHomeGoods(this.currentType)
        // console.log("加载更多");
      },
      //因为swiper里面加载的图片比较多，所以用它来
      swiperImgLoad(){
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
      }
    },
    activated() {
      this.$refs.scroll.scrollTo(0,this.saveY,0)
      this.$refs.scroll.refresh()
    },
    deactivated() {
      this.saveY = this.$refs.scroll.getScrollY()
      // console.log(this.saveY);
      this.$bus.$off('itemImgLoad',this.itemImgListener)
    },
    created() {
      this.getHomeMultidata()
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
    },
    mounted() {
      //1.用debounce来解决
      //用const更合适
      /*const refresh = debounce(this.$refs.scroll.refresh,100)
      this.$bus.$on('itemImageLoad', () => {
        // this.$refs.scroll.scroll.refresh()
        // this.$refs.scroll.refresh()
        refresh()
      })*/
      // 2.通过累计数量来解决(还是有问题，不能完美解决，可能是因为监听watch的延迟原因)
      //完美解决了，watch那里写错了而已
      /*this.$bus.$on('itemImageLoad',()=>{
        if(++this.imageLoadCounter===this.showGoodsLength){
        // if(++this.imageLoadCounter===this.goods[this.currentType].list.length){
          this.$refs.scroll.refresh()
        }
      })*/
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
    z-index: 8;
    /*用了bs这里可以不用了*/
    /*还是要的，无论层级多高，还是会被穿透，开个定位就不会了*/
    /*position: relative;*/
    /*position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;*/
  }

  /* 这样不行，后面slider上去就没效果了 */
  /* .home-slider{
    padding-top: 44px;
  } */
  /*sticky不起作用了*/
  .tab-control {
    position: sticky;
    top: 44px;
    z-index: 8;
    /*width:100%;*/
  }
  /*这个其实是给bs里面的.content设置高度，不能随便换成别的名字，要和里面的一致*/
  /*不知为啥用了hidden，首次打开就不能滑动*/
  .content {
    height:calc(100% - 93px);
    /*没了它，navbar又会被拉上去*/
    /*去了它真的一大堆问题，服了，有它初次又動不了*/
    overflow: hidden;
    /*position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;*/
  }
  /*用tab-fixed会失效，vue标签里不支持绑定用-*/
  .fixed{
    position: fixed;
    top:44px;
    left:0;
    /*没有这个不行，因为没有宽度吧*/
    /*right: 0;*/
  }
</style>

<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav-bar" @titleItemClick="titleItemClick" ref="detailNavBarRef"/>
    <scroll class="content" ref="scroll" @scroll="contentScroll" :probe-type="3">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goodsInfo"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-good-info :detail-info="detailInfo" @imageLoad = imageLoad></detail-good-info>
      <detail-params-info :params-info="paramsInfo" ref="paramsRef"></detail-params-info>
      <detail-comment-info :comment-info="commentInfo" ref="commentRef"></detail-comment-info>
      <goods-list :goods="recommends" ref="recommendRef"></goods-list>
    </scroll>
    <detail-bottom-bar @addToCart="addDetailCart"></detail-bottom-bar>
    <back-top @click.native="backTop" v-show="isShowBackTop"></back-top>
<!--    <toast :message="toastMessage" :show="toastShow"></toast>-->
  </div>
</template>

<script>
  import DetailNavBar from "./childComps/DetailNavBar";
  import DetailSwiper from "./childComps/DetailSwiper";
  import DetailBaseInfo from "./childComps/DetailBaseInfo";
  import DetailShopInfo from "./childComps/DetailShopInfo";
  import DetailGoodInfo from "./childComps/DetailGoodInfo";
  import DetailParamsInfo from './childComps/DetailParamsInfo'
  import DetailCommentInfo from './childComps/DetailCommentInfo'
  import DetailBottomBar from './childComps/DetailBottomBar'
  import Scroll from "../../components/common/scroll/Scroll";
  import GoodsList from '../../components/content/goods/GoodsList'
  // import Toast from '../../components/common/toast/Toast'

  import {getDetail,getRecommends,Goods,Shop} from "../../network/detail";
  import {debounce} from "common/utils";

  import {itemImgListenerMixin,backTopMixin} from '../../common/mixin'

  import {mapActions} from 'vuex'

  export default {
    name: "Detail",
    components:{
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      Scroll,
      DetailGoodInfo,
      DetailParamsInfo,
      DetailCommentInfo,
      DetailBottomBar,
      GoodsList,
      // Toast
    },
    mixins:[itemImgListenerMixin,backTopMixin],
    computed:{
    },
    data() {
      return {
        iid: null,
        topImages:[],
        goodsInfo:{},
        shop:{},
        detailInfo:{},
        paramsInfo:{},
        commentInfo:{},
        recommends:[],
        refresh:null,
        themeTopYs:[],
        getThemeTopYs:null,
        currentIndex:0,
        /*toastMessage:'',
        toastShow:false*/
      }
    },
    methods:{
      ...mapActions([
        'addToCart'
      ]),
      imageLoad(){
        //这样应该是可以的啊，我创建了一个定时器，timer一直是debounce的变量
        //这样不可以的，重复生成返回的方法
        // debounce(this.$refs.scroll.refresh,100)()
        // this.$refs.scroll.refresh()
        // 想用debounce就可以用之前混入的就行了
        this.newRefresh()
        this.getThemeTopYs()
      },
      titleItemClick(index){
        this.currentIndex = index
        this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],100)
      },
      contentScroll(position){
        let positionY = -position.y
        for(let i=0;i<this.themeTopYs.length-1;i++){
           if(this.currentIndex!=i&&(positionY>=this.themeTopYs[i]&&positionY<this.themeTopYs[i+1])){
             this.currentIndex = i
             this.$refs.detailNavBarRef.currentIndex = this.currentIndex
           }
         }
        this.listenShowBackTop(position)
      },
      addDetailCart(){
        const product = {}
        product.image = this.topImages[0]
        product.title = this.goodsInfo.title
        product.desc = this.goodsInfo.desc
        product.price = this.goodsInfo.realPrice
        product.iid = this.iid
        // this.$store.dispatch('addToCart',product)
        this.addToCart(product).then(res=>{
          /*this.toastMessage = res
          this.toastShow = true
          setTimeout(()=>{
            this.toastMessage = ''
            this.toastShow = false
          },1500)*/
          this.$toast.show(res,2000)
        })
      }
    },
    created() {
      this.iid = this.$route.params.iid
      getDetail(this.iid).then(res=>{
        let result = res.result
        this.topImages=result.itemInfo.topImages
        this.goodsInfo = new Goods(result.itemInfo,result.columns,result.shopInfo.services)
        this.shop = new Shop(result.shopInfo)
        this.detailInfo = result.detailInfo
        this.paramsInfo = result.itemParams
        if(result.rate.cRate !==0){
          this.commentInfo = result.rate.list[0]
        }
      })
      getRecommends().then(res=>{
        this.recommends = res.data.list
      })
    },
    mounted() {
      this.getThemeTopYs = debounce(()=>{
        this.themeTopYs = []
        this.themeTopYs.push(0)
        this.themeTopYs.push(this.$refs.paramsRef.$el.offsetTop)
        this.themeTopYs.push(this.$refs.commentRef.$el.offsetTop)
        this.themeTopYs.push(this.$refs.recommendRef.$el.offsetTop)
        this.themeTopYs.push(Number.MAX_VALUE)
      },100)
    },
    destroyed() {
      this.$bus.$off('itemImgLoad',this.itemImgListener)
    }
  }
</script>

<style scoped>
  #detail{
    height: 100vh;
    position: relative;
    z-index: 8;
    background: white;
  }
  .content{
    /*这样没有效果因为父元素没固定高度*/
    height: calc(100% - 93px);
    overflow: hidden;
  }
  .detail-nav-bar{
    position: relative;
    z-index: 9;
    /*margin-bottom: 44px;*/
    background-color: white;
  }
</style>

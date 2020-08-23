<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"></detail-nav-bar>
    <scroll class="content" ref="scroll" @scroll="contentScroll" :probe-type="3">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo"
      @imageLoad="imageLoad"></detail-goods-info>
      <detail-param-info ref="param" :param-info="paramInfo"></detail-param-info>
      <detail-comment-info ref="comment" :comment-info="commentInfo"></detail-comment-info>
      <goods-list ref="recommend" :goods="recommends"></goods-list>
    </scroll>
    <detail-bottom-bar @addEvent="addToCart"></detail-bottom-bar>
    <back-top @click.native="backClick" v-show="isShowbackTop"></back-top>
    <!-- <toast :message="message" :show="show"></toast> -->
  </div>
</template>

<script>
  import DetailNavBar from './childComps/DetailNavBar.vue'
  import DetailSwiper from './childComps/DetailSwiper.vue'
  import DetailBaseInfo from './childComps/DetailBaseInfo.vue'
  import DetailShopInfo from './childComps/DetailShopInfo.vue'
  import DetailGoodsInfo from './childComps/DetailGoodsInfo.vue'
  import DetailParamInfo from './childComps/DetailParamInfo.vue'
  import DetailCommentInfo from './childComps/DetailCommentInfo.vue'
  import DetailBottomBar from './childComps/DetailBottomBar.vue'
  
  import Scroll from 'components/common/scroll/Scroll.vue'
  import GoodsList from 'components/content/goods/GoodsList.vue'
  import BackTop from 'components/content/backTop/BackTop.vue'
  // import Toast from 'components/common/toast/Toast.vue'
  
  import {getDetail,Goods,Shop,GoodsParam,getRecommend} from 'network/detail.js'
  import {debounce} from 'common/utils.js'
  
  import { mapActions } from 'vuex'
  
  export default{
    name:'Detail',
    components:{
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      DetailBottomBar,
      Scroll,
      GoodsList,
      BackTop,
      // Toast,
    },
    data(){
      return{
        iid:null,
        topImages:[],
        goods:{},
        shop:{},
        detailInfo:{},
        paramInfo:{},
        commentInfo:{},
        recommends:[],
        themeTopYs:[],
        getThemeTopY:null,
        currentIndex:0,
        isShowbackTop:false,
        message:'',
        show:false
      }
    },
    created(){
      // 1.保存存入的iid
      this.iid = this.$route.params.iid
      
      // 2.根据iid请求详情数据
      getDetail(this.iid).then(res => {
        // 1.获取顶部的图片轮播数据
        // console.log(res)
        const data = res.result;
        
        this.topImages = data.itemInfo.topImages
        
        // 2.获取商品信息
        this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)
        
        // 3.创建店铺信息的对象
        this.shop = new Shop(data.shopInfo)
        
        // 4.保存商品的详情数据
        this.detailInfo = data.detailInfo;
        
        // 5.获取参数信息
        this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)
        
        // 6.取出评论的信息
        if(data.rate.cRate !== 0){
          this.commentInfo = data.rate.list[0]
        }
      })
      
      // 3.请求推荐数据
      getRecommend().then(res => {
        this.recommends = res.data.list
      })
      
      // 4.给getThemeTopY赋值(对给this.themeTopYs赋值的操作进行防抖)
      this.getThemeTopY = debounce(() => {
        this.themeTopYs = []
        
        this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refs.param.$el.offsetTop - 44)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop - 44)
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop - 44)
        this.themeTopYs.push(Number.MAX_VALUE)
        // console.log(this.themeTopYs)
      },100)
    },
    mounted(){
      const refresh = debounce(this.$refs.scroll.refresh,200) 
      
      this.$bus.$on('detailItemImageLoad',() => {
        refresh()
        // console.log('222')
      })
    },
    methods:{
      // 将actions里的函数映射过来
      ...mapActions(['addCart']),
      
      imageLoad(){
        this.$refs.scroll.refresh()
        
        // 调用防抖函数
        this.getThemeTopY()
      },
      titleClick(index){
        // console.log(index)
        this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],200)
      },
      contentScroll(position){
        // 判断BackTop是否显示
        this.isShowbackTop = (-position.y) >1000
        
        // 1.获取y值
        const positionY = -position.y
        
        // 2.positionY和主题中值进行对比
        // [0, 9891, 10583, 10728]
        // positionY 在 0 和 9891 之间， index = 0
        // positionY 在 9891 和 10583 之间， index = 1
        // positionY 在 10583 和 10728 之间，index = 2
        // positionY 超过 10728 值，index = 3
        // for(let i in this.themeTopYs){
          // console.log(i + 1)  // String 打印出来是字符串类型
          let length = this.themeTopYs.length
          for(let i = 0;i < length - 1;i++){
          // if(positionY > this.themeTopYs[i] && positionY < this.themeTopYs[i+1]){
          //   console.log(i)
          // }
          
          if(this.currentIndex !== i && (positionY > this.themeTopYs[i] && positionY <
          this.themeTopYs[i+1])){
            this.currentIndex = i;
            // console.log(this.currentIndex)
            this.$refs.nav.currentIndex = this.currentIndex
          }
          
          // if(this.currentIndex !== i && ((i < length - 1 && positionY >= this.themeTopYs[i] && 
          // positionY < this.themeTopYs[i+1])
          //  || (i === length - 1 && positionY >= this.themeTopYs[i]))){
            // this.currentIndex = i;
            // console.log(this.currentIndex)
            // this.$refs.nav.currentIndex = this.currentIndex
          // }
        }
      },
      backClick(){
        this.$refs.scroll.scrollTo(0,0,1000)
      },
      addToCart(){
        // 1.获取购物车需要展示的信息
        const product = {}
        product.image = this.topImages[0]
        product.title = this.goods.title;
        product.desc = this.goods.desc;
        product.price = this.goods.realPrice;
        product.iid = this.iid;
        
        // 2.将商品添加到购物车(1.Promise 2.mapActions)
        // this.$store.commit('addCart',product)
        
        this.addCart(product).then(res => {
          // this.show = true;
          // this.message = res;
          
          // setTimeout(() => {
          //   this.show = false;
          //   this.message = ''
          // },1500)
          
          this.$toast.show(res,1500)
          
          // console.log(this.$toast)
        })
        
        // this.$store.dispatch('addCart',product).then(res => {
        //   console.log(res)
        // })
      }
    }
  }
</script>

<style scoped>
  #detail{
    position:relative;
    z-index:9;
    background-color:#fff;
    height:100vh;
  }
  .detail-nav{
    position:relative;
    z-index:9;
    background-color: #fff;
  }
  .content{
    height:calc(100% - 44px);
  }
</style>

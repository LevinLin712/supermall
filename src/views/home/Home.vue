<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control :titles="['流行','新款','精选']"
    @tabClick="tabClick"
    ref="tabControl1"
    class="{tab-control}"
    v-show="isTabFixed"
    ></tab-control>
    <scroll class="home-content" 
    ref="scroll" 
    :probe-type="3"
    @scroll="contentScroll"
    :pull-up-load="true"
    @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control :titles="['流行','新款','精选']"
      @tabClick="tabClick"
      ref="tabControl2"
      ></tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowbackTop"></back-top>
  </div>
</template>

<script>
  import HomeSwiper from './childComps/HomeSwiper.vue';
  import RecommendView from './childComps/RecommendView.vue'
  import FeatureView from './childComps/FeatureView.vue'
  
  import NavBar from 'components/common/navbar/NavBar.vue';
  import TabControl from 'components/content/tabControl/TabControl.vue'
  import GoodsList from 'components/content/goods/GoodsList.vue'
  import Scroll from 'components/common/scroll/Scroll.vue'
  import BackTop from 'components/content/backTop/BackTop.vue'
  
  import {getHomeMultiData,getHomeGoods} from 'network/home.js'
  import { debounce } from 'common/utils.js'
  
  export default{
    name:'Home',
    components:{
      HomeSwiper,
      RecommendView,
      FeatureView,
      NavBar,
      TabControl,
      GoodsList,
      Scroll,
      BackTop,
    },
    data(){
      return{
        banners:[],
        recommends:[],
        goods:{
          'pop':{page:0,list:[]},
          'new':{page:0,list:[]},
          'sell':{page:0,list:[]},
        },
        currentType:'pop',
        isShowbackTop:false,
        tabOffsetTop:0,
        isTabFixed:false,
        saveY:0,
      }
    },
    
    // 在模板渲染成html前调用，即通常初始化某些属性值，然后再渲染成视图
    created(){
      // 1.请求多个数据
     this.getHomeMultidata()
      
      // 2.请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
    },
    
    // 在模板渲染成html后调用，通常是初始化页面完成后，再对html的dom节点进行一些需要的操作。
    mounted(){
      // 3.监听Item中图片加载完成
      // 
      const refresh = debounce(this.$refs.scroll.refresh,200)
      
      this.$bus.$on('itemImageLoad',() => {
        refresh()
        // console.log('111')
      })
    },
    
    computed:{
      showGoods(){
        return this.goods.[this.currentType].list
      }
    },
    activated(){
      this.$refs.scroll.refresh()
      this.$refs.scroll.scrollTo(0, this.saveY, 0)
    },
    deactivated(){
      // 不活跃时保存Y值
      this.saveY = this.$refs.scroll.getScrollY()
      
      // 2.取消全局事件监听
      this.$bus.$off('itemImageLoad')
    },
    
    methods:{
      // 事件监听相关方法
      tabClick(index){
        switch(index){
          case 0:
          this.currentType = 'pop';
          break;
          case 1:
          this.currentType = 'new';
          break;
          case 2:
          this.currentType = 'sell';
          break;
        }
        this.$refs.tabControl1.currentIndex = index
        this.$refs.tabControl2.currentIndex = index
      },
      backClick(){
        this.$refs.scroll.scrollTo(0,0,1000)
      },
      contentScroll(position){
        // 1.判断BackTop是否显示
        this.isShowbackTop = (-position.y) >1000
        // 2.决定tabControl是否吸顶(position:fixed)
        this.isTabFixed = (-position.y) > this.tabOffsetTop
      },
      loadMore(){
        this.getHomeGoods(this.currentType)
      },
      swiperImageLoad(){
        // Ⅰ.获取tabControl的offsetTop
        // 所有的组件都有一个属性$el:用于获取组件中的元素
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
      },
      
      // 网络请求相关方法
      getHomeMultidata(){
        getHomeMultiData().then(res => {
          this.banners = res.data.banner.list;
          this.recommends =res.data.recommend.list;
        })
      },
      getHomeGoods(type){
        const page = this.goods[type].page + 1
        getHomeGoods(type,page).then(res => {
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1
          // 默认只能上拉加载一次,所以要使用scroll的函数finishPullUp告知已经加载完成
          // 完成上拉加载更多
          this.$refs.scroll.finishPullUp()
        })
      }
    }
  }
</script>

<!-- scoped作用域 -->
<style scoped>
  .home-nav{
    background-color:#ff8e96;
    color:#fff;
/*    position:fixed;
    left:0;
    right:0;
    top:0;
    z-index:9; */
  }

  .home-content{
    overflow: hidden;
    position:absolute;
    top:44px;
    bottom:49px;
    left:0;
    right:0;
  }
  .tab-control{
    position:relative;
    z-index:9;
  }
/*  .home-content{
    height:calc(100% - 93px);
    overflow:hidden;
    margin-top:44px;
  } */
</style>

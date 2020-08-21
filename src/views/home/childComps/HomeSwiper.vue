<template>
  <swiper>
    <swiper-item v-for="(item,index) in banners" :key="index">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="imageLoad">
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
  import Swiper from 'components/common/swiper/Swiper.vue'
  import SwiperItem from 'components/common/swiper/SwiperItem.vue'
  
  export default{
    name:"HomeSwiper",
    props:{
      banners:{
        type:Array,
        default(){
          return []
        }
      }
    },
    data(){
      return{
        isLoad:false,
      }
    },
    components:{
      Swiper,
      SwiperItem,
    },
    methods:{
      imageLoad(){
        if(!this.isLoad){
        this.$emit('swiperImageLoad')
        this.isLoad = true
        }
      }
    }
  }
</script>

<style>
</style>

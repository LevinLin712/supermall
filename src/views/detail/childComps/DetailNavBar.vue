<template>
  <div>
    <nav-bar>
      <div slot="left" class="back" @click="backClick">
        <img src="~assets/img/common/back.svg" alt="">
      </div>
      <div slot="center" class="title">
    <div v-for="(item,index) in titles" :key="index"
    class="title-content"
    :class="{active : currentIndex === index}"
    @click="titleClick(index)"
    >{{item}}</div>
    </div>
    </nav-bar>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar.vue'
  
  export default{
    name:'DetailNavBar',
    components:{
      NavBar,
    },
    data(){
      return{
        titles:['商品','参数','评论','推荐'],
        currentIndex:0,
      }
    },
   methods:{
     titleClick(index){
       this.currentIndex = index;
       this.$emit('titleClick',index)
     },
     backClick(){
       this.$router.back()
     }
   } 
  }
</script>

<style>
  .title{
    display:flex;
  }
  .title-content{
    flex:1;
  }
  .active{
    color:#ff6c93;
  }
  .back img{
    width:40%;
    padding-top: 10px;
  }
</style>

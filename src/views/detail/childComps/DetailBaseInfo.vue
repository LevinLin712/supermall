<template>
  <div v-if="Object.keys(goods).length !== 0" class="base-info">
    <div class="info-title">{{goods.title}}</div>
    <div class="info-price">
      <span class="n-price">{{goods.newPrice}}</span>
      <span class="o-price">{{goods.oldPrice}}</span>
      <span v-if="goods.discount" class="discount">{{goods.discount}}</span>
    </div>
    <div class="info-other">
      <span>{{goods.columns[0]}}</span>
      <span>{{goods.columns[1]}}</span>
      <span>{{goods.services[goods.services.length-1].name}}</span>
    </div>
   <div class="info-service">
      <span class="info-service-item" v-for="index in goods.services.length-1"
      :key="index">
      <img :src="goods.services[index-1].icon">
      <span>{{goods.services[index-1].name}}</span>
      </span>
    </div>
  </div>
</template>

<script>
  export default{
    name:'DetailBaseInfo',
    props:{
      goods:{
        type:Object,
        default(){
          return {}
        }
      }
    }
  }
</script>

<style scoped>
  .base-info{
    margin-top:15px;
    padding:0 8px;
    color:#999;
    border-bottom:5ps solid #f2f5f8;
  }
  .info-title{
    color:#222;
  }
  .info-price{
    margin-top:10px;
  }
  .info-price .n-price{
    font-size:24px;
    color:#ff6c93;
  }
  .info-price .o-price{
    font-size:13px;
    margin-left:5px;
    text-decoration:line-through;
  }
  .info-price .discount{
    font-size:12px;
    padding:2px 5px;
    color:#fff;
    background-color:#ff6c93;
    border-radius:8px;
    margin-left:5px;
    
    /* 让元素上浮 */
    position:relative;
    top:-8px;
  }
  .info-other{
    margin-top:15px;
    line-height:30px;
    display:flex;
    font-size:13px;
    border-bottom:1px solid rgba(100,100,100,0.1);
    justify-content:space-between;
    line-height:60px;
  }
  .info-service{
    display: flex;
    padding:10px 0;
    border-bottom:5px solid rgba(100,100,100,0.1);
  }
  .info-service-item{
    flex:1;
  }
  .info-service-item img{
    width:16px;
    height:16px;
    position:relative;
    top:2px;
    margin-left:5px;
  }
  .info-service-item span{
    font-size:12px;
    color:#333;
  }
</style>

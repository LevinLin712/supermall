<template>
  <div class="check-button" :class="{check:isChecked}">
    <img src="~assets/img/cart/check.svg" alt="">
  </div>
</template>

<script>
  export default{
    name:'CheckButton',
    props:{
      isChecked:{
        type:Boolean,
        default:false
      }
    }
  }
</script>

<style scoped>
  .check-button img{
    width:20px;
    border:1px solid #aaa;
    border-radius: 50%;
  }
  .check{
    border-color:orangered;
    background-color:orangered;
    border-radius: 50%;
  }
</style>

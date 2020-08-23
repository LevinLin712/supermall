<template>
  <div class="bottom-bar" @click="calcClick">
    <div class="check-content" @click="checkClick">
      <check-button class="check-button" :is-checked="isSelectAll"></check-button>
      <span>全选</span>
    </div>

    <div class="price">
      合计: {{totalPrice}}
    </div>

    <div class="calculate">
      结算({{checkLength}})
    </div>
  </div>
</template>

<script>
  import CheckButton from 'components/content/checkButton/CheckButton.vue'

  import {
    mapGetters
  } from 'vuex'

  export default {
    name: 'CartBottomBar',
    components: {
      CheckButton,
    },
    computed: {
      ...mapGetters(['cartList']),
      totalPrice() {
        return '¥' + this.cartList.filter(item => {
          return item.checked
        }).reduce((preValue, item) => {
          return preValue + item.price * item.count
        }, 0).toFixed(2)
      },
      checkLength() {
        return this.cartList.filter(item => item.checked).length
      },
      isSelectAll() {
        if (this.cartList.length === 0){
          return false
        } 
        // 1.使用filter
        // return !(this.cartList.filter(item => !item.checked).length)

        // 2.使用find
        // return !this.cartList.find(item => !item.checked)

        // 3.普通遍历
        for (let item of this.cartList) {
          if (!item.checked) {
            return false
          }
        }
        return true
      }
    },
    methods: {
      checkClick() {
        if (this.isSelectAll) { //全部选中
          this.cartList.forEach(item => item.checked = false)
        } else { //部分或全部不选中
          this.cartList.forEach(item => item.checked = true)
        }
      },
      calcClick() {
        // 没有全部选中的情况下
        if (!this.checkLength) {
          this.$toast.show('请选择购买的商品', 2000)
        }else if(this.checkLength){
          this.$toast.show('很抱歉,暂不支持购买',2000)
        }
      }
    }
  }
</script>

<style scoped>
  .bottom-bar {
    height: 40px;
    background-color: #eee;
    position: relative;
    bottom: 0;
    line-height: 40px;
    display: flex;
  }

  .check-content {
    display: flex;
    width: 60px;
  }

  .check-button {
    line-height: 20px;
    margin: 3px;
    height: 20px;
    width: 20px;
    margin-top: 8px;
  }

  .price {
    flex: 1;
    text-align: center;
  }

  .calculate {
    width: 100px;
    text-align: center;
    background-color: red;
  }
</style>

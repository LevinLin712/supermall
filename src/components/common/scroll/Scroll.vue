<template>
  <!-- ref/children 一般绑定给子组件 -->
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'

  export default {
    name: 'Scroll',
    props: {
      probeType: {
        type: Number,
        default: 0,
      },
      pullUpLoad: {
        type: Boolean,
        default: false,
      }
    },
    data() {
      return {
        scroll: null,
      }
    },
    mounted() {
      // 1.创建BScroll对象
      this.scroll = new BScroll(this.$refs.wrapper, {
        click: true,
        // 一直实时监听会影响性能
        probeType: this.probeType,
        pullUpLoad: this.pullUpLoad,
      })
      
      // 2.监听滚动的事件
      if (this.probeType === 2 || this.probeType === 3) {
        this.scroll.on('scroll', (position) => {
          // console.log(position)
          this.$emit('scroll', position)
        })
      }
      // this.scroll.on('scroll',(position) => {
      //   // console.log(position)
      //   this.$emit('scroll',position)
      // })
      
      // 3.监听scroll滚动到底部进行滑动上拉时
      if (this.pullUpLoad) {
        this.scroll.on('pullingUp', () => {
          this.$emit('pullingUp')
        })
      }
      // this.scroll.on('pullingUp',() =>{
      //   this.$emit('pullingUp')
      // })
    },
    methods: {
      // ES6语法
      scrollTo(x, y, time = 300) {
        // && 逻辑与，前面有值的情况才会执行后面的代码
        this.scroll && this.scroll.scrollTo(x, y, time)
      },
      finishPullUp() {
        this.scroll && this.scroll.finishPullUp()
      },
      refresh() {
        // console.log('-----')
        this.scroll && this.scroll.refresh()
      },
      getScrollY(){
        return this.scroll ? this.scroll.y : 0
      }
    }
  }
</script>

<style>
</style>

<template>
  <transition name="show">
    <div v-show="showFlag" class="foodDetail" ref="foodDetail">
      <div class="foodContent">
          <!-- 图片写法 -->
        <div class="img">
          <img :src="selectedFood.image" alt="">
          <i class="icon-arrow_lift" @click="hide"></i>
        </div>
        <!-- <div>{{selectedFood}}</div> -->
        <!-- 内容 -->
        <!-- 标题 -->
        <div class="content">
          <h1 class="title"></h1>
          <div class="count"></div>
          <div class="price"></div>
          <div class="controlWrapper"></div>
        </div>

        <!-- 商品介绍 -->
        <div class=""></div>

        <!-- 商品评价 -->
        <div class=""></div>
      </div>
    </div>
  </transition>
</template>
<script>
import BScroll from 'better-scroll'
import cartcontrol from '../cartcontrol/cartcontrol'
export default {
  props: {
    selectedFood: {
      type: Object
    }
  },
  data () {
    return {
      showFlag: false
    }
  },
  methods: {
    show() {
      this.showFlag = true
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.foodDetail, {
            click: true
          })
        } else {
          this.scroll.refresh()
        }
      })
    },
    hide() {
      this.showFlag = false
    }
  },
  mounted() {
    console.log(this.selectedFood)
  },
  components: {
    cartcontrol
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus"  scoped>
.foodDetail
  position fixed
  top 0
  left 0
  z-index 5
  bottom 46rem
  width 100%
  height 100%
  background #fff
  .foodContent
    height auto
    &.show-enter, &.show-leave-to
      transform translate3d(100%,0,0)
    &.show-enter-active, &.show-leave-active
      transition all 0.2s linear
    &.show-enter-to, &.show-leave
      transform translate3d(0,0,0)
    .img
      position relative
      width 100%
      height 0
      padding-top 100%
      background #000
      &>img
        position absolute
        top 0
        left 0
        width 100%
        height 100%
      .icon-arrow_lift
        position absolute
        top 15px
        left 10px
        font-size 16px
        color #fff
</style>

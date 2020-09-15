<template>
  <div class="cartcontrol">
    <!-- 有3个地方用到这个组件，因为需要父组件传递参数，只要父组件用到这个组件，就要写要传递的数据，不然会报错 -->
     <transition name="fade">
      <div v-show="food.count>0" class="cart-decrease icon-remove_circle_outline" @click.stop.prevent="decreaseCart"></div>
     </transition>
     <transition name="countFade">
        <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
     </transition>
     <div class="cart-add icon-add_circle" @click.stop.prevent="addCart($event)"></div>
  </div>
</template>
<script>
// import Vue from 'vue'
export default {
  data() {
    return {
    }
  },
  props: {
    food: {
      type: Object
    }
  },
  created() {
    // console.log('这是同步的数据－－－',this.food)
  },
  methods: {
    addCart(event) {
      // console.log('选择的商品--', this.food)
      if (!this.food.count) {
        this.$set(this.food, 'count', 1)
      } else {
        this.food.count++
      }
      // 触发点击事件，把当前的点击的DOM的信息传递到父组件中，子组件和父组件通信的一种方式
      this.$emit('cartAdd', event.target)
      // console.log(this.food)
    },
    // 去掉添加的商品
    decreaseCart(event) {
      if (this.food.count) {
        this.food.count--
      }
    }
  },
  mounted() {
  }
}
</script>
 <style lang="stylus" scoped>
 @import '../../common/styles/index.styl'
 .cartcontrol
  display inline-block
  .cart-decrease
    display inline-block
    line-height 24px
    font-size 24px
    color rgb(0,160,220)
    &.fade-enter, &.fade-leave-to
      opacity 0
      transform translate3d(24px, 0 ,0) rotate(180deg)
    &.fade-enter-active, &.fade-leave-active
      transition all 0.2s
    &.fade-enter-to
      opacity 1
  .cart-count
    display inline-block
    vertical-align top
    line-height 24px
    font-size 10px
    color rgb(147,153,159)
    &.countFade-enter
      opacity 0
    &.countFade-enter-active
      transition all 0.5s
    &.countFade-enter-to
      opacity 1
  .cart-add
    display inline-block
    line-height 24px
    font-size 24px
    color rgb(0,160,220)
 </style>

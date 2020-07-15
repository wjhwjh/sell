<template>
  <div class="cartcontrol">
     <div class="cart-decrease icon-remove_circle_outline" @click="decreaseCart"></div>
     <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
     <div class="cart-add icon-add_circle" @click="addCart"></div>
  </div>
</template>
<script>
import Vue from 'vue'
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
  methods: {
    addCart(event) {
       console.log('添加商品')
      // console.log('选择的商品--', this.food)
      if (!this.food.count) {
        this.$set(this.food, 'count', 1)
      } else {
        this.food.count++
      }
      this.$emit('cart.add', event.target)
      // console.log(this.food)
    },
    decreaseCart(event) {
      if(this.food.count){
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
  .cart-decrease, .cart-add
    display inline-block
    line-height 24px
    font-size 24px
    color rgb(0,160,220)
  .cart-count
    display inline-block
    vertical-align top
    line-height 24px
    font-size 10px
    color rgb(147,153,159)
  .cart-add
    display inline-block
 </style>

<template>
  <div class="shopcart">
    <!-- 购物车 -->
    <div class="content">
      <div class="content-left">
          <div class="logo-wrapper">
              <div class="logo" :class="{'heightlight':totalCount>0}">
                <i class="icon-shopping_cart" :class="{'heightlight':totalCount>0}"></i>
              </div>
              <div class="num" v-show="totalCount>0">{{totalCount}}</div>
          </div>
          <div class="price" :class="{'heightlight':totalPrice>0}">{{totalPrice}}￥</div>
          <div class="desc">另需配送费￥{{deliveryPrice}}元</div>
      </div>
      <div class="content-right">
          <div class="pay" :class="payClass">
            {{payDesc}}
          </div>
      </div>
    </div>
    <!-- 购物车列表 -->
    <div class="shopcart-list">
       <div></div>
       <ul>
          <li></li>
         </ul>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {}
  },
  props: {
    selectedFood: {
      type: Array,
      default() {
        return [
          {
            count: 0,
            price: 10
          }
        ]
      }
    },
    deliveryPrice: {
      type: Number,
      default: 0
    },
    minPrice: {
      type: Number,
      default: 20
    }
  },
  computed: {
    totalCount() {
      let total = 0
      this.selectedFood.forEach((item) => {
        total += item.count
      })
      return total
    },
    // eslint-disable-next-line vue/return-in-computed-property
    totalPrice() {
      // eslint-disable-next-line no-unused-vars
      let total = 0
      this.selectedFood.forEach((item) => {
        total += item.count * item.price
      })
      return total
    },
    // 结算按钮样式显示，根据计算结果调用不同的样式
    payClass() {
      if (this.totalPrice >= this.minPrice) {
        return 'enough'
      } else {
        return 'not-enough'
      }
    },
    // 结算按钮内容显示计算，根据返回值显示不同
    payDesc() {
      console.log(this.totalPrice)
      if (this.totalPrice === 0) {
        return `￥${this.minPrice}元起送`
      } else if (this.totalPrice < this.minPrice) {
        let diff = this.minPrice - this.totalPrice
        return `￥还差${diff}元起送`
      } else {
        return '去结算'
      }
    }
  },
  methods: {}
}
</script>
<style lang="stylus" scoped>
@import '../../common/styles/mixin.styl'
.shopcart
  position fixed
  width 100%
  bottom 0
  background #141d27
  z-index 10
  height 46px
  .content
    display flex
    width 100%
    height 46px
    .content-left
      flex 1
      position relative
      display flex
      .logo-wrapper
        width 58px
        height 58px
        position relative
        margin 0 12px
        top -10px
        background #141d27
        border-radius 50%
        padding 6px
        .logo
          width 44px
          height 44px
          background #2b343c
          border-radius 50%
          text-align center
          &.heightlight
            background #00a0dc
          .icon-shopping_cart
            color #80858a
            font-size 24px
            line-height 44px
            &.heightlight
              color #fff
        .num
          width 24px
          height 16px
          background #f01414
          color #ffffff
          font-size 9px
          text-align center
          line-height 16px
          font-weight 700
          position absolute
          top 0
          right 0
          border-radius 16px
          box-shadow 0 4px 8px 0 rgba(0,0,0,0.4)
      .price
        margin 12px 0
        padding-right 12px
        line-height 24px
        border-right 1px solid rgba(255,255,255,0.1)
        font-size 16px
        color rgba(255,255,255,0.4)
        font-weight 700
        &.heightlight
          color #fff
      .desc
        margin 12px 0 12px 12px
        font-size 12px
        color rgba(255,255,255,0.4)
        line-height 24px
    .content-right
      width 105px
      flex 0 0 105px
      text-align center
      .pay
        width 100%
        height 48px
        line-height 48px
        font-size 12px
        font-weight 700
      .not-enough
        color #979a9c
        background #2b333b  
      .enough
        color #fff
        background #00b43c
</style>

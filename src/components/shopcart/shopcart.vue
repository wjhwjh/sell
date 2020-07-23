<template>
  <div class="shopcart">
    <!-- 购物车 -->
    <div class="content">
      <div class="content-left">
          <div class="logo-wrapper">
              <div class="logo" :class="{'heightlight':totalCount>0}" @click="showShopList">
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
    <div class="shopcart-list" v-show="shopListShow">
       <div class="list-header">
         <h1 class="title">购物车</h1>
         <span class="empty">清空</span>
       </div>
       <div class="list-content">
          <ul>
             <li class="food" v-for="(food, index) in selectedFoods" :key="index">
              <span class="name">{{food.name}}</span>
              <div class="price">
                ￥<span class="priceNum">{{food.price}}</span>
              </div>
              <div class="cartcontrol-wrapper"><cartcontrol :food="food"></cartcontrol></div>
            </li>
          </ul>
       </div>
    </div>

    <!-- 背景 -->
    <div class="list-mark"  v-show="shopListShow"></div>
  </div>
</template>
<script>
import cartcontrol from '../cartcontrol/cartcontrol'
export default {
  data() {
    return {
      shopListShow:false
    }
  },
  props: {
    selectedFoods: {
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
      // console.log('这是传递的数据－－',this.selectedFoods)
      let total = 0
      this.selectedFoods.forEach((item) => {
        total += item.count
      })
      return total
    },
    // eslint-disable-next-line vue/return-in-computed-property
    totalPrice() {
      // eslint-disable-next-line no-unused-vars
      let total = 0
      this.selectedFoods.forEach((item) => {
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
      // console.log(this.totalPrice)
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
  methods: {
    showShopList() {
      if(this.totalCount >0)this.shopListShow = !this.shopListShow
    }
  },
  mounted() {
    // console.log('传递的数据--',this.selectedFoods)
  },
  components: {
    cartcontrol
  }
}
</script>
<style lang="stylus" scoped>
@import '../../common/styles/mixin.styl'
.shopcart
  position fixed
  width 100%
  bottom 0
  z-index 10
  height 46px
  .content
    display flex
    width 100%
    height 46px
    background #141d27
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
  .shopcart-list
    position absolute
    top 0
    left 0
    z-index -1
    width 100%
    background #fff
    transform: translate3d(0, -100%, 0)
    .list-header
      width 100%
      height 40px
      border-1px(rgba(7,17,27,0.1))
      padding 0 12px
      display flex
      justify-content space-between
      background #f3f5f7
      .title
        line-height 40px
        font-size 14px
        font-weight 200
        color rgb(7,17,27)
      .empty
        line-height 40px
        font-size 12px
        color rgb(0,160,220)
    .list-content
      padding 0 12px
      max-height 217px
      overflow hidden
      background #fff
      .food
        position relative
        width 100%
        height 48px
        padding-right 70px
        border-1px(rgba(7,17,27,0.1))
        display flex
        justify-content space-between
        .name
          display inline-block
          line-height 48px
          font-size 14px
          color rgb(7,17,27)
      .price
        line-height 48px
        font-size: 10px
        color: rgb(240,20,20)
        .priceNum
          font-size: 14px
          font-weight: 700
      .cartcontrol-wrapper
        position absolute
        right 0
        top 5px
        height 100%
        line-height 48px
        font-size 12px
  .list-mark
    position fixed
    top 0
    left 0
    z-index -2
    width 100%
    height 100%
    //filter blur(10px)
    background: rgba(7,17,27,0.6)

</style>

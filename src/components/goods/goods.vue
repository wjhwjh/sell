<template>
    <div>
    <div class="goods">
      <div class="menu-wrapper" ref="menuGoods">
        <ul class="menu-list">
          <li class="item" v-for="(item, index) in goods" :key="index"><span class="text"><span v-if="item.type>=0" class="icon" :class="mapStyle[item.type]"></span>{{item.name}}</span></li>
        </ul>
      </div>
      <div class="goods-wrapper" ref="contentGodds">
        <ul>
          <li v-for="(item,index) in goods" :key="index" class="goods-list">
             <h2 class="title">{{item.name}}</h2>
             <ul>
               <li class="goods-item" v-for="(food, idx) in item.foods" :key="idx">
                 <div class="img">
                   <img :src="food.image" alt="">
                 </div>
                 <div class="content">
                      <h3 class="name">{{food.name}}</h3>
                      <div class="desc" v-if="food.description">{{food.description}}</div>
                      <div class="extra">
                        <span>月售{{food.sellCount}}份</span><span>好频率{{food.rating}}%</span>
                      </div>
                      <div class="price"><span class="nowPrice">￥{{food.price}}</span><span v-if="food.oldPrice" class="oldPrice">￥{{food.oldPrice}}</span></div>
                      <div class="cartcontrol-wrapper">
                        <cartcontrol :food="food"></cartcontrol>
                      </div>
                 </div>
               </li>
             </ul>
          </li>
        </ul>
      </div>
    </div>
    <!-- 购物车组件 -->
    <shopCart :selectedFoods='selectedFoods'></shopCart>
    </div>
</template>
<script>
import BScroll from 'better-scroll'
import shopCart from '../shopcart/shopcart'
import cartcontrol from '../cartcontrol/cartcontrol'
let ERR_NO = 0
let mapStyle = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
export default {
  data() {
    return {
      goods: [],
      mapStyle,
      selectedFood: {} // 商品详情页面使用的数据
    }
  },
  computed: {
    // 购物车使用的数据
    selectedFoods() {
      let foods = []
      this.goods.forEach(good => {
        good.foods.forEach(food => {
          if (food.count) {
            foods.push(food)
          }
        })
      })
      console.log('----', foods)
      return foods
    }

  },
  created () {
    // console.log(this.$Axios)
    this.$Axios.get('/goods')
      .then(res => {
        if (ERR_NO === res.data.errno) {
          this.goods = res.data.data
          console.log('这是数据---', this.goods)
          this.$nextTick(() => {
            this._inintScroll()
          })
          // console.log('这是商品页面的数据--', this.goods)
        }
      })
  },
  mounted() {
    // console.log('获取元素---', this.$refs.menuGoods)
  },
  methods: {
    _inintScroll() {
      let menuScroll = new BScroll(this.$refs.menuGoods, {
        click: true
      })
      let goodScroll = new BScroll(this.$refs.contentGodds, {
        click: true
      })
      // console.log(menuScroll, goodScroll)
    }
  },
  components: {
    shopCart,
    cartcontrol
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import '../../common/styles/index.styl'
 .goods
    display flex
    position absolute
    width 100%
    bottom 46px
    top 169px
    overflow hidden
    .menu-wrapper
      width 80px
      flex 0 0 80px
      height 100%
      background #f3f5f7
      .menu-list
        background #f3f5f7
        .item
          width 100%
          height 54px
          display table
          padding 0 12px
          color rgb(7, 17,27)
          &.current
            background #fff
            font-weight bold
          &:last-child
            .text
              border-none()
          .text
            font-size 12px
            line-height 14px
            vertical-align middle
            display table-cell
            border-1px(rgba(7,17,27,0.1))
            .icon
              width 12px
              height 12px
              display inline-block
              vertical-align bottom
              margin-right 4px
              &.decrease {
                bg-image('decrease_3');
              }

              &.discount {
                bg-image('discount_3');
              }

              &.guarantee {
                bg-image('guarantee_3');
              }

              &.invoice {
                bg-image('invoice_3');
              }

              &.special {
                bg-image('special_3');
              }
    .goods-wrapper
      flex 1
      .goods-list
        background #fff
        .title
          line-height 26px
          font-size 12px
          color rgb(147,153,159)
          background #f3f5f7
          border-left 2px solid #d9dde1
          padding-left 18px
        &>ul
          padding 0 18px
          .goods-item
            display flex
            padding 18px 0
            border-1px(rgba(7,17,27,0.1))
            &:last-child
              border-none()
            .img
              width 57px
              height 57px
              flex 0 0 57px
              &>img
                width 100%
            .content
              padding-left 10px
              position relative
              flex 1
              .cartcontrol-wrapper
                position absolute
                bottom 0
                right 0
              .name
                font-size 14px
                color rgb(7,17,27)
                line-height 14px
              .desc
                line-height: 1.4;
                font-size 10px
                color rgb(147,153,159)
                margin 8px 0
              .extra
                font-size 10px
                color rgb(147,153,159)
                line-height 10px
                margin-top 8px
              .price
                font-size 10px
                color rgb(147,153,159)
                line-height 24px
                font-weight 700
                .nowPrice
                  color #eb4242
                  margin-right 8px
                .oldPrice
                  text-decoration line-through
</style>

<template>
    <div class="goods">
      <div class="menu-wrapper" ref="menuGoods">
        <ul class="menu-list">
          <li class="item" v-for="(item, index) in goods" :key="index"><span class="text"><span v-if="item.type>=0" class="icon" :class="mapStyle[item.type]"></span>{{item.name}}</span></li>
        </ul>
      </div>
      <div class="goods-wrapper" ref="contentGodds">
        <ul class="goods-list">
          <li>1111</li>
        </ul>
      </div>
    </div>
</template>
<script>
import BScroll from 'better-scroll'
let ERR_NO = 0
let mapStyle = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
export default {
  data() {
    return {
      goods: [],
      mapStyle
    }
  },
  created () {
    // console.log(this.$Axios)
    this.$Axios.get('/goods')
      .then(res => {
        if (ERR_NO === res.data.errno) {
          this.goods = res.data.data
          this.$nextTick(() => {
            this._inintScroll()
          })
          console.log('这是商品页面的数据--', this.goods)
        }
      })
  },
  mounted() {
    // console.log('获取元素---', this.$refs.menuGoods)
  },
  methods: {
    _inintScroll() {
      let menuScroll = new BScroll(this.$refs.menuGoods, {})
      let goodScroll = new BScroll(this.$refs.contentGodds, {})
      console.log(menuScroll, goodScroll)
    }
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
        height 2000px
        background #f0f0f0
</style>

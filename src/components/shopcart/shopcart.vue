<template>
  <div class="shopcart">
    <div class="content">
      <div class="content-left">
          <div class="logo-wrapper">
              <div class="logo">
                <i class="icon-shopping_cart"></i>
              </div>
              <div class="num">1</div>
          </div>
          <div class="price">30￥</div>
          <div class="desc">另需配送费￥4元</div>
      </div>
      <div class="content-right">
还差￥10起送
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {}
  }
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
      .desc
        margin 12px 0 12px 12px
        font-size 12px
        color rgba(255,255,255,0.4)
        line-height 24px
    .content-right
      width 105px
      flex 0 0 105px
      text-align center
      line-height 48px
      font-size 14px
      font-weight 700
      color #979a9c
      background #2b333b
      &.heightlight
        color #fff
        background #00b43c
</style>

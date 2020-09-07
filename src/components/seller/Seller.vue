<template>
    <div class="seller"  ref="seller">
      <div class="seller-content">
        <div class="coverview">
          <div class="content">
            <h1 class="title">{{seller.name}}</h1>
            <div class="count-wrapper">
              <star :size='36' :score="seller.score"></star>
              <span class="score-count">({{seller.ratingCount}})</span>
              <span class="count">月售{{seller.sellCount}}单</span>
            </div>
          </div>
          <ul class="des-list">
            <li class="item">
              <p class="price-des">起送价</p>
              <p class="price">{{seller.minPrice}}<span>元</span></p>
            </li>
            <li class="item">
              <p class="price-des">商家配送</p>
              <p class="price">{{seller.deliveryPrice}}<span>元</span></p>
            </li>
            <li class="item">
              <p class="price-des">平均配送时间</p>
              <p class="price">{{seller.deliveryTime}}<span>分钟</span></p>
            </li>
          </ul>
          <div class="follower-wrappwer">
            <span class="icon icon-favorite"></span>
            <p class="text">已收藏</p>
          </div>
        </div>
        <split></split>
        <div class="bulletin">
          <h1 class="title">公告与活动</h1>
          <p class="text">{{seller.bulletin}}</p>
          <ul class="supports-list">
            <li class="item" v-for="(item, index) in seller.supports" :key="index">
              <span class="icon decrease" :class="mapStyle[item.type]"></span>{{item.description}}
            </li>
          </ul>
        </div>
        <split></split>
        <div class="scene">
          <h1 class="title">公告与活动</h1>
          <div class="img-wrapper" ref="imgWrapper">
            <ul class="img-list">
                <li class="item" v-for="(item, index) in seller.pics" :key="index">
                  <img :src="item" alt="">
                </li>
            </ul>
          </div>
        </div>
        <split></split>
        <div class="info">
          <h1 class="title">公告与活动</h1>
          <ul class="info-list">
            <li class="item" v-for="(item, index) in seller.infos" :key="index">{{item}}</li>
          </ul>
        </div>
      </div>
    </div>
</template>
<script>
import BScroll from 'better-scroll'
import star from 'components/star/star'
import split from 'components/split/split'

let mapStyle = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
export default {
  data() {
    return {
      seller: {},
      mapStyle
    }
  },
  created () {
    // console.log(this.$Axios)
    this.$Axios.get('/sellers')
      .then((res) => {
        this.seller = res.data.data
        console.log(this.seller)
        this.$nextTick(() => {
          this.scroll = new BScroll(this.$refs.seller, {
            click: true
          })
          this.imgscroll = new BScroll(this.$refs.imgWrapper, {
            click: true,
            scrollX: true
          })
        })
      })
  },
  computed: {},
  methods: {},
  components: {
    star,
    split
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../../common/styles/index.styl'
 .seller
    position absolute
    width 100%
    top 169px
    bottom 0
    overflow hidden
    .seller-content
      display block
      .coverview
        position relative
        padding 18px
        .follower-wrappwer
          position absolute
          width 40px
          right 18px
          top 18px
          text-align center
          .icon
            display inline-block
            font-size 24px
            color rgb(147,153,159)
            line-height 24px
            &.on
              color rgb(240,20,20)
          .text
            margin-top 4px
            font-size 10px
            color rgb(77,85,93)
            line-height 10px
        .content
          padding-bottom 18px
          margin-bottom 18px
          border-1px(rgba(7,17,27,0.1))
          .title
            margin-bottom 8px
            font-size 14px
            color rgb(7,17,27)
            line-height 14px
          .count-wrapper
            color rgb(77,85,93)
            line-height 18px
            .star
              display inline-block
            .score-count
              margin 0 12px 0 8px
              font-size 10px
              color rgb(77,85,93)
              line-height 18px
            .count
              font-size 10px
              color rgb(77,85,93)
              line-height 18px
        .des-list
          display flex
          align-items center
          justify-content space-between
          .item
            flex: 0 0 33.33%;
            text-align: center;
            border-right 1px solid rgba(7,17,27,0.1)
            &:last-child
              border-right 0
            .price-des
              margin-bottom 4px
              font-size 10px
              color rgb(147,153,159)
              line-height 10px
            .price
              font-size 24px
              font-weight 200
              color rgb(7,17,27)
              line-height 24px
              span
                font-size 10px
      .bulletin
        padding 18px
        .title
          margin-bottom 8px
          font-size 14px
          color rgb(7,17,27)
          line-height 14px
        .text
          line-height 24px
          font-size 12px
          font-weight 200
          color rgb(240,20,20)
          text-align justify
        .supports-list
          margin-top 16px
          .item
            padding 16px 12px
            border-top 1px solid rgba(7,17,27,0.1)
            font-size 12px
            font-weight 200
            color rgb(7,17,27)
            line-height 16px
            .icon
              margin-right 6px
              display inline-block
              vertical-align top
              width 16px
              height 16px
              &.decrease
                bg-image('decrease_4')
              &.discount
                bg-image('discount_4')
              &.guarantee
                bg-image('guarantee_4')
              &.invoice
                bg-image('invoice_4')
              &.special
                bg-image('special_4')
      .scene
        padding 18px 0 18px 18px
        .title
          margin-bottom 8px
          font-size 14px
          color rgb(7,17,27)
          line-height 14px
        .img-wrapper
          padding-left 18px
          display block
          width 100%
          overflow hidden
          .img-list
            display block
            height 90px
            width 500px
            white-space: nowrap;
            .item
              vertical-align top
              display inline-block
              margin-right 6px
              width 120px
              height 90px
              img
                width 100%
                height auto
      .info
        padding 18px
        .title
          margin-bottom 8px
          font-size 14px
          color rgb(7,17,27)
          line-height 14px
        .info-list
          width 100%
          .item
            padding 16px 12px
            border-top 1px solid rgba(7,17,27,0.1)
            font-size 12px
            font-weight 200
            color rgb(7,17,27)
            line-height 16px
</style>

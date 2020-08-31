<template>
    <div class="ratings">
      <div class="ratings-content">
        <div class="overview">
          <div class="overview-left">
            <span class="score">{{sellers.score}}</span>
            <span class="title">综合评分</span>
            <span class="rank">高于周边商家{{sellers.rankRate}}%</span>
          </div>
          <div class="overview-right">
            <div class="score-wrapper">
              <span class="title">服务态度</span>
              <div class="star-wrapper"><star :size='36' :score="sellers.serviceScore"></star></div>
              <span class="score">{{sellers.serviceScore}}</span>
            </div>
            <div class="score-wrapper">
              <span class="title">商品评分</span>
              <div class="star-wrapper"><star :size='36' :score="sellers.foodScore"></star></div>
              <span class="score">{{sellers.foodScore}}</span>
            </div>
            <div class="delivery-wrapper">
              <span class="title">送达时间</span>
              <span class="delivery-time">{{sellers.deliveryTime}}</span>
            </div>
          </div>
        </div>
        <split></split>
      </div>
    </div>
</template>
<script>
import star from 'components/star/star'
import split from 'components/split/split'
export default {
  data() {
    return {
      sellers: []
    }
  },
  created () {
    this.$Axios.get('/sellers')
      .then(res => {
        // console.log('评价数据', res)
        this.sellers = res.data.data
        console.log('评价数据', this.sellers)
      })
  },
  components: {
    star,
    split
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
 .ratings
    position absolute
    width 100%
    top 169px
    bottom 0
    overflow hidden
    // background #f00
    .overview
      display flex
      padding 18px 0
      .overview-left
        flex 0 0 137px
        padding 6px 0
        border-right 1px solid #ccc
        text-align center
        .score
          display block
          font-size 24px
          line-height 28px
          color rgb(255, 153, 0)
        .title
          display block
          margin 6px 0 8px
          font-size 12px
          color rgb(7,17,27)
          line-height 12px
        .rank
          display block
          font-size 10px
          color rgb(147,153,159)
          line-height 10px
      .overview-right
        padding 6px 24px
        .score-wrapper
          display flex
          flex 1
          align-items center
          padding-bottom 8px
          .title
            margin-right 12px
            font-size 12px
            color rgb(7,17,27)
            line-height 12px
          .score
            margin-left 12px
            font-size 12px
            color rgb(255,153,0)
            line-height 18px
        .delivery-wrapper
          display block
          .title
            margin-right 12px
            font-size 12px
            color rgb(7,17,27)
            line-height 12px
          .delivery-time
            font-size 12px
            color rgb(147,153,159)
            line-height 18px
</style>

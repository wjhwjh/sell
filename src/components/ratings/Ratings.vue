<template>
    <div class="ratings" ref="ratingsContent">
      <div class="ratings-content" ref="rat">
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
        <ratingSelect :selectType='selecttype' :onlyContent='onlycontent' @ratingType='ratingType' @toggleContent='toggleContent' :ratings='ratings'></ratingSelect>
        <ul class="ratings-list" v-show="ratings && ratings.length">
          <li v-for="(ratingItem, index) in ratings" :key="index" v-show="showRating(ratingItem.rateType, ratingItem.text)" class="item">
            <img :src="ratingItem.avatar" alt="" class="avatar">
            <div class="des">
              <div class="user">
                <div class="detail">
                  <span class="name">{{ratingItem.username}}</span>
                  <div class="star-wrapper"><star :size="24" :score="ratingItem.score"></star><span v-if="ratingItem.deliveryTime" class="send-time">{{ratingItem.deliveryTime}}分钟送达</span></div>
                </div>
                <span class="time">{{ratingItem.rateTime}}</span>
              </div>
              <div class="text">{{ratingItem.text}}</div>
              <div v-show="!ratingItem.recommend.length" v-for="(item, idx) in ratingItem.recommend" :key="idx" class="recommend-wrapper">
                <i></i>
                <span>{{item}}</span>
              </div>
            </div>
          </li>
        </ul>
        <div v-show="!ratings || !ratings.length">暂无数据</div>
      </div>
    </div>
</template>
<script>
import BScroller from 'better-scroll'
import star from 'components/star/star'
import split from 'components/split/split'
import ratingSelect from 'components/ratingSelect/ratingSelect'
const ALL = 2
const POSITIVE = 0
const NEGATIVE = 1
export default {
  data() {
    return {
      sellers: [],
      ratings: [],
      desc: {
        all: '全部',
        positive: '满意',
        negative: '不满意'
      },
      selecttype: ALL,
      onlycontent: false
    }
  },
  created () {
    this.$Axios.get('/sellers')
      .then(res => {
        // console.log('评价数据', res)
        this.sellers = res.data.data
        // console.log('商家数据', this.sellers)
      })
    this.$Axios.get('/ratings')
      .then(res => {
        // console.log('评价数据', res)
        this.ratings = res.data.data
        // console.log('评价数据', this.ratings)

        this.$nextTick(() => {
          // console.log(this.$refs.ratingsContent.offsetHeight)
          // console.log(this.$refs.rat.offsetHeight)
          this.scroll = new BScroller(this.$refs.ratingsContent, {
            click: true
          })
        })
      })
  },
  computed: {
  },
  methods: {
    ratingType(type) {
      // console.log('类型--', type)
      this.selecttype = type
      this.$nextTick(() => {
        this.scroll.refresh()
      })
    },
    toggleContent(onlycontent) {
      // console.log('是否是只读--', onlycontent)
      this.onlycontent = onlycontent
      this.$nextTick(() => {
        this.scroll.refresh()
      })
    },
    // 数据驱动试图，只要是数据在改变的时候，就会执行这里
    // 根据数据，判断控制每条评论是否显示
    showRating(type, text) {
      // 当onlycontent为ture,内容为空时不显示次条数据
      // 其它情况onlycontent为true,内容不为空时， onlycontent为false时，内容都显示
      // 这个方法作用于每一个li标签，这个角度思考
      if (this.onlycontent && !text) {
        return false
      }

      // 每一条评论根据切换判断其属于那种类型
      // 这里很有趣，用两个变量控制同一条数据是否显示
      if (this.selecttype === ALL) {
        return true
      } else {
        return type === this.selecttype
      }
    }
  },
  components: {
    star,
    split,
    ratingSelect
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
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
    .ratings-list
      padding 0 18px
      .item
        display flex
        padding 18px 0
        border-bottom 1px solid rgba(7,17,27.0.1)
        .avatar
            width 28px
            flex 0 0 28px
            height 28px
            border-radius 50%
        .des
          flex 1
          .user
            padding-bottom 6px
            display flex
            justify-content space-between
            align-items top
            .detail
              margin-left 12px
              .name
                display block
                margin-bottom 4px
                font-size 10px
                color rgb(7,17,27)
                line-height 12px
              .star-wrapper
                .star
                  display inline-block
                  margin-right 6px
                .send-time
                  font-size 10px
                  font-weight 200
                  color rgb(147,153,159)
                  line-height 12px
            .time
              font-size 10px
              font-weight 200
              color rgb(147,153,159)
              line-height 12px
          .text
            font-size 12px
            font-weight 200
            color rgb(7,17,27)
            line-height 12px

</style>

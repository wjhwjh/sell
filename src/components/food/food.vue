<template>
  <transition name="show">
    <div v-show="showFlag" class="foodDetail" ref="foodDetail">
      <div class="foodContent">
          <!-- 图片写法 -->
        <div class="img">
          <img :src="food.image" alt="">
          <i class="icon-arrow_lift" @click="hide"></i>
        </div>
        <!-- 标题 -->
        <div class="content">
          <h1 class="title">{{food.name}}</h1>
          <div class="detail">
            <span class="sell-count">月售{{food.sellCount}}份</span><span class="rating">好评率{{food.rating}}%</span>
          </div>
          <div class="price">
            <span class="now">￥{{food.price}}</span>
            <span class="old" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
          </div>
          <div class="controlWrapper">
            <cartcontrol :food='food' v-if="food.count" @cartAdd = 'cartAdd'></cartcontrol>
          </div>

          <transition name="fade">
            <div @click="addFirst($event)" class="buy" v-show="!food.count || food.count===0">加入购物车</div>
          </transition>
        </div>
         <split v-if="food.info"></split>
        <!-- 商品介绍 -->
        <div class="content" v-if="food.info">
          <div class="moduleTitle">商品介绍</div>
          <p class="food-des">
            {{food.info}}
          </p>
        </div>
        <split></split>
        <!-- 商品评价 -->
        <div class="rating">
          <h1 class="title">商品评价</h1>
          <!-- 父组件向子组件传递数据，在传递数据的时候变量的命名 -->
          <ratingSelect @ratingType='ratingType' @toggleContent='toggleContent' :select-type='selecttype' :ratings="food.ratings" :only-content='onlycontent' :desc='desc'></ratingSelect>
          <ul class="rating-list">
            <li>这是评价列表</li>
          </ul>
          <div v-if="!food.ratings || !food.ratings.length" class="no-rating">暂无数据</div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import BScroll from 'better-scroll'
import cartcontrol from '../cartcontrol/cartcontrol'
import split from '../split/split'
import ratingSelect from '../ratingSelect/ratingSelect'
const ALL = 2
export default {
  props: {
    food: {
      type: Object
    }
  },
  data () {
    return {
      showFlag: false,
      onlycontent: true,
      selecttype: ALL,
      desc: {
        all: '全部',
        positive: '推荐',
        negative: '吐槽'
      }
    }
  },
  methods: {
    show() {
      this.onlycontent = true
      this.selecttype = ALL
      this.showFlag = true
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.foodDetail, {
            click: true
          })
        } else {
          this.scroll.refresh()
        }
      })
    },
    hide() {
      this.showFlag = false
    },
    addFirst(event) {
      this.$emit('cartAdd', event.target)
      this.$set(this.food, 'count', 1)
      console.log('商品相关的数据', this.food)
    },
    cartAdd(el) {
      this.$emit('cartAdd', el)
    },
    // 子组件传递的是否看全部内容
    toggleContent(flag) {
      this.onlycontent = flag
    },
    // 子组件传递的所选择的类型
    ratingType(type) {
      this.selecttype = type
    }
  },
  mounted() {
  },
  components: {
    cartcontrol,
    split,
    ratingSelect
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus"  scoped>
.foodDetail
  position fixed
  top 0
  left 0
  z-index 5
  bottom 46rem
  width 100%
  height 100%
  background #fff
  &.show-enter, &.show-leave-to
    transform translate3d(100%,0,0)
  &.show-enter-active, &.show-leave-active
    transition all 0.2s linear
  &.show-enter-to, &.show-leave
    transform translate3d(0,0,0)
  .foodContent
    height auto
    .img
      position relative
      width 100%
      height 0
      padding-top 100%
      background #000
      &>img
        position absolute
        top 0
        left 0
        width 100%
        height 100%
      .icon-arrow_lift
        position absolute
        top 15px
        left 10px
        font-size 16px
        color #fff
    .content
      position relative
      padding 18px
      .title
        line-height 1
        font-size 14px
        color rgba(7,17,27,1)
        font-weight 700
      .detail
         padding 8px 0 13px
         font-size 10px
         color rgb(147,153,159)
         line-height 10px
         .rating
            margin-left 12px
      .price
        .now
          font-size 20px
          color rgb(240,20,20)
          line-height 1
          font-weight 700
        .old
          text-decoration line-through
          font-size 10px
          color rgb(147,153,159)
          line-height 1
          font-weight 700
      .controlWrapper
        position absolute
        right 18px
        bottom 18px
      .buy
        position absolute
        right 18px
        bottom 18px
        width 74px
        height 24px
        padding 0 12px
        border-radius 12px
        background rgb(0,160,220)
        text-align center
        line-height 24px
        color #fff
        font-size 10px
        opacity 1
        &.fade-enter, &.fade-leave-to
          opacity 0
        &.fade-enter-active, &.fade-leave-active
          transition 0.5s
        &.fade-enter-to, &.fade-leave
          opacity 1
      .moduleTitle
        padding-bottom 6px
        font-size 14px
        color rgb(7,17,27)
        line-height 14px
      .food-des
        font-size 12px
        font-weight 200
        line-height 24px
        color rgb(77,85,93)
  .rating
    padding-top 18px
    padding-bottom 46px
    .title
      padding 0 18px 6px 18px
      font-size 14px
      color rgb(7,17,27)
      line-height 14px
</style>

<template>
  <div class="ratingSelect">
    <div class="rating-type">
      <div class="tab">
        <span @click="selectRatingHandle(2, $event)" class="positive-nomarl" :class="{'positive':selectType===2}">{{desc.all}}<i>{{ratings.length}}</i></span>
        <span @click="selectRatingHandle(0, $event)" class="positive-nomarl"  :class="{'positive':selectType===0}">{{desc.positive}}<i>{{positive.length}}</i></span>
        <span @click="selectRatingHandle(1, $event)" :class="{'negative':selectType===1}">{{desc.negative}}<i>{{negative.length}}</i></span>
      </div>
    </div>
    <div class="switch" @click="switchHandle" :class="{'onSwitch': onlyContent}">
      <span class="icon-check_circle"></span>
      <span class="text">只看有内容的评价</span>
    </div>
    <ul>
      <li></li>
    </ul>
  </div>
</template>
<script>
// 根据返回的数据 0=好评 1=差评 2=全部
// 子组件中不能直接改变props中的值，也就是父组件传递过来的数据，vue中数据是单向流动的，从上向下，而不能从下向上
const POSITIVE = 0
const NEGATIVE = 1
const ALL = 2
// 组件维护的数据
export default {
  data() {
    return {
      onlyContentNew: false
    }
  },
  props: {
    ratings: {
      type: Array,
      default() {
        return []
      }
    },
    selectType: {
      type: Number,
      default: ALL
    },
    onlyContent: {
      type: Boolean,
      dafault: false
    },
    desc: {
      type: Object,
      default() {
        return {
          all: '全部',
          positive: '满意',
          negative: '不满意'
        }
      }
    }
  },
  computed: {
    positive() {
      // console.log('这是一个计算属性函数')
      return this.ratings.filter(item => {
        return item.rateType === 0
      })
    },
    negative() {
      return this.ratings.filter(item => {
        return item.rateType === 1
      })
    }
  },
  methods: {
    selectRatingHandle(type) {
    // console.log('选择的评论类型', type)
      this.$emit('ratingType', type)
    },
    switchHandle () {
      this.onlyContentNew = !this.onlyContent
      // console.log('是否全部展示', this.onlyContentNew)
      this.$emit('toggleContent', this.onlyContentNew)
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
@import "../../common/styles/index.styl"
.rating-type
  width 100%
  padding 12px 18px 0
  .tab
    padding-bottom 18px
    border-bottom 1px solid rgba(7,17,27,0.1)
    &>span
      display inline-block
      margin-right 8px
      padding 8px
      border-radius 2px
      font-size 12px
      line-height 16px
      color rgb(77,85,93)
      background rgba(77,85,93,0.1)
      &>i
        padding-left 3px
        font-style normal
      &.positive-nomarl
        background rgba(0,160,220,0.2)
      &.positive
        color #fff
        background rgb(0,160,220)
      &.negative
         background rgba(77,85,93,0.3)
.switch
  padding 12px 18px
  border-bottom 1px solid rgba(7,17,27,0.1)
  .icon-check_circle
    vertical-align: bottom;
    font-size 24px
    color rgb(147,153,159)
    line-height 24px
  &.onSwitch
    .icon-check_circle
      color #00c850
  .text
    font-size 12px
    line-height 24px
    color rgb(147,153,159)
</style>

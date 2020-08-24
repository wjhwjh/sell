<template>
  <div class="ratingSelect">
    <div class="rating-type">
      <div class="tab">
        <span>{{desc.all}}</span>
        <span>{{desc.positive}}</span>
        <span>{{desc.negative}}</span>
      </div>
    </div>
    <div class="switch">
      <span class="icon-check_circle"></span>
      <span class="text">只看有内容的评价</span>
    </div>
    <ul>
      <li></li>
    </ul>
  </div>
</template>
<script>
const POSITIVE = 0
const NEGATIVE = 1
const ALL = 2
// 组件维护的数据
export default {
  data() {
    return {}
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
      padding 8px 12px
      font-size 12px
      line-height 16px
      color rgb(77,85,93)
      background rgba(77,85,93,0.2)
.switch
  padding 12px 18px
  border-bottom 1px solid rgba(7,17,27,0.1)
  .icon-check_circle
    vertical-align: bottom;
    font-size 24px
    color rgb(147,153,159)
    line-height 24px
  .text
    font-size 12px
    line-height 24px
    color rgb(147,153,159)
</style>

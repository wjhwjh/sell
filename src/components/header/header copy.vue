<template>
  <div class="header">
    <div></div>
    <div></div>
    <!-- 中间内容 -->
    <!-- <div class="headContent">
      <div class="left">
        <img :src="sellers.avatar" alt />
      </div>
      <div class="desc">
        <h2 class="title"><span class="icon"></span>{{sellers.name}}</h2>
        <div class="sendStyle">{{sellers.description}} / {{sellers.deliveryTime}}</div>
        <p class="descText" v-for="(item, index) in sellers.supports" :key="index" v-show="index===0">
          {{item.description}}
        </p>
      </div>
    </div>
    <div class="headNotice">{{sellers.bulletin}}</div> -->
    <!-- 弹窗 -->
  </div>
</template>
<script>
export default {
  data() {
    return {}
  },
  props: {
    sellers: {
      type: Object
    }
  },
  mounted() {
    console.log('父级商家数据--', this.sellers)
  }
}
</script>
<style lang="stylus" scoped>
.head
  background :#222
  position: relative
  .headContent
    display flex
    padding : 24px 24px 13px 24px
    .left
      width :64px
      flex :0 0 64px
      &>img
        width :100%
        border-radius :4px
    .desc
      color :#fff
      padding-left :16px
      .title
        font-size: 16px
        font-weight :bold
        line-height :18px
      .sendStyle
        padding :8px 0 10px
        font-weight :200
        font-size :12px
      .descText
        font-size: 10px
        line-height :12px
        font-weight :200px
  .headNotice
    height 28px
    line-height 28px
    padding 0 12px
    color #ffffff
    font-size 10px
    background rgba(7,17,27,0)
    text-overflow: ellipsis
    overflow hidden
    white-space nowrap
    .icon
      display inline-block
</style>

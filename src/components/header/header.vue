<template>
  <div class="header">
    <!-- 内容部分 -->
    <div class="content-wrapper">
      <!-- 左边商家logo -->
      <div class="avatar">
        <img :src="sellers.avatar" alt />
      </div>
      <!-- 右内容部分 -->
      <div class="content">
        <!-- title名称 -->
        <div class="title">
          <span class="brand"></span>
          <span>{{sellers.name}}</span>
        </div>
        <!-- 描述部分 -->
        <div class="description">{{sellers.description}} / {{sellers.deliveryTime}}</div>
        <div v-if="sellers.supports" class="support">
          <span class="icon"></span>
          <span class="text">{{sellers.supports[0].description}}</span>
        </div>
      </div>
    </div>
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
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import '../../common/styles/index.styl';
.header
  position: relative
  .content-wrapper
    background: #333333
    padding: 24px 12px 13px 24px
    color: #fff
    display: flex
    .avatar
      width: 64px
      height: 64px
      flex: 0 0 64px
      &>img
        width: 100%
        display: block
        border-radius: 4px
    .content
      padding: 2px 0 0 16px
      color #ffffff
      .title
        font-weight: bold
        font-size: 16px
        line-height: 18px
        .brand
          width 30px
          height 18px
          display inline-block
          bg-image('brand')
          // background-image :url('brand@2x.png')
      .description
        font-size 12px
        color #ffffff
        line-height 12px
        font-weight 200
        padding 8px 0
      .support
        font-size 10px
        color #ffffff
        line-height 12px
</style>

<template>
  <div id="app" class="app">
    <headNav :sellers = 'sellers'></headNav>
    <!-- tab -->
    <ul class="tab">
      <li class="tab-item">
        <router-link :to='{name:"goods"}' exact>商品</router-link>
      </li>
       <li class="tab-item">
        <router-link :to='{name:"ratings"}'>评价</router-link>
      </li>
       <li class="tab-item">
        <router-link :to='{name:"seller"}'>商家</router-link>
      </li>
    </ul>
    <router-view/>
  </div>
</template>

<script>

import headNav from 'components/header/header.vue'

const ERR_ON = 0

export default {
  name: 'App',
  data() {
    return {
      sellers: {},
      goods: [],
      ratings: []
    }
  },
  components: {
    headNav
  },
  created () {
    // 获取商家数据
    this.$Axios.get('/sellers')
      .then((res) => {
        if (res.data.errno === ERR_ON) {
          this.sellers = res.data.data
          console.log('商家数据--', this.sellers)
        }
      })

    // 获取商品数据
    this.$Axios.get('/goods')
      .then((res) => {
        if (res.data.errno === ERR_ON) {
          this.goods = res.data.data
        }
      })

    // 获取评论数据
    this.$Axios.get('/ratings')
      .then((res) => {
        if (res.data.errno === ERR_ON) {
          this.ratings = res.data.data
        }
      })
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import './common/styles/mixin.styl'

.tab
  display flex
  height 40px
  border-1px(rgba(7,17,27,0.1))
  background #fff
  .tab-item
    text-align center
    font-size 14px
    line-height 40px
    flex 1
    &>a
      color rgb(77, 85, 93)
      &.tabAcitive
        color rgb(240,20,20)
</style>

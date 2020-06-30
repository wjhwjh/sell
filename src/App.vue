<template>
  <div id="app">
    <headNav :sellers = 'sellers'></headNav>
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
</style>

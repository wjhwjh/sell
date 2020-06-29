<template>
  <div id="app">
    <headNav></headNav>
    <router-view/>
  </div>
</template>

<script>
import headNav from 'components/header/header.vue'
export default {
  name: 'App',
  data() {
    return {}
  },
  components: {
    headNav
  },
  created () {
    // console.log(this.$Axios)
    // this.$Axios.get('')
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
</style>

<template>
  <div id="app">
    <img src="./assets/logo.png">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  created () {
    console.log(this.$Axios)
    //this.$Axios.get('')
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
// 这里引入公共样式需要使用绝对路径
 @import './common/styles/index.styl';
</style>

<template>
    <div class="seller">
      <div class="seller-content">
      </div>
    </div>
</template>
<script>
export default {
  created () {
    // console.log(this.$Axios)
    this.$Axios.get('/sellers')
      .then((res) => {
        console.log('这是数据', res)
      })
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
 .box
    width:100%
    height 50px
    line-height 1
</style>

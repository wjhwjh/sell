<template>
  <div v-show="showFlag" class="foodDetail">
    <div class="img">
      <img :src="selectedFood.image" alt="">
    </div>
    <!-- <div>{{selectedFood}}</div> -->
  </div>
</template>
<script>
export default {
  props: {
    selectedFood: {
      type: Object
    }
  },
  data () {
    return {
      showFlag: false
    }
  },
  methods: {
    show() {
      this.showFlag = true
    }
  },
  mounted() {
    console.log(this.selectedFood)
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
</style>

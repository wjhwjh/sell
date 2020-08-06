<template>
  <div class="shopcart">
    <!-- 购物车 -->
    <div class="content">
      <div class="content-left">
          <div class="logo-wrapper">
              <div class="logo" :class="{'heightlight':totalCount>0}" @click="showShopListHandle">
                <i class="icon-shopping_cart" :class="{'heightlight':totalCount>0}"></i>
              </div>
              <div class="num" v-show="totalCount>0">{{totalCount}}</div>
          </div>
          <div class="price" :class="{'heightlight':totalPrice>0}">{{totalPrice}}￥</div>
          <div class="desc">另需配送费￥{{deliveryPrice}}元</div>
      </div>
      <div class="content-right">
          <div class="pay" :class="payClass">
            {{payDesc}}
          </div>
      </div>
    </div>
    <!-- 购物车列表 -->
    <div class="shopcart-list" v-show="shopListShow">
      <div class="list-header">
        <h1 class="title">购物车</h1>
        <span class="empty" @click="emptyHandle">清空</span>
      </div>
      <div class="list-content" ref="listContent">
          <ul>
            <li class="food" v-for="(food, index) in selectedFoods" :key="index">
              <span class="name">{{food.name}}</span>
              <div class="price">
                ￥<span class="priceNum">{{food.price*food.count}}</span>
              </div>
              <div class="cartcontrol-wrapper"><cartcontrol :food="food"></cartcontrol></div>
            </li>
          </ul>
      </div>
    </div>
    <!-- 背景 -->
    <transition >
      <div class="list-mark"  v-show="shopListShow" @click="markListHeadle"></div>
    </transition>
    <!-- 小球 -->
       <!--小球动画-->
    <div class="ball-container">
      <!-- transition-group -->
      <transition-group name="drop"
                        v-on:before-enter="beforeEnter"
                        v-on:enter="enter"
                        v-on:after-enter="afterEnter" >
        <div class="ball" v-for="ball in balls" v-show="ball.show" :key="ball.id">
          <div class="inner inner-hook"></div>
        </div>
      </transition-group>
    </div>

  </div>
</template>
<script>
import BScroll from 'better-scroll'
import cartcontrol from '../cartcontrol/cartcontrol'
export default {
  data() {
    return {
      fold: true,
      balls:[
         {
            id: 0,
            show: false
          },
          {
            id: 1,
            show: false
          },
          {
            id: 2,
            show: false
          },
          {
            id: 3,
            show: false
          },
          {
            id: 4,
            show: false
          }
      ],
      dropBalls: []
    }
  },
  props: {
    selectedFoods: {
      type: Array,
      default() {
        return [
          {
            count: 0,
            price: 10
          }
        ]
      }
    },
    deliveryPrice: {
      type: Number,
      default: 0
    },
    minPrice: {
      type: Number,
      default: 20
    }
  },
  computed: {
    totalCount() {
      // console.log('这是传递的数据－－',this.selectedFoods)
      let total = 0
      this.selectedFoods.forEach((item) => {
        total += item.count
      })
      return total
    },
    // eslint-disable-next-line vue/return-in-computed-property
    totalPrice() {
      // eslint-disable-next-line no-unused-vars
      let total = 0
      this.selectedFoods.forEach((item) => {
        total += item.count * item.price
      })
      return total
    },
    // 结算按钮样式显示，根据计算结果调用不同的样式
    payClass() {
      if (this.totalPrice >= this.minPrice) {
        return 'enough'
      } else {
        return 'not-enough'
      }
    },
    // 结算按钮内容显示计算，根据返回值显示不同
    payDesc() {
      // console.log(this.totalPrice)
      if (this.totalPrice === 0) {
        return `￥${this.minPrice}元起送`
      } else if (this.totalPrice < this.minPrice) {
        let diff = this.minPrice - this.totalPrice
        return `￥还差${diff}元起送`
      } else {
        return '去结算'
      }
    },
    shopListShow() {
      /*
        这里十分有趣，if条件如果符合则走if模块里的代码，然后走下边的代码
        如果不符合，则直接走下边的代码，无论哪种情况都会执行下边的代码
        这里真正使用的是返回值
      */
      if (!this.totalCount) {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.fold = true
        return false
      }
      let show = !this.fold
      if (show) {
        // 如果购物列表展示
        // 初始化滚动条
        if (!this.scroll) {
          // nextTick指的是修改数据之后，获取更新之后的DOM
          this.$nextTick(() => {
            // eslint-disable-next-line vue/no-side-effects-in-computed-properties
            this.scroll = new BScroll(this.$refs.listContent, {
              click: true
            })
          })
        } else {
          // 这里也是需要使用nextTick重新计算DOM
          this.$nextTick(() => {
            this.scroll.refresh()
          })
        }
      }
      return show
    }

  },
  methods: {
    showShopListHandle() {
      if (!this.totalCount) {
        return
      }
      this.fold = !this.fold
    },
    markListHeadle() {
      this.fold = true
    },
    emptyHandle() {
      this.selectedFoods.forEach(item => {
        item.count = 0
      })
    },
    drop (el) {
      /*
      这里的逻辑值得细细思考,如何思考
      找一个未运动的小球的对象
      把当前触发的添加商品的DOM（也就是cartcontrol）挂载到这个对象上
      把这个小球的状态置为运动
      把当前存放运动小球信息的对象放到一个数组中，也就是一个运动队列
      * */

      for (let i = 0; i < this.balls.length; i++) {
        let ballItem = this.balls[i] // ball 是一个对象
        if (!ballItem.show) {
          ballItem.show = true // 找到要运动的小球，也就是对应一个小球的DOM进行运动
          ballItem.el = el // 这里的el是指对应添加商品的cartctrol组件,在运动的时候用于计算小球的开始位置
          this.dropBalls.push(ballItem)
          // console.log(this.dropBalls)
          return true
        }
      }
    },
    beforeEnter (el) {
      console.log('transition---', el)
      // el指的是当前触发的运动小球的DOM元素
      // 定位哪个是要运动的小球，根据ballss数组中元素对象show对应的值进行查找
      // 遍历－> if() 根据元素对象的show属性
      let count = this.balls.length
      // 遍历每一个balls数组，判断其是否要运动
      while (count--) {
        // 遍历获取每一个
        let ball = this.balls[count]
        // ball.show如果为真，说明小球开始运动了
        if (ball.show) {

          let rect = ball.el.getBoundingClientRect()

          let x = rect.left - 32
          // y轴相对于底部，rect.top指的是DOM元素距离窗口顶部的距离
          let y = -(window.innerHeight - rect.top - 22)

          // console.log(rect, x, y)

          // el.style.display = ''
          el.style.webkitTransform = `translate3d(0,${y}px,0)`
          el.style.transform = `translate3d(0,${y}px,0)`
          let inner = el.getElementsByClassName('inner-hook')[0]
          inner.style.webkitTransform = `translate3d(${x}px,0,0)`
          inner.style.transform = `translate3d(${x}px,0,0)`
        }
      }
    },
    //
    enter (el) {
      /* eslint-disable no-unused-vars */
      let rf = el.offsetHeight
      // console.log('不知道这是啥－－－', rf)
      this.$nextTick(() => {
        el.style.webkitTransform = 'translate3d(0,0,0)'
        el.style.transform = 'translate3d(0,0,0)'
        let inner = el.getElementsByClassName('inner-hook')[0]
        inner.style.webkitTransform = 'translate3d(0,0,0)'
        inner.style.transform = 'translate3d(0,0,0)'
      })
    },
    //
    afterEnter (el) {
      let ball = this.dropBalls.shift()
      if (ball) {
        ball.show = false
        //el.style.display = 'none'
      }
    }
  },
  mounted() {
    // console.log('传递的数据--',this.selectedFoods)
  },
  components: {
    cartcontrol
  }
}
</script>
<style lang="stylus" scoped>
@import '../../common/styles/mixin.styl'
.shopcart
  position fixed
  width 100%
  bottom 0
  z-index 10
  height 46px
  .content
    display flex
    width 100%
    height 46px
    background #141d27
    .content-left
      flex 1
      position relative
      display flex
      .logo-wrapper
        width 58px
        height 58px
        position relative
        margin 0 12px
        top -10px
        background #141d27
        border-radius 50%
        padding 6px
        .logo
          width 44px
          height 44px
          background #2b343c
          border-radius 50%
          text-align center
          &.heightlight
            background #00a0dc
          .icon-shopping_cart
            color #80858a
            font-size 24px
            line-height 44px
            &.heightlight
              color #fff
        .num
          width 24px
          height 16px
          background #f01414
          color #ffffff
          font-size 9px
          text-align center
          line-height 16px
          font-weight 700
          position absolute
          top 0
          right 0
          border-radius 16px
          box-shadow 0 4px 8px 0 rgba(0,0,0,0.4)
      .price
        margin 12px 0
        padding-right 12px
        line-height 24px
        border-right 1px solid rgba(255,255,255,0.1)
        font-size 16px
        color rgba(255,255,255,0.4)
        font-weight 700
        &.heightlight
          color #fff
      .desc
        margin 12px 0 12px 12px
        font-size 12px
        color rgba(255,255,255,0.4)
        line-height 24px
    .content-right
      width 105px
      flex 0 0 105px
      text-align center
      .pay
        width 100%
        height 48px
        line-height 48px
        font-size 12px
        font-weight 700
      .not-enough
        color #979a9c
        background #2b333b
      .enough
        color #fff
        background #00b43c
  .shopcart-list
    position absolute
    top 0
    left 0
    z-index -1
    width 100%
    background #fff
    transform: translate3d(0, -100%, 0)
    .list-header
      width 100%
      height 40px
      border-1px(rgba(7,17,27,0.1))
      padding 0 12px
      display flex
      justify-content space-between
      background #f3f5f7
      .title
        line-height 40px
        font-size 14px
        font-weight 200
        color rgb(7,17,27)
      .empty
        line-height 40px
        font-size 12px
        color rgb(0,160,220)
    .list-content
      padding 0 12px
      max-height 217px
      overflow hidden
      background #fff
      .food
        position relative
        width 100%
        height 48px
        padding-right 70px
        border-1px(rgba(7,17,27,0.1))
        display flex
        justify-content space-between
        .name
          display inline-block
          line-height 48px
          font-size 14px
          color rgb(7,17,27)
      .price
        line-height 48px
        font-size: 10px
        color: rgb(240,20,20)
        .priceNum
          font-size: 14px
          font-weight: 700
      .cartcontrol-wrapper
        position absolute
        right 0
        top 5px
        height 100%
        line-height 48px
        font-size 12px
  .list-mark
    position fixed
    top 0
    left 0
    z-index -2
    width 100%
    height 100%
    backdrop-filter: blur(10px) // 背景滤镜模糊
    background: rgba(7,17,27,0.6)
  .ball-container
    .ball
      position: fixed
      left: 32px
      bottom: 22px
      z-index: 200
      &.drop-enter-active
        opacity: 1
        transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41)
      .inner
        width: 16px
        height: 16px
        border-radius: 50%
        background: rgb(0, 160, 220)
        transition: all 0.4s linear
</style>

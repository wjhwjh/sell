<template>
    <div>
      <div class="goods">
        <div class="menu-wrapper" ref="menuGoods">
          <ul class="menu-list">
            <li class="item" v-for="(item, index) in goods" :key="index" @click="menuHandle(index)" :class="{'current': index==currentIndex}"><span class="text"><span v-if="item.type>=0" class="icon" :class="mapStyle[item.type]"></span>{{item.name}}</span></li>
          </ul>
        </div>
        <div class="goods-wrapper" ref="contentGodds">
          <ul ref="goodsList">
            <li v-for="(item,index) in goods" :key="index" class="goods-list goods-list-hook" >
              <h2 class="title title-hook">{{item.name}}</h2>
              <ul>
                <li class="goods-item" v-for="(food, idx) in item.foods" :key="idx" @click="selectedFoodHandle(food)">
                  <div class="img">
                    <img :src="food.image" alt="">
                  </div>
                  <div class="content">
                        <h3 class="name">{{food.name}}</h3>
                        <div class="desc" v-if="food.description">{{food.description}}</div>
                        <div class="extra">
                          <span>月售{{food.sellCount}}份</span><span>好频率{{food.rating}}%</span>
                        </div>
                        <div class="price"><span class="nowPrice">￥{{food.price}}</span><span v-if="food.oldPrice" class="oldPrice">￥{{food.oldPrice}}</span></div>
                        <div class="cartcontrol-wrapper">
                          <cartcontrol :food="food" @cartAdd="cartAdd"></cartcontrol>
                        </div>
                  </div>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
      <!-- 购物车组件 -->
      <shopCart :selectedFoods='selectedFoods' ref="shopCart" @cartAdd="cartAdd"></shopCart>

      <!-- 商品详情页面 -->
      <Food :food='selectedFood' ref="foodDetail" @cartAdd="cartAdd"></Food>
    </div>
</template>
<script>
import BScroll from 'better-scroll'
import shopCart from '../shopcart/shopcart'
import cartcontrol from '../cartcontrol/cartcontrol'
import Food from '../food/food'
let ERR_NO = 0
let mapStyle = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
export default {
  data() {
    return {
      goods: [],
      mapStyle,
      selectedFood: {}, // 这是一个对象，商品详情页面使用的数据
      listHeight: [], // 存放每一个goodlist相对于父级元素顶部的距离
      scrollY: 0 // 滚动条当前的位置
    }
  },
  computed: {
    // 购物车使用的数据,返回的是一个数组
    selectedFoods() {
      let foods = []
      this.goods.forEach(good => {
        good.foods.forEach(food => {
          if (food.count) {
            foods.push(food)
          }
        })
      })
      return foods
    },
    // 返回当前索引值
    currentIndex() {
      // console.log(this.listHeight)
      let len = this.listHeight.length - 1
      // console.log(len)
      for (let i = 0; i < len; i++) {
        let height1 = this.listHeight[i]
        let height2 = this.listHeight[ i + 1 ]
        if (!!height2 && this.scrollY >= height1 && this.scrollY < height2) {
          return i
        }
      }
      return 0
    }
  },
  created () {
    // console.log(this.$Axios)
    this.$Axios.get('/goods')
      .then(res => {
        if (ERR_NO === res.data.errno) {
          this.goods = res.data.data
          // console.log('这是数据---', this.goods)
          // nextTick是vue内置方法，指修改数据之后，获取到更新之后的DOM
          this.$nextTick(() => {
            this._inintScroll()
            this._calculateHeight()
          })
          // console.log('这是商品页面的数据--', this.goods)
        }
      })
  },
  mounted() {
    // console.log('父组件mounted事件')
    // console.log('获取元素---', this.$refs.menuGoods)
  },
  // vue里methods属性只是用来存放方法的，这些方法可以用在任何生命周期的钩子函数里
  methods: {
    _inintScroll() {
      this.menuScroll = new BScroll(this.$refs.menuGoods, {
        click: true
      })
      this.goodScroll = new BScroll(this.$refs.contentGodds, {
        click: true,
        probeType: 3
      })
      // 获取滚动条滚动的位置
      this.goodScroll.on('scroll', (pos) => {
        this.scrollY = Math.abs(Math.floor(pos.y))
        console.log('这个参数是什么--', this.scrollY)
      })
    },
    // 获取每个goodList距离滚动条到顶部的距离，存放到数组中
    // 定义的是vue实例内部调用，在数据渲染到页DOM后，对DOM进行操作
    _calculateHeight() {
      let foodList = this.$refs.contentGodds.getElementsByClassName('goods-list-hook')
      let height = 0
      this.listHeight.push(height)
      for (let i = 0; i < foodList.length; i++) {
        height += foodList[i].clientHeight
        this.listHeight.push(height)
      }
    },
    // 父组件访问子组件的方法，如何访问子组件的方法
    _drop(targetEle) {
      this.$refs.shopCart.drop(targetEle)
    },
    // cartAdd()方法是 cartcontrol传递过来的，然后要把对应的DOM传递到shopcart
    cartAdd(targetEle) {
      this._drop(targetEle)
    },
    menuHandle(index) {
      // console.log('点击商品--', index)
      let foodList = this.$refs.contentGodds.getElementsByClassName('goods-list-hook')
      // 获取与点击索引值相同的商品模块
      let el = foodList[index]

      // 直接使用，跳转到对应的DOM模块，简直太方便了
      this.goodScroll.scrollToElement(el, 300)
    },
    selectedFoodHandle(food) {
      // console.log(food)
      this.selectedFood = food
      // 这种形式执行子组件的方法
      this.$refs.foodDetail.show()
    }
  },
  components: {
    shopCart,
    cartcontrol,
    Food
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import '../../common/styles/index.styl'
 .goods
    display flex
    position absolute
    width 100%
    bottom 46px
    top 169px
    overflow hidden
    .menu-wrapper
      width 80px
      flex 0 0 80px
      height 100%
      background #f3f5f7
      .menu-list
        background #f3f5f7
        .item
          width 100%
          height 54px
          display table
          padding 0 12px
          color rgb(7, 17,27)
          &.current
            background #fff
            font-weight bold
          &:last-child
            .text
              border-none()
          .text
            font-size 12px
            line-height 14px
            vertical-align middle
            display table-cell
            border-1px(rgba(7,17,27,0.1))
            .icon
              width 12px
              height 12px
              display inline-block
              vertical-align bottom
              margin-right 4px
              &.decrease {
                bg-image('decrease_3');
              }

              &.discount {
                bg-image('discount_3');
              }

              &.guarantee {
                bg-image('guarantee_3');
              }

              &.invoice {
                bg-image('invoice_3');
              }

              &.special {
                bg-image('special_3');
              }
    .goods-wrapper
      flex 1
      .goods-list
        background #fff
        .title
          line-height 26px
          font-size 12px
          color rgb(147,153,159)
          background #f3f5f7
          border-left 2px solid #d9dde1
          padding-left 18px
        &>ul
          padding 0 18px
          .goods-item
            display flex
            padding 18px 0
            border-1px(rgba(7,17,27,0.1))
            &:last-child
              border-none()
            .img
              width 57px
              height 57px
              flex 0 0 57px
              &>img
                width 100%
            .content
              padding-left 10px
              position relative
              flex 1
              .cartcontrol-wrapper
                position absolute
                bottom 0
                right 0
              .name
                font-size 14px
                color rgb(7,17,27)
                line-height 14px
              .desc
                line-height: 1.4;
                font-size 10px
                color rgb(147,153,159)
                margin 8px 0
              .extra
                font-size 10px
                color rgb(147,153,159)
                line-height 10px
                margin-top 8px
              .price
                font-size 10px
                color rgb(147,153,159)
                line-height 24px
                font-weight 700
                .nowPrice
                  color #eb4242
                  margin-right 8px
                .oldPrice
                  text-decoration line-through
</style>

<template>
  <div class="header-wrapper">
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
          <span class="title-name">{{sellers.name}}</span>
        </div>
        <!-- 描述部分 配送方式-->
        <div class="description">{{sellers.description}} / {{sellers.deliveryTime}}</div>
        <!-- 支持折扣的方式 -->
        <div v-if="sellers.supports" class="support">
          <span class="icon decrease"></span>
          <span class="text">{{sellers.supports[0].description}}</span>
        </div>
      </div>
      <!-- 支持优惠的个数 -->
      <div class="support-count" @click="detailShowHandle">
        <span class="count">5 个</span>
        <span class="icon-keyboard_arrow_right"></span>
      </div>
    </div>
    <!-- 警告 -->
    <div class="bulletin-wrapper" @click="detailShowHandle">
      <span class="bulletin"></span>
      <span class="bulletin-text">{{sellers.bulletin}}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>

    <!-- 背景 -->
    <div class="background">
      <img :src="sellers.avatar" alt />
    </div>

    <!-- 展示详情 -->
    <transition name="detail-fade">
      <div class="detail" v-show="detailShow">
        <div class="detail-wrapper">
          <div class="detail-main">
            <div class="name">{{sellers.name}}</div>
            <div class="star-wrapper">
              <star :size ="48" :score="sellers.score"></star>
            </div>
            <div class="title">
              <span class="line"></span>
              <span class="text">信息优惠</span>
              <span class="line"></span>
            </div>
            <ul class="support" v-if="sellers.supports">
              <li v-for="(item, index) in sellers.supports" :key="index">
                <span class="icon" :class="mapStyle[sellers.supports[index].type]"></span><span class="text">{{item.description}}</span>
              </li>
            </ul>
            <div class="title">
              <span class="line"></span>
              <span class="text">商家公告</span>
              <span class="line"></span>
            </div>
            <div class="bulletin">{{sellers.bulletin}}</div>
          </div>
        </div>
        <div class="detail-close" @click="hideDetail">
          <i class="icon-close"></i>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import star from 'components/star/star'

let mapStyle = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
export default {
  data() {
    return {
      mapStyle,
      detailShow: false
    }
  },
  props: {
    sellers: {
      type: Object
    }
  },
  methods: {
    hideDetail() {
      this.detailShow = false
    },
    detailShowHandle() {
      this.detailShow = true
    }
  },
  mounted() {},
  components: {
    star
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import '../../common/styles/index.styl';

.header-wrapper {
  position: relative;
  background: rgba(7, 17, 27, 0.5);
  overflow: hidden;

  .content-wrapper {
    // background: #333333
    padding: 24px 12px 13px 24px;
    color: #fff;
    display: flex;
    position: relative;

    .avatar {
      width: 64px;
      height: 64px;
      flex: 0 0 64px;

      &>img {
        width: 100%;
        display: block;
        border-radius: 4px;
      }
    }

    .content {
      padding: 2px 0 0 16px;
      color: #ffffff;
      position: relative;

      .title {
        .brand {
          width: 30px;
          height: 18px;
          display: inline-block;
          bg-image('brand');
        }

        .title-name {
          vertical-align: top;
          line-height: 18px;
          font-weight: bold;
          font-size: 16px;
        }
      }

      .description {
        font-size: 12px;
        color: #ffffff;
        line-height: 12px;
        font-weight: 200;
        padding: 8px 0 10px;
      }

      .support {
        font-size: 10px;
        color: #ffffff;

        .icon {
          width: 12px;
          height: 12px;
          display: inline-block;

          &.decrease {
            bg-image('decrease_1');
          }

          &.discount {
            bg-image('discount_1');
          }

          &.guarantee {
            bg-image('guarantee_1');
          }

          &.invoice {
            bg-image('invoice_1');
          }

          &.special {
            bg-image('special_1');
          }
        }

        .text {
          line-height: 12px;
          vertical-align: top;
        }
      }
    }

    .support-count {
      position: absolute;
      height: 24px;
      padding: 0 8px;
      right: 24px;
      bottom: 15px;
      background: rgba(0, 0, 0, 0.2);
      border-radius: 14px;

      .count {
        color: #fff;
        font-size: 10px;
      }

      .icon-keyboard_arrow_right {
        line-height: 24px;
        font-size: 10px;
      }
    }
  }

  .bulletin-wrapper {
    height: 28px;
    line-height: 28px;
    padding: 0 12px;
    background: rgba(7, 17, 27 0.2);
    display: flex;
    align-items: center;
    position: relative;

    .bulletin {
      display: inline-block;
      width: 22px;
      height: 12px;
      flex: 0 0 22px;
      bg-image('bulletin');
    }

    .bulletin-text {
      font-size: 10px;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      line-height: 28px;
      padding-left: 4px;
      padding-right: 4px;
      color: #fff;
    }

    &>i {
      font-size: 16px;
      color: #fff;
      position: absolute;
      display: inline-block;
      right: 0;
      padding: 4px;
    }
  }

  .background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    filter: blur(10px);
    z-index: -1;

    &>img {
      width: 100%;
      height: 100%;
    }
  }

  .detail {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(7, 17, 27, 0.8);
    z-index: 20;
    overflow-y: auto;
    &.detail-fade-enter,&.detail-fade-leave-to{
      opacity 0
    }
    &.detail-fade-enter-active,&.detail-fade-leave-active{
      transition 0.3s
    }
    &.detail-fade-enter-to,&.detail-fade-leave{
      opacity 1
    }
    .detail-wrapper {
      min-height: 100%;
      padding-bottom: 64px;

      .detail-main {
        padding: 64px 36px 0;
        color: #fff;

        .name {
          font-size: 16px;
          font-weight: bold;
          color: #ffffff;
          text-align: center;
          line-height: 16px;
        }

        .star-wrapper {
          margin-top: 16px;
          height: 50px;
          text-align center
        }

        .title {
          line-height: 28px;
          display: flex;
          margin: 28px 0 24px;

          .text {
            font-weight: bold;
            font-size: 14px;
            padding: 0 12px;
          }

          .line {
            flex: 1;
            border-top: 1px solid rgba(255, 255, 255, 0.2);
          }
        }

        .support {
          padding: 0 12px;

          &>li {
            font-size: 12px;
            line-height: 12px;
            font-weight: 200;
            margin-bottom: 12px;

            .icon {
              display: inline-block;
              width: 16px;
              height: 16px;

              &.decrease {
                bg-image('decrease_2');
              }

              &.discount {
                bg-image('discount_2');
              }

              &.guarantee {
                bg-image('guarantee_2');
              }

              &.invoice {
                bg-image('invoice_2');
              }

              &.special {
                bg-image('special_2');
              }
            }

            .text {
              line-height: 16px;
              display: inline-block;
              vertical-align top
              padding-left 6px
            }
          }
        }

        .bulletin {
          line-height: 1.6;
          font-size: 12px;
          padding 0 12px
          line-height 2
          font-weight 200
          text-align justify
        }
      }
    }
    .detail-close {
        text-align: center;
        margin-top: -64px;

        &>i {
          width: 32px;
          height: 32px;
          font-size: 32px;
          color: rgba(255, 255, 255, 0.5);
          display: inline;
        }
      }
  }
}
</style>

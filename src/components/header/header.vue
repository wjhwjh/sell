<template>
  <div class="header">
    <!-- 内容部分 -->
    <div class="content-wrapper">
      <div class="avatar">
        <img :src="sellers.avatar" alt />
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span>{{sellers.name}}</span>
        </div>
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
    return {};
  },
  props: {
    sellers: {
      type: Object
    }
  },
  mounted() {
    console.log("父级商家数据--", this.sellers);
  }
};
</script>
<style lang="stylus" scoped>
.header {
  position: relative;

  .content-wrapper {
    background: #333333;
    padding: 24px 24px 13px 24px;
    color: #fff;
    display: flex;

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
  }
}
</style>

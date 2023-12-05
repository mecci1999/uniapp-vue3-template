<template>
  <view class="app-user">
    <u-navbar
      bgColor="#ef3741"
      title="我的"
      titleStyle="color: #ffffff"
      placeholder
      left-icon="arrow-left"
      leftIconColor="#ffffff"
    />
    <!-- 背景 -->
    <view class="app-user__mask"></view>
    <!-- 主体 -->
    <view class="app-user__container">
      <!-- 头部 -->
      <view class="app-user__header">
        <view class="app-user__header-avatar">
          <up-avatar :src="user.avatar" size="60" shape="circle"></up-avatar>
        </view>
        <view class="app-user__header-name">
          <up-text :text="user.name || '未登录'" :color="'#FFFFFF'" size="18" @click="handleLogin"> </up-text>
        </view>
      </view>
      <!-- 优惠券 -->
      <view class="app-user__card" @click="handleJumpCoupons">
        <view class="app-user__card-item">
          <view class="app-user__card-item-title">优惠券</view>
          <view class="app-user__card-item-num">{{ count }}</view>
          <image class="app-user__card-item-icon" src="@/static/icon/user/right_icon.svg" />
        </view>
      </view>
      <!-- 全部订单 -->
      <view class="app-user__orders">
        <view class="app-user__orders-container">
          <view class="app-user__orders-header">
            <view class="app-user__orders-header-name">我的订单</view>
            <view class="app-user__orders-header-text">全部订单</view>
            <image class="app-user__card-item-icon" src="@/static/icon/user/order.svg" />
          </view>
          <view class="app-user__orders-body">
            <view class="app-user__orders-item" v-for="item in orderList">
              <view :class="['app-user__orders-item-icon', item.type]"></view>
              <view class="app-user__orders-item-text">{{ item.title }}</view>
              <view v-if="item.count > 0" class="app-user__orders-item-num">{{ item.count }}</view>
            </view>
          </view>
        </view>
      </view>
      <!-- 设置 -->
      <view class="app-user__settings">
        <view class="app-user__settings-container">
          <view class="app-user__settings-item" v-for="item in menuList">
            <view class="app-user__settings-item-text">{{ item.title }}</view>
            <image class="app-user__card-item-icon" src="@/static/icon/user/right_icon.svg" />
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
// import useUserStore from '@/store/modules/user';

const user = reactive({
  name: '',
  avatar: ''
});

const count = ref(0);

const orderList = ref([
  {
    type: 'collection',
    icon: '@/static/icon/user/collection.svg',
    title: '待付款',
    count: 1
  },
  {
    type: 'shipments',
    icon: '@/static/icon/user/shipments.svg',
    title: '待发货',
    count: 0
  },
  {
    type: 'receipt',
    icon: '@/static/icon/user/receipt.svg',
    title: '待收货',
    count: 0
  },
  {
    type: 'after',
    icon: '@/static/icon/user/after.svg',
    title: '退换/售后',
    count: 0
  }
]);

const menuList = ref([
  {
    type: 'address',
    title: '收获地址'
  },
  {
    type: 'help',
    title: '帮助与客服'
  },
  {
    type: 'feedback',
    title: '意见反馈'
  },
  {
    type: 'cache',
    title: '清除缓存'
  }
]);

/**
 * 处理微信登录
 */
const handleLogin = async () => {
  // 微信授权登录
  // await useUserStore().authLogin();
  // 授权获取用户信息
  uni.getUserProfile({
    desc: '获取您的微信头像和姓名',
    provider: 'weixin',
    success: (info: any) => {
      console.log(info);
    },
    fail: (error) => {
      console.error(error);
    }
  });
};

/**
 * 跳转至优惠券页面
 */
const handleJumpCoupons = () => {};
</script>

<style lang="scss">
@import './index';
</style>

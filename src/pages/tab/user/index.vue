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
      <view class="app-user__card">
        <view class="app-user__card-item">
          <view class="app-user__card-item-title">优惠券</view>
          <view class="app-user__card-item-num">{{ count }}</view>
          <image class="app-user__card-item-icon" src="@/static/icon/user/right_icon.svg" />
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
</script>

<style lang="scss">
@import './index';
</style>

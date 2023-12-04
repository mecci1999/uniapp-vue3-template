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
    <!-- 头部 -->
    <view class="app-user__header">
      <view class="app-user__header-avatar">
        <up-avatar :src="user.avatar" size="60" shape="circle"></up-avatar>
      </view>
      <view class="app-user__header-name">
        <up-text :text="user.name || '未登录'" :color="'#FFFFFF'" size="18" @click="handleLogin"> </up-text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
const user = reactive({
  name: '',
  avatar: ''
});

/**
 * 处理微信登录
 */
const handleLogin = () => {
  // 微信授权登录
  uni.login({
    provider: 'weixin', //使用微信登录
    success: function (loginRes) {
      console.log(loginRes.authResult);
    }
  });
};
</script>

<style lang="scss">
@import './index';
</style>

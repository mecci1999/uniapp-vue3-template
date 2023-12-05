import { defineStore } from 'pinia';
import type { UserState, providerType } from './types';
import { getUserProfile, loginByCode, login as userLogin, logout as userLogout } from '@/api/user/index';
import { clearToken, setToken } from '@/utils/auth';
import type { LoginParams } from '@/api/user/types';

const useUserStore = defineStore('user', {
  state: (): UserState => ({
    user_id: '',
    user_name: '',
    avatar: '',
    token: ''
  }),
  getters: {
    userInfo(state: UserState): UserState {
      return { ...state };
    }
  },
  actions: {
    // 设置用户的信息
    setInfo(partial: Partial<UserState>) {
      this.$patch(partial);
    },
    // 重置用户信息
    resetInfo() {
      this.$reset();
    },
    // 获取用户信息
    async info() {
      const result = await getUserProfile();
      this.setInfo(result);
    },
    // 异步登录并存储token
    login(loginForm: LoginParams) {
      return new Promise(async (resolve, reject) => {
        try {
          const result = await userLogin(loginForm);
          const token = result?.token;
          if (token) {
            setToken(token);
          }
          resolve(result);
        } catch (error) {
          reject(error);
        }
      });
    },
    // Logout
    async logout() {
      await userLogout();
      this.resetInfo();
      clearToken();
    },
    // 小程序授权登录
    authLogin(provider: providerType = 'weixin') {
      return new Promise((resolve, reject) => {
        uni.login({
          provider,
          success: async (result: UniApp.LoginRes) => {
            console.log(result);

            if (result.code) {
              // 将获取到的code发送给服务端，服务端将拿到的openId和session_token存储起来，并定义一个自定义登录态返回给小程序端
              const res = await loginByCode({ code: result.code });
              // 将拿到的登录态存储在小程序端，用户可以通过该登录态去调用服务端接口获取其他数据

              resolve(res);
            } else {
              reject(new Error(result.errMsg));
            }
          },
          fail: (err: any) => {
            console.error(`login error: ${err}`);
            reject(err);
          }
        });
      });
    }
  }
});

export default useUserStore;

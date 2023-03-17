<template>
  <div class="login-wrap">
    <div class="bind">
      <van-cell-group>
        <van-field v-model="state.loginForm.username" required clearable label="用户名" placeholder="请输入用户名" />
        <van-field
          v-model="state.loginForm.password"
          :type="state.isEye ? 'text' : 'password'"
          label="密码"
          placeholder="请输入密码"
          :right-icon="state.isEye ? 'eye-o' : 'closed-eye'"
          @click-right-icon="state.isEye = !state.isEye"
          clearable
          required
        />
      </van-cell-group>
      <van-button
        type="primary"
        round
        size="normal"
        :disabled="state.isDisabled"
        :loading="state.isDisabled"
        loading-text="登录中..."
        class="lr-btn login-btn"
        @click="goLogin"
        >登录</van-button
      >
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useUserStore } from '@/store/modules/user'
import router from '@/router'
import { showToast } from 'vant'
/** 状态 */
const state = reactive({
  loginForm: {
    username: '',
    password: ''
  },
  isEye: false, // 是否显示密码
  isDisabled: false // 按钮是否可点击状态
})
/** 登录 */
const goLogin = () => {
  if (state.isDisabled) {
    return
  }
  if (!state.loginForm.username) {
    showToast('用户名不能为空')
    return
  }
  if (!state.loginForm.password) {
    showToast('密码不能为空')
    return
  }
  state.isDisabled = true

  state.isDisabled = true
  useUserStore()
    .login({
      username: state.loginForm.username,
      password: state.loginForm.password
    })
    .then(res => {
      console.log(res)
      showToast({
        type: 'success',
        duration: 500,
        message: '登录成功',
        onClose() {
          console.log('onClose')
          useUserStore()
            .getInfo()
            .then(userInfo => {
              console.log('userInfo:', userInfo)
              router.push('/goods')
            })
        }
      })
    })
    .catch(() => {
      state.loginForm.password = ''
    })
    .finally(() => {
      state.isDisabled = false
    })
}
</script>
<style lang="less">
.login-wrap {
  .van-icon-eye-o {
    color: #14a9fb;
  }
}
</style>
<!--scoped  意思：样式只在当前组件生效-->
<style lang="less" scoped>
.login-wrap {
  min-height: 100vh;
  background: #f1f2f5;
  .bind {
    padding-top: 40px;
  }
  .login-btn {
    width: calc(100% - 30px);
    margin: 85px 0 0 15px;
  }
}
</style>

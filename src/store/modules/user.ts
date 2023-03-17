import { ref } from 'vue'
import store from '@/store'
import { defineStore } from 'pinia'
import { login as loginApi, getUserInfo } from '@/api/login'

export const useUserStore = defineStore('user', () => {
  const token = ref(localStorage.getItem('token') || '')
  const userData = ref({} as any)

  /** 登录 */
  const login = async (loginData: any) => {
    return await new Promise((resolve, reject) => {
      loginApi({
        username: loginData.username,
        password: loginData.password
      })
        .then((res: any) => {
          const { content } = res
          localStorage.setItem('token', 'Bearer ' + content)
          token.value = content
          resolve(true)
        })
        .catch(error => {
          reject(error)
        })
    })
  }
  /** 获取用户详情 */
  const getInfo = async () => {
    return await new Promise((resolve, reject) => {
      getUserInfo()
        .then((res: any) => {
          const { user } = res
          userData.value = user
          resolve(res)
        })
        .catch(error => {
          reject(error)
        })
    })
  }
  /** 登出 */
  const logout = () => {
    localStorage.removeItem('token')
    token.value = ''
    userData.value = []
  }
  /** 重置 Token */
  const resetToken = () => {
    localStorage.removeItem('token')
    token.value = ''
    userData.value = []
  }

  return { token, userData, login, getInfo, logout, resetToken }
})

/** 在 setup 外使用 */
export function useUserStoreHook() {
  return useUserStore(store)
}

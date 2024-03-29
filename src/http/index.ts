import axios, { type AxiosInstance, type AxiosError, type AxiosRequestConfig, type InternalAxiosRequestConfig, type AxiosResponse } from 'axios'
import { useUserStore } from '@/store/modules/user'
import { showNotify } from 'vant'
// 数据返回的接口
// 定义请求响应参数，不含data
interface Result {
  code: number
  msg: string
}

// 请求响应参数，包含data
interface ResultData<T = any> extends Result {
  data?: T
}
const URL = '/api/shcc-api'
enum RequestEnums {
  TIMEOUT = 20000,
  OVERDUE = 600, // 登录失效
  FAIL = 999, // 请求失败
  SUCCESS = 200 // 请求成功
}
const config = {
  // 默认地址
  baseURL: URL,
  // 设置超时时间
  timeout: RequestEnums.TIMEOUT as number,
  // 跨域时候允许携带凭证
  withCredentials: true
}

class RequestHttp {
  // 定义成员变量并指定类型
  service: AxiosInstance
  public constructor(config: AxiosRequestConfig) {
    // 实例化axios
    this.service = axios.create(config)
    /**
     * 请求拦截器
     * 客户端发送请求 -> [请求拦截器] -> 服务器
     * token校验(JWT) : 接受服务器返回的token,存储到vuex/pinia/本地储存当中
     */

    this.service.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem('token') || ''
        config.headers.set('Authorization', token)
        return config
      },
      (error: AxiosError) => {
        // 请求报错
        Promise.reject(error)
      }
    )
    /**
     * 响应拦截器
     * 服务器换返回信息 -> [拦截统一处理] -> 客户端JS获取到信息
     */

    this.service.interceptors.response.use(
      (response: AxiosResponse) => {
        const { data } = response // 解构
        if (data.code === RequestEnums.OVERDUE) {
          // 登录信息失效，应跳转到登录页面，并清空本地的token
          localStorage.setItem('token', '') // router.replace({ // path: '/login' // })
          return Promise.reject(data)
        } // 全局错误信息拦截（防止下载文件得时候返回数据流，没有code，直接报错）
        if (data.code && data.code !== RequestEnums.SUCCESS) {
          showNotify({ type: 'danger', message: data }) // 此处也可以使用组件提示报错信息
          return Promise.reject(data)
        }
        return data
      },
      (error: AxiosError) => {
        const { response } = error
        if (response) {
          this.handleCode(response)
        }
        if (!window.navigator.onLine) {
          // 可以跳转到错误页面，也可以不做操作 // return router.replace({ // path: '/404' // });
          showNotify({ type: 'danger', message: '网络连接失败' })
        }
      }
    )
  }

  handleCode(response: any): void {
    console.log(response)
    let { data } = response
    if (typeof data === 'string' && data.length > 0) {
      data = JSON.parse(data)
    }
    if (data && typeof data === 'object' && data.errors && data.errors.length) {
      const _errors = data.errors
      if (_errors[0].code && _errors[0].code === 'auth.authentication_invalid_token') {
        showNotify({
          message: '登录已失效',
          duration: 500,
          background: '#ff4444',
          onClose() {
            // 退出操作
            useUserStore().logout()
            console.log('登录已失效')
          }
        })
      } else {
        showNotify({
          message: _errors[0].message || '接口请求错误',
          duration: 2000,
          background: '#ff4444'
        })
      }
    }

    // switch (response) {
    //   case 401:
    //     showNotify({ type: 'danger', message: '登录失败，请重新登录' })
    //     break
    //   default:
    //     showNotify({ type: 'danger', message: '请求失败' })
    //     break
    // }
  }

  // 常用方法封装
  get<T>(url: string, params?: object): Promise<ResultData<T>> {
    return this.service.get(url, { params })
  }

  post<T>(url: string, params?: object): Promise<ResultData<T>> {
    return this.service.post(url, params)
  }

  put<T>(url: string, params?: object): Promise<ResultData<T>> {
    return this.service.put(url, params)
  }

  delete<T>(url: string, params?: object): Promise<ResultData<T>> {
    return this.service.delete(url, { params })
  }
}

// 导出一个实例对象
export default new RequestHttp(config)

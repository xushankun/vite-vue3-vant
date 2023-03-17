import request from '@/http'

/** 登录并返回 Token */
export function login(params: any) {
  return request.post('/v1/users/login', params)
}
/** 获取用户详情 */
export function getUserInfo() {
  return request.get('/v1/users/me')
}
/** 查看列表 */
export function getShccList(params: any) {
  return request.get('/v1/shcc/list', params)
}
export function getShcc(params: any) {
  return request.get('/v1/shcc/get/' + params.id, params)
}

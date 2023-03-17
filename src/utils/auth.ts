// import Cookies from 'js-cookie'

const TokenKey = 'nToken'

export function getToken(): string {
  // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
  return localStorage.getItem(TokenKey) || ''
}

export function setToken(token: string): void {
  localStorage.setItem(TokenKey, token)
}

export function removeToken(): void {
  localStorage.removeItem(TokenKey)
}

export function clearLocal() {
  localStorage.clear()
  sessionStorage.clear()
  removeToken()
}

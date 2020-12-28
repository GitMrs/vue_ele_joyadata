/**
 * 常用浏览器储存的封装
 */
import Cookies from 'js-cookie';

const TokenKey = 'vue_admin_template_token';
const sessionKey = 'Items_detail';
export function getToken() {
  return Cookies.get(TokenKey);
}

export function setToken(token) {
  return Cookies.set(TokenKey, token);
}

export function removeToken() {
  return Cookies.remove(TokenKey);
}

export function getSession(key = sessionKey) {
  return window.sessionStorage.getItem(key) || {};
}
export function setSession({ key = sessionKey, item }) {
  return window.sessionStorage.setItem(key, JSON.stringify(item));
}
export function removeSession(key = sessionKey) {
  return window.sessionStorage.removeItem(key);
}

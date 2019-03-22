import request from '@/utils/request'
import request2 from '@/utils/request2'

export function login(username, password) {
  return request2({
    // url: 'auth/login',
    url: 'api/login',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

export function getInfo() {
  return request2({
    // url: 'auth/info',
    url: 'api/info_new',
    method: 'get'
  })
}

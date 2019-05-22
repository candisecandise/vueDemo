import request from '@/utils/request'
import request2 from '@/utils/request2'

export function login(username, password) {
  return request2({
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
    url: 'api/info_new',
    method: 'get'
  })
}

// export function login(username, password) {
//   return request({
//     url: 'auth/login',
//     method: 'post',
//     data: {
//       username,
//       password
//     }
//   })
// }

// export function getInfo() {
//   return request({
//     url: 'auth/info',
//     method: 'get'
//   })
// }

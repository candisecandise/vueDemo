import request from '@/utils/request'
import request2 from '@/utils/request2'

export function initData(url, params) {
  return request({
    url: url,
    method: 'get',
    params
  })
}

export function initData2(url, params) {
  return request2({
    url: url,
    method: 'get',
    params
  })
}

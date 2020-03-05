import request from '@/utils/request'

export function getList(params) {
  return request({
    url: 'http://5c92dbfae7b1a00014078e61.mockapi.io/owners',
    method: 'get',
    params
  })
}

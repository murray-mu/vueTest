import request from '@/utils/request'

export function getCities() {
  debugger
  return request({
    url: 'http://127.0.0.1:8088/api/cities',
    method: 'get'
  })
}

export function getWeather(id) {
  return request({
    url: `http://127.0.0.1:8088/api/city/${id}`,
    method: 'get'
    // params: { id }
  })
}

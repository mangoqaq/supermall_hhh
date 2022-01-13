import {
  request,request_mogu
} from "./request";

export function getHomeMultidata() {
  return request({
    url: '/home/multidata'
  })
}


export function getHomeGoods(sort, page) {
  return request_mogu({
    url: '/search',
    method: 'get',
    params: {
      sort,
      page
    }
  })
}

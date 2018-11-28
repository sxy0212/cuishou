import request from '@/utils/request'

export function getArea(page,pageSize) {// 区域设置
  return request({
    url: '/set',
    method: 'post',
    data:{
        page:page,
        pageSize:pageSize
    }
  })
}

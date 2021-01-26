import request from '@/router/axios';
const IP = 'http://192.168.8.16:9000';
const serverName = '/zhxy-auth';

//关系转移记录列表
export const getChangeInfo = (obj) => {
  return request({
    url:  IP + serverName +'/party/getTransList',
    method: 'post',
    data:obj
  })
}
//查询非党员用户表
  export function searchFParty (query) {
    return request({
      url: IP + serverName +'/user/selectNotPartyUser',
      method: 'get',
      params:query
    })
  }

//获取党员列表
  export function getDetail (obj) {
    return request({
      url: IP + serverName +'/user/getPartyList',
      method: 'post',
      data: obj
    })
  }
  //获取字段列表
  export function getField (query) {
    return request({
      url: IP + serverName +'/property/getPropertyByType',
      method: 'get',
      params:query
    })
  }
//新增字段
export function addField (obj) {
  return request({
    url: IP + serverName +'/property/addProperty',
    method: 'post',
    data: obj
  })
}
  export function removeById (id) {
    return request({
      url: '' + id,
      method: 'delete'
    })
  }
  export function editUpdate (obj) {
    return request({
      url: '/admin/appOauthDetails',
      method: 'put',
      data: obj
    })
  }
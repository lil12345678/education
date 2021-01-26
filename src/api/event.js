import request from '@/router/axios'
const IP = 'http://192.168.8.106:9050';

//获取分类信息
export function  getSortTree (query) {
    return request({
        method: "GET",
        url: IP + "/api/eventMenu/getTree",
        params:query
    })
   
}
//获取item信息
export function getGroupList(query) {
    return request({
        method: "GET",
        url: IP + "/api/activityInfo/findPage",
        params:query
    })
}
//新建分类
export function  addTypy (obj) {
    return request({
        method: "POST",
        url: IP + "/api/eventMenu/add",
        data:obj
    })
   
}
//修改分类editSort
export function  editSort (obj) {
    return request({
        method: "POST",
        url: IP + "/api/eventMenu/update",
        data:obj
    })
   
}
//删除分类
export function deleteSort (id) {
    return request({
      url: IP + '/api/eventMenu/delete/' +id,
      method: 'DELETE',
    })
  }

  //新增item   /api/activityInfo/addv
  export function   newAddItem (obj) {
    return request({
        method: "POST",
        url: IP + "/api/activityInfo/add",
        data:obj
    })
   
}
//删除item
export function deleteItem (id) {
    return request({
      url: IP + '/api/activityInfo/delete/' +id,
      method: 'DELETE',
    })
  }
  //详情页
  export function getDetail(query) {
    return request({
        method: "GET",
        url: IP + "/api/activityInfo/findById",
        params:query,
    })
}


import request from '@/router/axios';
const IP = 'http://192.168.8.16:9000';
const serverName = '/zhxy-information';

//获取新闻list
export function getNewsList(query) {
    return request({
        method: "GET",
        url: IP + serverName +"/api/articleInfo/findPage",
        params:query
    })
}
//新闻查询接口用获取新闻list接口

//批量删除

export function deleteBatchIds (obj) {
    return request({
      url: IP + serverName +'api/articleInfo/deleteBatchIds',
      method: 'DELETE',
      data:obj
    })
  }

  //新增新闻
export function  newAddNews (obj) {
    return request({
        method: "POST",
        url: IP + serverName +"/api/articleInfo/add",
        responseType: "JSON",
        headers: {
            'Content-Type': "application/json",
        },
         data:obj
    })
   
}
//详情
export function getDetail(query) {
    return request({
        method: "GET",
        url: IP + serverName + "/api/articleInfo/findById",
        params:query,
    })
}
//修改
export function  editNews (obj) {
    return request({
        method: "POST",
        url: IP + serverName +  "/api/articleInfo/update",
        responseType: "JSON",
        headers: {
            'Content-Type': "application/json",
        },
         data:obj
    })
   
}

//新建分类
export function  addTypy (obj) {
    return request({
        method: "POST",
        url: IP + serverName +"/api/articleMenu/add",
        data:obj
    })
   
}
//获取分类树形结构
export function getSortTree(query) {
    return request({
        method: "GET",
        // url: IP + "/api/articleMenu/getTree",
        url: IP + serverName + "/api/articleMenu/getTree",
        params:query,
    })
}

//修改分类editSort
export function  editSort (obj) {
    return request({
        method: "POST",
        url: IP +serverName +  "/api/articleMenu/update",
        data:obj
    })
   
}
//删除分类
export function deleteSort (id) {
    return request({
      url: IP + serverName + '/api/articleMenu/delete/' +id,
      method: 'DELETE',
    })
  }

  //删除item
  export function deleteItem (id) {
    return request({
      url: IP + serverName + '/api/articleInfo/delete/' +id,
      method: 'delete',
    })
  }

  //上传图片
  export function  picUpload (obj) {
    return request({
        method: "POST",
        url: IP + serverName + "/api/articleInfo/uploadFile",
        data:obj
   })
   
}
export function  editArticleInfo (obj) {
    return request({
        method: "POST",
        url: IP +serverName +  "/api/articleInfo/update",
        data:obj
    })
   
}




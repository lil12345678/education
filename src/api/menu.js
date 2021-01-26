import request from '@/router/axios'
const IP = 'http://192.168.8.16:9000';
const serverName = '/zhxy-auth'

//获取当前用户菜单
export function  getMenu (query) {
    return request({
        method: "get",
        url: IP + serverName + "/menu/getUserMenuList",
        headers: {
            product_id: sessionStorage.getItem('PRODUCTID'),
          },
        parmas: query
    })
}
//获取菜单权限
export function getPermission  (query) {
    return request({
        method: "get",
        url: IP + serverName + "/menu/getMenuInfo",
        parmas: query
    })
   
}
//获取所有菜单
export function  productMenu (query) {
    return request({
        method: "GET",
        url: IP + serverName + "/menu/getProductMenu",
           headers: {
            product_id: sessionStorage.getItem('PRODUCTID'),
          },
        parmas: query
    })
   
}
//获取用户的菜单权限
export function  getUserPermission (query) {
    return request({
        method: "GET",
        url: IP + serverName + "/duty/getDutyMenu",
        parmas: query
    })
   
}
//http://localhost:9020/duty/getDutyMenu?pid=1&did=1001

//保存权限
export function  addPermission (obj) {
    return request({
        method: "POST",
        url: IP + serverName +  "/duty/addDutyMen",
         data:obj
    })
   
}
// http://localhost:9020/duty/addDutyMenu
// {"pid":1,"did":1005职位id,"items":[{"mid":9,"operationIds":"1,2"},{"mid":10,"operationIds":"2,3"}]}

import request from '@/router/axios';
const IP = 'http://192.168.8.16:9000';
const serverName = '/zhxy-event';

//详情
export function getDetail(query) {
    return request({
        method: "GET",
        url: IP + serverName + "/api/partyDuesInfo/findPage",
        params:query,
    })
}
//获取模板
export function getTemplate() {
    return request({
        method: "GET",
        url: IP + serverName + "/api/partyDuesInfo/template-down",

    })
}
//批量删除/api/partyDuesInfo/deleteBatch
export function delItem(obj) {
    return request({
        method: "DELETE",
        url: IP + serverName + "/api/partyDuesInfo/deleteBatch",
        data:obj
    })
}
//
export function  editItem (obj) {
    return request({
        method: "POST",
        url: IP + serverName +"/api/partyDuesInfo/edit",
         data:obj
    })
   
}
//导入模板
export function  leadInData (obj) {
    return request({
        method: "POST",
        url: IP + serverName +"/api/partyDuesInfo/importData",
        data:obj
    }) 
}
//导出模板
export function leadOutData(query) {
    return request({
        method: "GET",
        url: IP + serverName + "/api/partyDuesInfo/exportData",
        params:query
    })
}



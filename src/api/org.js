import request from '@/router/axios'
const IP = 'http://192.168.8.16:9000';//已全局配置
const serverName = '/zhxy-auth'

//按type获取组织单位
export function orgList(query) {
    return request({
        method: "GET",
        url: IP + serverName +"/organize/getOrgInfoByType",
        params:query,
    })
}
//新增祖先组织
export function  fatherOrg (obj) {
    return request({
        method: "POST",
        url: IP + serverName + "/organize/addNewOrganize",
        headers: {
            'Content-Type': "application/json",
        },
        data: obj
    })
//    {"organizeType":"2","organizeName":"测试组织","schoolId":1}
}

//新增组织
export function  ChildOrg (obj) {
    return request({
        method: "POST",
        url: IP + serverName +"/organize/addChildOrganize",
        headers: {
            'Content-Type': "application/json",
        },
        data: obj
    })
//    {"organizeName":"测试组织","parentId":24,"description":"这是一个测试组织"}
}

//修改组织
export function  editOrg (obj) {
    return request({
        method: "POST",
        url: IP + serverName +"/organize/updateOrganize",
        headers: {
            'Content-Type': "application/json",
        },
        data: obj
    })
//    {"oid":10,"organizeName":"测试组织2修改","description":"这是测试组织"}
}
//删除组织
export function  deleteOrg (query) {
    return request({
        method: "GET",
        url: IP + serverName +"/organize/deleteOrganize",
        params:query
    })
//oid=22
}
//根据组织id获取树
export function  getOrg (query) {
    return request({
        method: "GET",
        url: IP + serverName +"/organize/getOrgInfo",
        params:query
    })
//oid=22
}

// 查询组织下职位列表duty/getDutyList
export function getItem(query) {
    return request({
        method: "GET",
        url: IP + serverName +"/duty/getDutyList",
        params:query,
    })
}
// 删除职务
export function  delItem (query) {
    return request({
        method: "GET",
        url: IP + serverName +"/duty/deleteDuty",
        params:query
    })
    //did=1003
}

// 增加组织职位
export function  addItem (obj) {
    return request({
        method: "POST",
        url: IP + serverName +"/duty/addDuty",
        headers:{
            schoolId:1,
        },
        data:obj
    })
    //{"dutiesName":"副校长","oid":1,组织id"dutiesType":0,}
}
//修改职务
export function  editItem (obj) {
    return request({
        method: "POST",
        url: IP + serverName +"/duty/updateDuty",
        headers: {
            'Content-Type': "application/json",
        },
        data: obj
    })
//   {"dutiesName":"班主任1","did":1002}
}




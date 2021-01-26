import request from '@/router/axios'
const IP = 'http://192.168.8.16:9000';//已全局配置
const serverName = '/zhxy-auth'

export function  loginByUsername (params) {
    return request({
        method: "POST",
        //url: IP + "/auth/login",
        url: IP + serverName + "/auth/login",
        responseType: "JSON",
        headers: {
            'Content-Type': "application/json",
        },
         data:params
    })
   
}
export function getData() {
    return request({
        method: "GET",
        url: "http://127.0.0.1:8081/portal/app/type_list",
        responseType: "JSON"
    })
    // .then(req => {
    //     alert(req.data.data);
    // });
}
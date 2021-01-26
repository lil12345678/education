import request from '@/router/axios';
const IP = 'http://192.168.8.16:9000';
const serverName = '/zhxy-study';

//获取题库分页


export function exam (query) {
    return request({
        method: "GET",
        url: IP +"/zhxy-study​/api​/examSubject​/findPage",
        params:query
    })
}
//获取题库和考试item
export function examSubject (query) {
    return request({
        method: "GET",
        url: IP +serverName +"/api/examSubject/findPage",
        params:query
    })
}


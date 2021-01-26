// 表单序列化
export const serialize = data => {
    let list = []
    Object.keys(data).forEach(ele => {
        list.push(`${ele}=${data[ele]}`)
    })
    return list.join('&')
}
export const getObjType = obj => {
    var toString = Object.prototype.toString
    var map = {
        '[object Boolean]': 'boolean',
        '[object Number]': 'number',
        '[object String]': 'string',
        '[object Function]': 'function',
        '[object Array]': 'array',
        '[object Date]': 'date',
        '[object RegExp]': 'regExp',
        '[object Undefined]': 'undefined',
        '[object Null]': 'null',
        '[object Object]': 'object'
    }
    if (obj instanceof Element) {
        return 'element'
    }
    return map[toString.call(obj)]
}
/**
 * 对象深拷贝
 */
export const deepClone = data => {
    var type = getObjType(data)
    var obj
    if (type === 'array') {
        obj = []
    } else if (type === 'object') {
        obj = {}
    } else {
        // 不再具有下一层次
        return data
    }
    if (type === 'array') {
        for (var i = 0, len = data.length; i < len; i++) {
            obj.push(deepClone(data[i]))
        }
    } else if (type === 'object') {
        for (var key in data) {
            obj[key] = deepClone(data[key])
        }
    }
    return obj
}
/**
 * 判断路由是否相等
 */
export const diff = (obj1, obj2) => {
    // console.log(obj1);
    // console.log(obj2);

    delete obj1.close
    var o1 = obj1 instanceof Object
    var o2 = obj2 instanceof Object
    if (!o1 || !o2) {
        /*  判断不是对象  */
        return obj1 === obj2
    }

    if (Object.keys(obj1).length !== Object.keys(obj2).length) {
        return false
        // Object.keys() 返回一个由对象的自身可枚举属性(key值)组成的数组,例如：数组返回下表：let arr = ["a", "b", "c"];console.log(Object.keys(arr))->0,1,2;
    }
    // 如果两个标签名相同 则不再创建新标签
    // if (obj1.label == obj2.label)return true;

    for (var attr in obj1) {
        var t1 = obj1[attr] instanceof Object
        var t2 = obj2[attr] instanceof Object
        if (t1 && t2) {
            return diff(obj1[attr], obj2[attr])
        } else if (obj1[attr] !== obj2[attr]) {
            return false
        }
    }
    return true
}
/**
 * 设置灰度模式
 */
export const toggleGrayMode = (status) => {
    if (status) {
        document.body.className = document.body.className + ' grayMode'
    } else {
        document.body.className = document.body.className.replace(' grayMode', '')
    }
}
/**
 * 设置主题
 */
export const setTheme = (name) => {
    document.body.className = name
}

/**
 *加密处理
 */

export const encryption = (params) => {
    let {
        data,
        type,
        param,
        key
    } = params
    const result = JSON.parse(JSON.stringify(data))
    if (type === 'Base64') {
        param.forEach(ele => {
            result[ele] = btoa(result[ele])
        })
    } else {
        param.forEach(ele => {
            var data = result[ele]
            key = CryptoJS.enc.Latin1.parse(key)
            var iv = key
            // 加密
            var encrypted = CryptoJS.AES.encrypt(
                data,
                key, {
                    iv: iv,
                    mode: CryptoJS.mode.CBC,
                    padding: CryptoJS.pad.ZeroPadding
                })
            result[ele] = encrypted.toString()
        })
    }
    return result
}


/**

/**
 * 递归寻找子类的父类
 */

/**
 * 判断路由是否相等
 */
export const isObjectValueEqual = (a, b) => {
    let result = true
    Object.keys(a).forEach(ele => {
        const type = typeof (a[ele])
        if (type === 'string' && a[ele] !== b[ele]) result = false
        else if (type === 'object' && JSON.stringify(a[ele]) !== JSON.stringify(b[ele])) result = false
    })
    return result
}


/**
 * 生成随机len位数字
 */
export const randomLenNum = (len, date) => {
    let random = ''
    random = Math.ceil(Math.random() * 100000000000000).toString().substr(0, len || 4)
    if (date) random = random + Date.now()
    return random
}
export const calFileSize = (size) => {
    let sizeNum = Number(size);
    if (!isNaN(sizeNum)) {
        if (sizeNum / 1024 < 1024) {
            return (sizeNum / 1024).toFixed(2) + " KB"
        }
        if (sizeNum / 1024 / 1024 < 1024) {
            return (sizeNum / 1024 / 1024).toFixed(2) + " MB"
        } else {
            return (sizeNum / 1024 / 1024 / 1024).toFixed(2) + " GB"
        }
    }

}
//处理文件流
export const getStrerm = (name, func) => {
    var xmlhttp;
    xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", "/admin/file/" + name, true);
    xmlhttp.responseType = "blob";
    xmlhttp.setRequestHeader("Authorization", 'Bearer ' + store.getters.access_token);
    xmlhttp.onload = function () {
        console.log(this);
        if (this.status == 200) {
            var blob = this.response;
            var img = document.createElement("img");
            img.onload = function (e) {
                window.URL.revokeObjectURL(img.src);
            };
            img.src = window.URL.createObjectURL(blob);
            // document.getElementById("sss").appendChild(img)
            // document.body.appendChild(img);
            func(img.src);
        }
    }
    xmlhttp.send();
}
// 随机N位字符串
export const randomString = function (len) {
    //默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1
    var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
    var tempLen = chars.length,
        tempStr = '';
    for (var i = 0; i < len; ++i) {
        tempStr += chars.charAt(Math.floor(Math.random() * tempLen));
    }
    return tempStr;
}
// 按key和value查找一个对象数组
export const selectByKey = function (key, value, objArr) {
    let item;
    for (let re in objArr) {
        if (objArr[re][key] == value) {
            item = objArr[re];
            break;
        }
    }
    return item || {};
}
//判断对象的所有值是否为空
export const haveValue = function (obj) {
    for (var k in obj) {
        if (obj[k] != 0) {
            return null;
        }
    }
}
// 保留两位小数
export const toDecimal2 = function (x) {
    var f = parseFloat(x);
    if (isNaN(f)) {
        return false;
    }
    var f = Math.round(x * 100) / 100;
    var s = f.toString();
    var rs = s.indexOf('.');
    if (rs < 0) {
        rs = s.length;
        s += '.';
    }
    while (s.length <= rs + 2) {
        s += '0';
    }
    return s;
}


//f为计算公式   digit为保留的小数位数
export const fixedNum = function(f, digit) {
    var m = Math.pow(10, digit);
    return Math.round(f * m) / m;
}

export const deleteunit = function(arr, unit) {
    var obj=arr.filter(item => item!=unit )
    return obj
}
//数组去重
export const unique =function (arr){            
    for(var i=0; i<arr.length; i++){
        for(var j=i+1; j<arr.length; j++){
            if(arr[i]==arr[j]){         //第一个等同于第二个，splice方法删除第二个
                arr.splice(j,1);
                j--;
            }
        }
    }
return arr;
}




export const formatDate = function(date) {
    var date=new Date(date);
    var time=date.getFullYear()+"年"+(date.getMonth()+1)+"月"+date.getDate()+"日";
    return time;
}
export const formatDateString = function(date) {
    let nowDate = new Date(date)
    let year = nowDate.getFullYear()
    let month = nowDate.getMonth() + 1
    let day = nowDate.getDate()
    if (month < 10) month = '0' + month
    if (day < 10) day = '0' + day
    return year + '-' + month + '-' +day+" 00:00:00"
}
export const formatDateString2 = function(date) {
    let nowDate = new Date(date)
    let year = nowDate.getFullYear()
    let month = nowDate.getMonth() + 1
    let day = nowDate.getDate()
    if (month < 10) month = '0' + month
    if (day < 10) day = '0' + day
    return year + '-' + month + '-' +day
}

export const  debounce =  function(fn, delay) {
    var timer = null;
    return function() {
        timer && clearTimeout(timer);
        var context = this,         // 将执行环境指向当前dom
            arg = arguments;        // 事件e
        timer = setTimeout(function() {
            fn.call(context, arg);
        },delay);
        // timeout = setTimeout(() => {
        //     this[fnName]();
        //   }, delay);
    }
}

import {loginByUsername} from '@/api/login'

const user ={
    state:{
        isLogin:false,
        userInfo:{},
        products:[]
    },
    mutations:{
        SET_USERIFNO: (state, userInfo) => {
            state.userInfo = userInfo
          },
        SET_PRODUCTS:(state,products) => {
            state.products = products
            //刷新页面，数据不存在需要存入store，两种方式存取
          }
    },
    actions:{
        GetUserInfo({commit},user) {
            return new Promise((resolve, reject) => {
              loginByUsername(user).then((res) => {
                const data = res.data.data || {}
                commit('SET_PRODUCTS', res.data.data.products || [])
                resolve(data)
              }).catch((err) => {
                reject()
              })
            })
          },
    }
}
export default user
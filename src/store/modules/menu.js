


const menu ={
    state:{
        menuPath:[],
    },
    mutations:{
        SET_MENUPATH:(state,menuPath) => {
            state.menuPath = menuPath
        },
    },
    actions:{
        getMenuList({commit},obj) {
            return new Promise((resolve, reject) => {
            //   loginByUsername(obj).then((res) => {
            //     debugger
            //     const data = res.data.data || {}
            //     commit('SET_MENULIST', res.data.data.products || [])
            //     resolve(data)
            //   }).catch((err) => {
            //     reject()
            //   })
            })
          },
    }
}
export default menu
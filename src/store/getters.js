import { getStore } from "../util/storage"

const getters = {
    userInfo: state => state.user.userInfo,
    products: state => state.user.products,
    access_token: state => state.user.access_token||get({name:"access_token"}),
    refresh_token: state => state.user.refresh_token||get({name:"refresh_token"}),
    expires_in: state => state.user.expires_in||get({name:"expires_in"}),
    roles: state => state.user.roles,
    permissions: state => state.user.permissions,
    menu:state => state.menu.menuPath,
    

}
export default getters
import Vue from 'vue'
import VueRouter from 'vue-router'
import PageRouter from './view'
import ViewsRouter from './index'

Vue.use(VueRouter)

var Router = new VueRouter({
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      if (from.meta.keepAlive) {
        from.meta.savedPosition = document.body.scrollTop
      }
      return {
        x: 0,
        y: to.meta.savedPosition || 0
      }
    }
  },
  routes: [].concat([]),

})
// Router.beforeEach((to, from, next) => {
//   console.log("路由守卫",to,from);
//   next();
// })
Router.addRoutes([...PageRouter, ...ViewsRouter])
export default Router

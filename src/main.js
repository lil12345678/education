// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/index'
import ElementUI from 'element-ui';
import  VueQuillEditor from 'vue-quill-editor'
import VueCropper from 'vue-cropper' 

Vue.use(VueQuillEditor);

import store from './store'


import 'element-ui/lib/theme-chalk/index.css';
import './style/common.css';
import './style/element.css';


// require styles 引入样式
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';



// 全局注册部分
Vue.use(ElementUI);
Vue.config.productionTip = false
// Vue.use(VueAxios, axios)

Vue.use(VueCropper)




// 全局路由守卫
// router.beforeEach((to, from, next) => {
// let token  = sessionStorage.getItem('TOKEN')
// //没有登录
// if(!token) {
  
//     next('/')
//   }
//   next()

// })

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

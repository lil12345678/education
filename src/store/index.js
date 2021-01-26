import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import menu from './modules/menu'
import getters from './getters'

import VueXAlong from 'vuex-along'

Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    user,
    menu
  },
  getters,
  //解决刷新数据消失的问题
  plugins: [VueXAlong({
  name: 'along',     //存放在localStroage或者sessionStroage 中的名字
  local: true,      //是否存放在local中  false 不存放 如果存放按照下面session的配置配
  session: { list: [], isFilter: true } //如果值不为false 那么可以传递对象 其中 当isFilter设置为true时， list 数组中的值就会被过滤调,这些值不会存放在seesion或者local中
})]
})


export default store

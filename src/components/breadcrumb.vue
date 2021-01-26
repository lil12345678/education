<template>
  <div class="top-box">
    <el-breadcrumb
      class="breadcrumb-container"
      separator-class="el-icon-arrow-right"
    >
      <el-breadcrumb-item
        v-for="item in levelList"
        :key="item.path"
        :to="item.path"
        >{{ item.name }}</el-breadcrumb-item
      >
    </el-breadcrumb>
  </div>
</template>

<script>
import store from "@/store";
import { mapState } from "vuex";
export default {
  name: "breadcrumb",
  props: {
    // 数据格式时map，key和val，key是文本，val是路由地址。
    items: {
      type: Object,
      default: ()=>{return {}}
    },
  },
  data() {
    return {
      levelList: [],
    };
  },
  watch: {
    items() {
      this.setBreadcrumb();
    },
  },
  created() {
    // this.getBreadcrumb()
    this.setBreadcrumb();
  },
  methods: {
    //安路由显示面包屑
    // getBreadcrumb() {
    //     //$route.matched一个数组 包含当前路由的所有嵌套路径片段的路由记录
    //     let matched = this.$route.matched.filter(item => item.name)
    //     const first = matched[0];
    //     if (first && first.name.trim().toLocaleLowerCase() !== 'Dashboard'.toLocaleLowerCase()) {
    //         matched = [{ path: '/dashboard', meta: { title: 'dashboard' }}].concat(matched)
    //     }
    //     // let homeObj = {
    //     //     name:'首页',
    //     //     path:'/home'
    //     // }
    //     let m = matched.shift()
    //      //matched.unshift(homeObj)
    //     this.levelList = matched;

    // }

    //手动在页面配置面包屑
    setBreadcrumb() {
        for (let k in this.items) {
            this.levelList.push({
                name:  k,
                path: this.items[k]
            });
        }
    },
  },
};
</script>
<style lang="scss" scoped>

</style>
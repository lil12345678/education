<template>
  <div id="OA">
    <div class="layout-header">
      <Top></Top>
    </div>
    <div class="box">
      <div class="layout-sideBar">
        <SideBar :menuList="menuList"></SideBar>
      </div>
      <div class="layout-main">
        <router-view></router-view>
        <!-- <RightMain></RightMain> -->
      </div>
    </div>
  </div>
</template>
<script>
import Top from "./top";
import SideBar from "./menu";
import store from "@/store";
import { mapGetters } from "vuex";
import { getMenu } from "@/api/menu.js";
//import{Menu} from "@/const/menu.js"
import axios from '@/router/axios'
export default {
  name: "OA",
  components: {
    Top,
    SideBar,
  },
  data() {
    return {
      menuList: [],
       //menu:Menu,
    };
  },
  computed: {
    ...mapGetters(["products", "userInfo"]),
  },
  created() {
    this.getMenu();
  },
  methods: {
    //获取菜单
    getMenu() {
       //this.menuList = this.menu
        console.log(sessionStorage.getItem('PRODUCTID'))
       let m =sessionStorage.getItem('MENULIST')
       if(m == null || m == 'undefined'){
       getMenu().then((res) => {
          this.menuList = res.data.data;
          sessionStorage.setItem('MENULIST',JSON.stringify(res.data.data))
          if(this.$route.path == '/OA'){
            this.$router.push('/home')
          }
        })
        .catch((err) => {
        });
       }else{
         this.menuList = JSON.parse(m)
         console.log(this.menuList)
         if(this.$route.path == '/OA'){
            this.$router.push('/home')
          }
       }
     
    },
  },
};
</script>
<style lang="scss" >
#OA {
  .layout-header {
    background-color: #fff;
    color: #333;
    width: 100%;
    height: 56px;
    box-shadow: 0px 1px 5px rgba(94, 105, 135, 0.57);
  }
  .box {
    display: flex;
    overflow: hidden;
  }
  .layout-sideBar {
    width: 228px;
    min-width: 228px;
    background-color: #5e6987;
    overflow-y:scroll;
  }
  .layout-main {
    flex: 1;
    background-color: #f5f6f6;
   
  }
}
</style>
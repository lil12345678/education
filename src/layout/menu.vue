<template>
  <div class="sidebar-box">
    <div class="menu-box">
    <i
      v-if="closeMenuIcon == false"
      class="icon el-icon-s-unfold"
      @click="closeMenu"
    ></i>
    <i v-else class="icon el-icon-s-fold" @click="openMenu"></i>
    <el-menu
      :router="true"
      :default-active="$route.path"
      background-color="#5E6987"
      text-color="#fff"
      active-text-color="#11EEF0"
      @select="handleSelect"
      v-for="(item, i) in menuList"
      :key="i"
      @open="handleOpen"
    >
      <!--叶子级菜单-->
      <template v-if="item.childMenus == null || item.childMenus.length === 0">
        <el-menu-item
          :key="item.mid"
          :index="item.menuPath"
          style="font-size: 16px"
          @click.native.prevent="handleClick(item.mid)"
        >
          <i :class="item.iconCls"></i>
          {{ item.menuName }}
        </el-menu-item>
      </template>
      <!--父级菜单-->
      <el-submenu v-else :index="item.menuPath" style="text-align: left">
        <span slot="title" style="font-size: 16px">
          <i :class="item.iconCls"></i>
          {{ item.menuName }}
        </span>
        <template v-for="child in item.childMenus">
          <NavItem
            v-if="child.childMenus && child.childMenus.length > 0"
            :key="child.mid"
            :item="child"
          />
          <el-menu-item
            v-else
            :key="child.mid"
            :index="child.menuPath"
            style="text-align: left; padding-left: 30px"
            @click.native.prevent="handleClick(child.mid)"
          >
            <i :class="child.icon"></i>
            {{ child.menuName }}
          </el-menu-item>
        </template>
      </el-submenu>
    </el-menu>
    </div>
  </div>
</template>
<script>
//import { Menu } from "../const/menu";
import NavItem from "./navItem";
import store from "@/store";
export default {
  name: "SideBar",
  props: {
    menuList: {
      type: Array,
      required: true,
    },
  },
  components: { NavItem },
  data() {
    return {
      closeMenuIcon: true,
      //  menuList: this.menuList,
    };
  },
  methods: {
    //打开菜单
    openMenu() {
      this.closeMenuIcon = false;
    },
    //收拢菜单
    closeMenu() {
      this.closeMenuIcon = true;
    },
    handleSelect(key, keyPath) {
      //console.log(sessionStorage.getItem('MENULIST'))
    },
    handleClick(id) {
      let data = JSON.parse(sessionStorage.getItem("MENULIST"));
      let arr = [];
      for (let i in data) {
        let data2 = data[i].childMenus;
        for (let j in data2) {
          if (data2[j].mid == id) {
            arr.push(data2[j].operations);
          }
        }
      }
      this.permission = arr;
      console.log(this.permission)
      sessionStorage.setItem("PERMISSION", JSON.stringify(this.permission));
    },
    handleOpen(key, keyPath) {},
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>
<style lang="scss" scoped>
.el-icon-s-fold,
.el-icon-s-unfold {
  position: absolute;
  top: 16px;
  left: 230px;
  font-size: 24px;
}
.menu-box{ }
.sidebar-box {
  height: 870px;
  padding-top: 12px;
  width: 229px;
  .img {
    width: 20px;
    height: 20px;
    color: #fff;
    margin-right: 18px;
  }
}
.el-submenu__icon-arrow {
  color: #fff;
}
</style>
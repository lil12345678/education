
<template>
  <div>
    <!--叶子级菜单-->
    <template v-if="item.childMenus && item.childMenus.length === 0">
      <el-menu-item :key="item.mid" :index="item.menuPath">
        {{item.menuName}}
      </el-menu-item>
    </template>
    <!--父级菜单-->
    <el-submenu v-else :index="item.menuPath" style="text-align: left">
      <span slot="title" style="font-size: 16px;">
        <i :class="item.iconCls"></i>
        {{item.menuName}}
      </span>
      <template v-for="child in item.childMenus">
        <NavItem  v-if="child.childMenus && child.childMenus.length>0" :key="child.mid" :item="child"/>
        <el-menu-item v-else :key="child.mid" :index="child.menuPath">
          <i :class="child.icon"></i>
          {{child.menuName}}
        </el-menu-item>
      </template>
    </el-submenu>
  </div>
</template>
 
<script>
  export default {
    name: 'NavItem',
    props: {
      item: {
        type: Object,
        required: true
      },
    }
  }
</script>
<template>
  <div class="header-box">
    <div class="header-title">{{ OAtitle }}</div>
    <!-- <i v-if="closeMenu == false" class="icon el-icon-s-unfold"></i> 
    <i v-else class="icon el-icon-s-fold"></i> -->
    <div class="right-box">
      <i class="icon el-icon-message-solid"></i>
      <div class="line"></div>
      <i class="icon el-icon-s-tools"></i>
      <div class="block">
        <el-avatar :size="32" :src="circleUrl"></el-avatar>
      </div>
      <div class="user-name">{{ userName }}</div>
      <el-dropdown>
        <i class="icon el-icon-arrow-down"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item  @click.native="logout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>
<script>
import {clear} from '@/util/storage';
export default {
  name: "Top",
  data() {
    return {
      closeMenu: true,
      OAtitle: "校园综合管理平台",
      userName: "ll",
      circleUrl:
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
    };
  },
  methods: {
    logout() {
      this.$router.push('/')
    },
  },
};
</script>

<style lang="scss" scoped>
.header-box {
}
.header-title {
  float: left;
  line-height: 56px;
  font-size: 20px;
  font-weight: 700;
  margin-left: 32px;
  margin-right:32px;
}
.right-box {
  float: right;
  display: flex;
  white-space: nowrap;
}
.icon {
  font-size: 20px;
  line-height: 56px;
}
.line {
  height: 16px;
  width: 1px;
  background-color: #ccc;
  margin: 20px 18px;
}
.block {
  margin: 12px 18px 0 40px;
}
.user-name {
  line-height: 56px;
}
.el-icon-arrow-down {
  margin: 0  16px;
  line-height: 56px;
  font-size: 12px;

}

</style>
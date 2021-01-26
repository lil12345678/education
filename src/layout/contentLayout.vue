<template>
  <div>
    <div class="top">
      <i class="icon el-icon-location"></i>
      <Breadcrumb class="bread" ></Breadcrumb>
      <div class="back" @click="goBack">
    <i class="el-icon-refresh-left"></i><span>返回</span>
    </div>
    </div>
    <router-view></router-view>
    </div>
</template>
<script>
import Breadcrumb from "../components/breadcrumb";
export default {
  name:'contentLayout',
  data(){
    return{
      breadItems:{},
    }
  },
  components:{
    Breadcrumb,
  },

  methods:{
    goBack(){
       this.$router.go(-1);
    },
  }
}
</script>

<style lang="scss" scoped>
.top {
  height: 40px;
  background-color: #fff;
  width: 100%;
  margin: 24px 0 0 24px;
}
.el-icon-location {
  padding: 16px;
}
.bread {
  display: inline-block;
}
.back{
  float: right;
}
</style>
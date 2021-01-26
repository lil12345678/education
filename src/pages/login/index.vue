<template>

    <div class="formBox">
      <div class="logoBox">
        <img class="logo" src="url" alt="LOGO" />
      </div>
      <div class="login-main">
        <div class="main-box">
        <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="登录" name="log">
                    <userLogin ></userLogin>
                </el-tab-pane>
                <el-tab-pane label="注册" name="reg"> 
                  <reg ></reg>
                </el-tab-pane>
             </el-tabs>
        <div class="about"><a href="" target="_blank">关于我们</a></div>
        </div>
      </div>
       
       
     
 </div>
</template>

<script>
import {getToken,loginByUsername, getData} from '@/api/login.js';
import store from "@/store";
import userLogin from "./userlogin";
import reg from "./reg";
export default {
  name: "login",
  components: {
    userLogin,
    reg,
  },
  data() {
    return {
      activeName: "log",
      loginShow: true,
      registerShow: false,
      newName: '',
      newPassword:'',
      
    };
  },
  methods: {
     
    handleClick(key, keyPath) {
       

      },
  },
};
</script>
<style lang="scss" scoped>
.formBox{
width:100%;
height:100%;

}
.logoBox{
  width:50%;
  height:100%;
float:left;
}
.logo{
width:80px;
height: 80px;
margin:0 auto;
position: absolute;
top:50%;
left:20%;
}
.login-main{
  float:right;
  width:50%;
  height:100%;
}
  .main-box{

margin:0 auto;
position: absolute;
top:30%;
right:20%
  } 
</style>


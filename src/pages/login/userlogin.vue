<template>
  <div class="formBox">
    <el-form
      class="form"
      :model="loginFrom"
      status-icon
      ref="loginFrom"
      :rules="rules"
      label-width="100px"
    >
      <el-form-item label="用户名" prop="account">
        <el-input v-model="loginFrom.account"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="psw">
        <el-input type="password" v-model="loginFrom.psw"></el-input>
      </el-form-item>
    </el-form>
    <div class="button-box">
      <el-button
        type="primary"
        style="width: 12%"
        @click="submitForm('loginFrom')"
        >密码登录</el-button
      >
      <el-button style="width: 12%" @click="resetForm()">重置</el-button>
    </div>
  </div>
</template>

<script>
import { loginByUsername, getData } from "@/api/login.js";
import store from "@/store";
export default {
  name: "userLogin",
  data() {
    return {
      //url:require(''),
      activeIndex: "1",
      loginFrom: {
        psw: "",
        account: "",
      },
      rules: {
        account: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        psw: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, message: "密码长度最少为6位", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    //初始化表单数据
    init() {
      this.loginFrom.account = "";
      this.loginFrom.psw = "";
    },
    submitForm(formName) {
      //验证
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //验证通过调用登录接口
          loginByUsername(this.loginFrom)
            .then((res) => {
              debugger
              //res包含token和用户信息
              sessionStorage.setItem("TOKEN", res.data.data.token);
               sessionStorage.setItem("SCHOOLID", res.data.data.schoolId);
              //将用户信息数据存到mutations里login函数里的userInfo里去，方便其他页面获取用户数据
              store.commit("SET_USERIFNO", {
                account: res.data.data.account,
                userName: res.data.data.userName,
                uid: res.data.data.uid,
                schoolId: res.data.data.schoolId,
              });
              store.dispatch("GetUserInfo", this.loginFrom);

              //根据用户权限进入相应的OA产品,只有一个产品直接进入OA页面
              let len = res.data.data.products.length;
              if (len == 1) {
               sessionStorage.setItem('PRODUCTID',res.data.data.products[0].pid)
                this.$router.push("/OA");
              } else if (len == 0) {
                this.$message("此账号没有相应的OA产品");
              } else {
                this.$router.push("/product");
              }
               //this.$router.push("/product");
            })
            .catch((err) => {
              debugger
              this.$message.error('登录是失败，请稍后再试')
              console.log(err);
            });
        } else {
          this.$message("请完善您的登录信息");
         }
      });
    },
    //重置表单
    resetForm() {
      this.init();
    },

    //调试页面中获取数据
    getData() {
      getData()
        .then((res) => {
          debugger;
          console.log(res);
        })
        .catch((err) => {
          debugger;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.formBox {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 20% auto;
}

.form {
  width: 500px;
}
.button-box {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-left: 36px;
}
</style>
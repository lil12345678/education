<template>
  <div class="register">
    <el-form :model="regForm" status-icon :rules="rules" ref="ruleForm"
      label-width="0" class="register-form"
    >
      <el-form-item prop="username">
        <el-input v-model="regForm.username" size="small"
           autocomplete="new-password" placeholder="请输入账户名"
        >
          <i slot="prefix" class="iconfont icon-login-user"></i>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input :type="passwordType" size="small" v-model="regForm.password"
           autocomplete="new-password" placeholder="请输入密码"
        >
          <i class="el-icon-view el-input__icon" slot="suffix" @click="showPassword"></i>
          <i slot="prefix" class="iconfont icon-login-lock"></i>
        </el-input>
      </el-form-item>
      <el-form-item prop="checkPass">
        <el-input :type="passwordType" size="small" v-model="regForm.checkPass"
          autocomplete="off" placeholder="请再次输入密码"
        >
          <!-- <i class="el-icon-view el-input__icon" slot="suffix" @click="showPassword"></i> -->
          <i slot="prefix" class="iconfont icon-login-lock"></i>
        </el-input>
      </el-form-item>
      <el-form-item prop="realName" v-show="false">
        <el-input size="small" @keyup.enter.native="handleLogin" v-model="regForm.realName"
           autocomplete="off" placeholder="请输入昵称"
        >
          <i slot="prefix" class="iconfont icon-login-user"></i>
        </el-input>
      </el-form-item>
      <el-form-item prop="mobile">
        <el-input v-model="regForm.mobile" size="small" placeholder="请输入手机号" autocomplete="off">
          <i slot="prefix" class="iconfont el-icon-phone"></i>
        </el-input>
      </el-form-item>
      <el-form-item prop="code">
        <el-input size="small" v-model="regForm.code"  autocomplete="off" placeholder="请输入验证码"
        >
        <i slot="prefix" class="iconfont icon-login-approve"></i>
          <el-button v-if="!isVerify" size="mini" type="primary" class="el-button3" slot="suffix"
            :disabled="isVerify" @click="getVerification"
          >获取验证码</el-button>
          <el-button v-else size="mini" type="primary" class="el-button3" slot="suffix"
            :disabled="isVerify" @click="getVerification"
          >{{resubmitTime+'s后重试'}}</el-button>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button size="small" class="el-button1" :loading="loading" :disabled="handlecode" type="primary" @click.native.prevent="handleLogin">
          <span v-if="!handlecode">提交</span>
          <span v-else>注册中</span>
        </el-button>
        <el-button size="small" class="el-button1" @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// import { checkUseName, getDetails } from "@/api/admin/user";
export default {
  data() {
    var checkName = (rule, value, callback) => {
      // let regularVerifyName = /[、_ = \ \\ \[\] ; . ' , \/ ~ ! @ # $ % ^ & * ( ) + - | ? > < “ :{}]/;
      if (!value) {
        callback(new Error("不能为空"));
      } else {
       /*  if(regularVerifyName.test(value)) {
          callback(new Error("用户名中包含特殊符号"));
        } */
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      let pass_word = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,24}$/;
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if(value.length < 6 || value.length > 24) {
          callback(new Error("密码长度应为6~24位"));
        }
        if (pass_word.test(value)) {
          this.$refs.ruleForm.validateField("checkPass");
          callback();
        }else{
          callback(new Error("密码中需包含(字母、数字)"));
        }
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.regForm.password) {
        callback(new Error("两次密码需相同!"));
      } else {
        callback();
      }
    };
    var validateMobil = (rule, value, callback) => {
      const regIdNo = /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/;
      if (!regIdNo.test(value)) {
        callback(new Error("手机号填写有误！"));
      } else {
        callback();
      }
    };
    return {
      errorMessage: "", //错误消息信息
      resubmitTime: 60, //获取验证码的间隔时间
      isVerify: false, //控制显示验证时间的打开
      // verification: "", //与请求到的 code 进行比对
      loading: false,
      handlecode: false,
      activeIndex: "2",
      regForm: {
        password: "",
        checkPass: "",
        username: "",
        realName: "",
        mobile: "",
        code: "",
        type: "REGISTER_USER",
      },
      rules: {
        username: [{ required: true, validator: checkName, trigger: "blur" }],
        //username: [{ required: true,  trigger: "blur" }],
        password: [
          { required: true, validator: validatePass, trigger: "blur" },
          { min: 6, message: "密码长度最少为6位", trigger: "blur" },
        ],
        checkPass: [
          { required: true, validator: validatePass2, trigger: "blur" },
        ],
        mobile: [
          { required: true, message: "请输入手机号码", trigger: "blur" },
          { validator: validateMobil, trigger: "blur" },
        ],
        code: [
          { required: true, message: "请输入验证码", trigger: "blur" },
          { min: 6, max: 6, message: '验证码长度为6位', trigger: 'blur' },
        ],
      },
      passwordType: "password",
    };
  },
  methods: {
    //提交表单
    handleLogin() {
      let userDto = {
        username: this.regForm.username,
        password: this.regForm.password,
        realName: this.regForm.username,
        mobile: this.regForm.mobile,
        code: this.regForm.code,
        type: this.regForm.type
      };
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          // if(this.verification == this.regForm.code) {
            this.handlecode = true; 
            this.loading = true;
            console.log(userDto);
            this.axios({
              method: "post",
              headers: {
              isToken:false,
              'Authorization': 'Basic Y2xvdWQ6Y2xvdWQ='
              },
              url: '/admin/user/regist',
              params: {
                mobile: this.regForm.mobile,
                code: this.regForm.code,
                type: this.regForm.type
              },
              data: {
                username: this.regForm.username,
                password: this.regForm.password,
                realName: this.regForm.username,
                mobile: this.regForm.mobile,
              },
            })
             /*  .post("/admin/user/regist", userDto) */
              .then((res) => {
                this.loading = false
                this.handlecode = false;
                console.log(res);
                this.errorMessage = res.data.msg;
                if(res.data.code == 0) {
                  return this.$message.success("注册成功");
                }else{
                  return this.$message.warning(this.errorMessage);
                }
              })
                .catch(() => {
                this.loading = false
                this.handlecode = false;
              })
          // }else{
          //   return this.$message.error("验证码输入有误");
          // } 
        }
      });
    },
    showPassword() {
      this.passwordType == ""
        ? (this.passwordType = "password")
        : (this.passwordType = "");
    },
    //重置表单
    resetForm(ruleForm) {
      this.$refs[ruleForm].resetFields();
      this.loading = false;
    },
    //获取手机验证码
    getVerification() {
      let bolm = true;
      this.$refs.ruleForm.validateField("mobile", (valid) => {
        if (valid) {
          bolm = false;
        }
      });
      //在此处做获取验证码的请求,并将请求到的验证码显示在页面
      if (!bolm) return;
      this.axios
        .post("/message/verification/send",{
          mobile: this.regForm.mobile,
          type: this.regForm.type,
          code: "redl"
        })
        .then(res => {
          console.log(res);
          if(res.data.code == 0) {
            // this.regForm.code = res.data.data;
            // this.verification = res.data.data;
            // 60 秒后可再次获取验证码
            this.isVerify = true;
            var timer = null;
            timer = setInterval(() => {
              this.resubmitTime--;
              if (this.resubmitTime <= 0) {
                clearInterval(timer);
                this.resubmitTime = 60;
                this.isVerify = false;
              }
            }, 1000);
            return this.$message.success("验证码获取成功");
          }else{
            return  this.$message.error(res.data.msg);
          }
        })
    },
    //清空输入框的操作
    cleanUserInput() {
      this.regForm.username = "";
      this.regForm.password = "";
    }
  },
  created() {
    console.log(111);
    this.cleanUserInput();
  }
};
</script>
<style  lang="scss" scoped>
.register {
  .register-form {
    //注册页面的缩放大小
    width: 325px;
    .el-input {
      height: 40px;
      line-height: 40px;
      input {
        padding-bottom: 0;
      }
    }
    .el-form-item, .el-form-item__label {
      height: 32px;
      line-height: 32px;
    }
    .login-form {
      width: 325px;
      height: 266px;
      margin: 10px 0;
    }
    .el-button {
      width: 25%;
    }
    .el-button1 {
      margin: 5px 3px 0 0;
    }
    .login-code {
      margin: 0;
    }
    .el-button3 {
      width: 100px;
    }
  }
}
  .register ::v-deep input {
    border-radius: 0;
    border: none;
    border-bottom: 1px solid #DCDFE6;
    height: 38px !important;
    line-height: 38px !important;
  }
  .register ::v-deep .el-form-item {
    margin-bottom: 22px;
  }
</style>

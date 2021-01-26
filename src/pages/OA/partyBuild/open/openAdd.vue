<template>
  <div>
    <div class="top">
      <i class="icon el-icon-location"></i>
      <Breadcrumb class="bread" :items="breadItems"></Breadcrumb>
      <div class="back" @click="goBack">
        <i class="el-icon-refresh-left"></i><span>返回</span>
      </div>
    </div>
    <div class="container-box">
      <div class="title-box">
        <div class="rectangle"></div>
        <div class="TTtitle">校务新增</div>
      </div>
      <el-form ref="form" :model="form" label-width="80px" :rules="rules">
        <el-form-item label="标题" prop="title">
          <el-input v-model="form.title" style="width: 240px"></el-input>
        </el-form-item>
        <el-form-item label="公开范围" prop="scope">
          <el-radio v-model="form.scope" label="0">全校公开</el-radio>
          <el-radio v-model="form.scope" label="1">党员公开</el-radio>
        </el-form-item>
        <el-form-item label="附件" prop="picId">
          <el-upload
            class="upload-demo"
            action="http://192.168.8.106:9030/api/articleInfo/uploadFile"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            :on-success="handleAvatarSuccess"
            multiple
            :file-list="fileList"
          >
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <Editor v-model="form.content" />
        </el-form-item>
      </el-form>
      <div class="button-box">
        <el-button type="primary" @click="addSubmit('form')" size="mini"
          >确 定</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import Breadcrumb from "@/components/breadcrumb.vue";
import Editor from "@/components/editor";
import { newAddNews } from "@/api/news";
export default {
  name: "addOpen",
  components: {
    Breadcrumb,
    Editor,
  },
  data() {
    return {
      breadItems: {}, //面包屑组件传入的值
      form: {
        title: "",
        picId: "",
        content: "",
        scope: "0",
      },
      fileList: [],
      rules: {
        title: [{ required: true, message: "请输入标题", trigger: "blur" }],
        scope: [{ required: true, message: "请选择公开范围", trigger: "blur" }],
        picId: [{ required: true, message: "请上传图片", trigger: "blur" }],
        content: [
          { required: true, message: "请输入校务内容", trigger: "blur" },
        ],
      },
    };
  },
  created() {
    this.setBreadItems();
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    //添加面包屑
    setBreadItems() {
      this.breadItems = {
        智慧党建: "/partyBuild",
        校务公开: "/partyBuild/open",
        校务新增: "/partyBuild/open/openAdd",
      };
    },
    handleAvatarSuccess(res, file) {
      let str = res.data.id;
      this.form.picId += str + ",";
    },
    handleRemove(file, fileList) {
      let str = file.response.data.id;
      let reg = new RegExp(str + ",");
      this.form.picId = this.form.picId.replace(reg, "");
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    addSubmit(formName) {
      console.log(this.form);
      this.$refs[formName].validate((valid) => {
        if (valid) {
          newAddNews(this.form)
            .then((res) => {
              this.$message("您已提交成功");
            })
            .catch((err) => {});
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.top {
  height: 0.4rem;
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
.back {
  float: right;
  line-height: 40px;
  margin-right: 64px;
}
.container-box {
  background-color: #fff;
  margin: 24px 24px 0 24px;
  padding-bottom: 24px;
}
.rectangle {
  float: left;
  margin: 24px 0 0 24px;
  height: 20px;
  width: 4px;
  background: linear-gradient(
    to bottom,
    rgb(138, 206, 252) 0%,
    rgb(13, 135, 248) 60%
  );
}
.TTtitle {
  display: inline-block;
  margin: 24px 0 0 24px;
  font-size: 16px;
  font-weight: 400;
  color: #333333;
}
.el-form {
  margin: 24px;
}
.upload /deep/ .el-upload {
  width: 80px;
  height: 80px;
  line-height: 80px;
  border: 1px dashed #cfcfcf;
}
.avatar {
  width: 80px;
  height: 80px;
}
.button-box {
  display: flex;
  justify-content: center;
  margin-top: 24px;
}
</style>
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
        <div class="TTtitle">添加测试</div>
      </div>
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="测试名称">
          <el-input v-model="form.name" style="width: 400px"></el-input>
        </el-form-item>
        <el-form-item label="考试时长">
          <el-input v-model="form.name" style="width: 400px"></el-input>
         <el-input v-model="form.minute" style="width: 400px"></el-input>
        </el-form-item>
        <el-form-item label="测试分类">
          <el-select v-model="form.dsType" placeholder="请选择">
            <el-option
              v-for="item in typeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="试题类型">
          <el-checkbox label="复选框 A"></el-checkbox>
          <el-checkbox label="复选框 B"></el-checkbox>
          <el-checkbox label="复选框 C"></el-checkbox>
        </el-form-item>
        <el-form-item label="试题分值">
          <span>aaa</span
          ><el-input v-model="form.name" style="width: 200px"></el-input>
          <span>aaa</span
          ><el-input v-model="form.name" style="width: 200px"></el-input>
          <span>aaa</span
          ><el-input v-model="form.name" style="width: 200px"></el-input>
        </el-form-item>
      </el-form>
      <div class="button-box">
        <!-- <el-button @click="close" size="mini">取 消</el-button> -->
        <el-button type="primary" @click="selectQuestion" size="mini"
          >去选题</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import Breadcrumb from "@/components/breadcrumb";
export default {
  name: "addHonor",
  components: {
    Breadcrumb,
  },
  data() {
    return {
      form: {},
      typeOptions: [],
      content: null,
      editorOption: {},
    };
  },
  created(){
    this.setBreadItems();
  },
  methods: {
     goBack() {
      this.$router.go(-1);
    },
    //添加面包屑
    setBreadItems() {
      this.breadItems = {
        '智慧党建': "/partyBuild",
        '学习管理': "/partyBuild/studyManage",
        '添加测试': "/partyBuild/studyManage/addTestHand",
      };
    },
    //去选题
    selectQuestion() {
      this.$router.push({
        path: "/partyBuild/studyManage/changeTestQ",
        params: {
          allSelect: "true",
        },
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
  margin: 24px 0 0 0;
}
.upload /deep/ .el-upload {
  width: 80px;
  height: 80px;
  line-height: 80px;
}
.button-box {
  display: flex;
  justify-content: center;
  margin-top: 24px;
}
</style>
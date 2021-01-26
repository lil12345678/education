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
        <div class="TTtitle">发布学习</div>
      </div>
      <el-form ref="form" :model="form" label-width="80px" :rules="rules">
        <el-form-item label="学习标题" prop="title">
          <el-input v-model="form.title" style="width: 400px"></el-input>
        </el-form-item>
        <el-form-item label="学习类别" prop="menuId">
          <el-select v-model="form.menuId" placeholder="请选择" style="width:400px">
            <el-option
              v-for="item in studyOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="发布单位" prop="createdCompany">
          <el-select v-model="form.createdCompany" placeholder="请选择" style="width:400px">
            <el-option
              v-for="item in orgOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
         <el-form-item label="外部链接" prop="title">
          <el-input v-model="form.title" style="width: 400px" placeholder="请输入外部链接地址"></el-input>
        </el-form-item>
       <el-form-item label="附件" prop="picId">
        <el-upload
            class="upload-demo"
            action="http://192.168.8.106:9030/api/articleInfo/uploadFile"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            :on-success="handleAvatarSuccess"
            multiple
            :file-list="fileList">
            <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
        </el-form-item>
        <el-form-item label="内容" prop="content" style="margin-bottom: 24px">
          <Editor v-model="form.content" />
        </el-form-item>
      </el-form>
      <div class="button-box">
        <!-- <el-button @click="close" size="mini">取 消</el-button> -->
        <el-button type="primary" @click="addSubmit('form')" size="mini">确 定</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import Breadcrumb from "@/components/breadcrumb";
import Editor from "@/components/editor";
import Cropper from "@/components/cropper";
import { orgList } from "@/api/org.js";
import { getSortTree,newAddNews ,getDetail} from "@/api/news";
export default {
  name: "addStydy",
  components: {
    Breadcrumb,
    Editor,
    Cropper,
  },
  data() {
    return {
      breadItems:{},
      fileList: [],
      form: {
        title: "",
        picId: "",
        menuId: "",
        createdCompany: "",
        content: "",
      },
      studyOptions:[],//学习分类
      orgOptions: [],//发布单位
      optionImage: "",
       rules:{
               title: [
                  { required: true, message: '请输入荣誉标题', trigger: 'blur' },
                ],
                menuId:[
                  { required: true, message: '请选择学习分类', trigger: 'blur' },
                ],
                createdCompany:[
                  { required: true, message: '请选择发布单位', trigger: 'blur' },
                ],
                picId:[
                     { required: true, message: '请上传附件', trigger: 'blur' },
                ],
                content: [
                  { required: true, message: '请输入荣誉内容', trigger: 'blur' },
                ],
       },
    };
  },
  created() {
    this.setBreadItems();
    this.getOrgList();
    this.getHonorSort();
    if(this.$route.query.state == 'edit'){
        this.getPageData()
    }
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
        '发布学习': "/partyBuild/studyManage/addStudy",
      };
    },
    //点击编辑进入页面，获取数据
    getPageData(){
         let I  = {id : this.$route.query.id}
            getDetail(I).then(res => {
                debugger
            this.form = res.data.data
            //   this.title = res.data.data.title;
            //   this.createdCompany = res.data.data.createdCompany
            //   this.createdTime = res.data.data.createdTime;
            //   this.readNum = res.data.data.readNum;
            //   this.content = res.data.data.content;
            }).catch(err => {

            })

    },
    //获取荣誉分类
    getHonorSort() {
      let obj = {
    name:'在线学习'
  }
      getSortTree(obj)
        .then((res) => {
          let data = res.data.data[0].children;
          let arr = [];
          data.map(i => {
            arr.push({value:i.id,label:i.name})
          })
          this.studyOptions = arr; 
      
        })
        .catch((err) => {});
    },
    //获取创建单位
    getOrgList() {
      let obj = {
        schoolId: 1,
        organizeType:2
      };
      orgList(obj).then((res) => {
          let data = res.data.data.childs;
          let arr = [];
          data.map(i => {
            arr.push({value:i.oid,label:i.organizeName})
          })
          this.orgOptions = arr; 
        })
        .catch((err) => {});
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
      this.$refs[formName].validate((valid) => {
        if (valid) {
              newAddNews(this.form).then(res => {
              this.$message('您已提交成功')
              }).catch(err => {

              })
        }
                })
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
}
</style>
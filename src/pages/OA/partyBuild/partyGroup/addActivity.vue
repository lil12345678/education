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
        <div class="TTtitle">创建活动</div>
      </div>
      <el-form ref="form" :model="form" label-width="120px" :rules="rules">
        <el-form-item label="活动名称" prop="baseInfo">
          <el-input v-model="form.baseInfo.title" style="width: 400px"></el-input>
        </el-form-item>
        <el-form-item label="活动分类" prop="menuId">
          <el-select v-model="form.menuId" placeholder="请选择">
            <el-option
              v-for="item in activityOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="活动地点" prop="activityPlace">
            <el-radio :label="0" v-model="form.activityPlace">室外</el-radio>
            <el-radio :label="1" v-model="form.activityPlace">会议室</el-radio>
        </el-form-item>
        <el-form-item label="活动地址" prop="activityAddress">
          <el-input v-model="form.activityAddress" style="width: 400px"></el-input>
          <el-button size="mini" type="primary" @click="goMeetingRoom">选择会议室</el-button>
        </el-form-item>
        <el-form-item label="活动时间" prop="date">
          <el-date-picker v-model="form.date" type="daterange" value-format="timestamp" placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="报名截止时间" prop="applyTime">
          <el-date-picker v-model="form.applyTime" type="date" value-format="timestamp" placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="举办单位" prop="holdCompany">
          <el-input v-model="form.holdCompany" style="width: 400px"></el-input>
        </el-form-item>
        <el-form-item label="参会人数限制" prop="participantNum">
          <el-input v-model="form.participantNum" style="width: 400px"></el-input>
        </el-form-item>
        <el-form-item label="活动图片" prop="picId">
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
        <el-button type="primary" @click="addSubmit('form')" size="mini">提交审核</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import Editor from "@/components/editor";
import Breadcrumb from "@/components/breadcrumb";
import {getSortTree, newAddItem} from "@/api/event";
export default {
  name: "addActivity",
  components: {
    Breadcrumb,
    Editor,
  },
  data() {
    return {
      breadItems:{},
      fileList: [],
      form: {
        menuId:'',
        activityPlace:'',
        activityAddress:'',
        activityTime:'',
        endTime:'',
        applyTime:'',
        holdCompany:'',
        participantNum:'',
        picId:'',
        content:'',
        baseInfo:{
          title:'',
        }
      },
      activityOptions:[],
       rules:{
               baseInfo: [
                  { required: true, message: '请输入荣誉标题', trigger: 'blur' },
                ],
                menuId:[
                  { required: true, message: '请选择活动分类', trigger: 'blur' },
                ],
                activityPlace:[
                  { required: true, message: '请选择活动地点', trigger: 'blur' },
                ],
                activityAddress:[
                  { required: true, message: '请选择活动地址', trigger: 'blur' },
                ],
                date:[
                  { required: true, message: '请选择活动时间', trigger: 'blur' },
                ],
                applyTime:[
                  { required: true, message: '请选择活动截止时间', trigger: 'blur' },
                ],
                holdCompany:[
                  { required: true, message: '请选择活动举办单位', trigger: 'blur' },
                ],
                participantNum:[
                  { required: true, message: '请选择参会人数', trigger: 'blur' },
                ],
                picId:[
                     { required: true, message: '请上传图片', trigger: 'blur' },
                ],
                content: [
                  { required: true, message: '请输入荣誉内容', trigger: 'blur' },
                ],
       },
    };
  },
  created() {
    this.setBreadItems();
    this.getActivitySort();
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    //添加面包屑
    setBreadItems() {
      this.breadItems = {
        '智慧党建': "/partyBuild",
        '党群活动': "/partyBuild/partyGroup",
        '创建活动': "/partyBuild/partyGroup/addActivity",
      };
    },
     //获取活动分类
    getActivitySort() {
      let obj = {
    name:'党群活动'
  }
      getSortTree(obj)
        .then((res) => {
          let data = res.data.data[0].children;
          let arr = [];
          data.map(i => {
            arr.push({value:i.id,label:i.name})
          })
          this.activityOptions = arr; 
      
        })
        .catch((err) => {});
    },
    //图片上传
     handleAvatarSuccess(res, file) {
       debugger
       let str = res.data.id;
        this.form.picId += (str + ',');
      },
     handleRemove(file, fileList) {
       let str = file.response.data.id;
       let reg = new RegExp((str+','));
       this.form.picId = this.form.picId.replace(reg,'')
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
   
    //保存
    addSubmit(formName) {
      debugger
      this.form.activityTime = this.form.date[0];
      this.form.endTime = this.form.date[1];
      console.log(this.form)
      this.$refs[formName].validate((valid) => {
        debugger
        if (valid) {
              newAddItem(this.form).then(res => {
              this.$message('您已提交成功')
              }).catch(err => {

              })
        }
                })
    },
    //选择会议室
    goMeetingRoom(){
      this.$router.push('/partyBuild/partyGroup/reservate')
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
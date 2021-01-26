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
        <div class='title-box'>
            <div class="rectangle"></div>
            <div class="TTtitle">发布通报</div>
        </div>
<el-form ref="form" :model="form" label-width="80px" :rules="rules">
  <el-form-item label="通报标题" prop="title">
    <el-input v-model="form.title" style='width:400px'></el-input>
  </el-form-item>
  <el-form-item label="通报分类" prop="menuId">
      <el-select v-model="form.menuId" placeholder="请选择">
            <el-option
              v-for="item in styleOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>              
  </el-form-item>
  
    <el-form-item label="附件" prop="picId">
         <el-upload
            class="upload"
            action
            :show-file-list="false"
            :auto-upload="false"
            :on-change="changeUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
    </el-form-item>
    <el-form-item label="内容" prop="content" style="margin-bottom: 24px">
          <Editor v-model="form.content" />
        </el-form-item>
  </el-form>
  <div class="button-box">
    <!-- <el-button @click="close" size="mini">取 消</el-button> -->
    <el-button type="primary" @click="addSubmit('form')" size="mini">确 定</el-button>
  </div>
   <el-dialog title="图片剪裁" :visible.sync="cropperVisible" width="400px">
      <Cropper
        :fileN="fileN"
        @closeCropper="closeCropper"
        @refreshData="refreshData"
        :optionImage="optionImage"
      ></Cropper>
    </el-dialog>
    </div>
</div>
</template>

<script>
import Breadcrumb from "@/components/breadcrumb";
import Editor from "@/components/editor";
import Cropper from "@/components/cropper";
import { getSortTree,newAddNews } from "@/api/news";
export default {
    name:'addHonor',
      components: {
    Breadcrumb,
    Editor,
    Cropper,
  },
    data(){
        return{
          breadItems:{},
            form:{
              title: "",
              picId: "",
              menuId: "",
              content: "",
            },
            styleOptions:[],
            imageUrl: "",
      cropperVisible: false, //截图框弹窗
      fileN: "", //上传的图片name需要自己保存再进行裁剪
      optionImage: "",
           rules:{
               title: [
                  { required: true, message: '请输入廉政标题', trigger: 'blur' },
                ],
                menuId:[
                  { required: true, message: '请选择廉政分类', trigger: 'blur' },
                ],

                picId:[
                     { required: true, message: '请上传图片', trigger: 'blur' },
                ],
                content: [
                  { required: true, message: '请输入廉政内容', trigger: 'blur' },
                ],
       },
        }
    },
    created(){
      this.setBreadItems();
      this.getStyleSort();
    },
     methods: {
        goBack() {
      this.$router.go(-1);
    },
    //添加面包屑
    setBreadItems() {
      this.breadItems = {
        '智慧党建': "/partyBuild",
        '党风廉政': "/partyBuild/partyStyle",
        '发布通报': "/partyBuild/partyStyle/addStyle",
      };
    },
       //获取分类
      getStyleSort(){
        let obj = {
    name:'党风廉政'
  }
      getSortTree(obj)
        .then((res) => {
          let data = res.data.data[0].children;
          let arr = [];
          data.map(i => {
            arr.push({value:i.id,label:i.name})
          })
          this.styleOptions = arr; 
      
        })
        .catch((err) => {});
      },
      //上传图片	显示裁剪框
    changeUpload(file, fileList) {
      this.fileN = file.name;
      if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(file.raw.name)) {
        alert("图片类型必须是.gif,jpeg,jpg,png,bmp中的一种");
        return false;
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error("上传文件大小不能超过 5MB!");
        return false;
      }
      //URL.createObjectURL的参数只能是blob或者file类型
      //第一种方法用FileReader，URL.createObjectURL接收blob类型
      let reader = new FileReader();
      reader.onload = (e) => {
        let data;
        if (typeof e.target.result === "object") {
          // 把Array Buffer转化为blob 如果是base64不需要
          data = window.URL.createObjectURL(new Blob([e.target.result]));
        } else {
          data = e.target.result;
        }
        this.optionImage = data;
        //this.option.img = data
      };
      // 转化为base64
      this.cropperVisible = true;
      reader.readAsArrayBuffer(file.raw);

      //第二种方法，URL.createObjectURL接收file类型
      //this.$nextTick(() => {
      this.optionImage = URL.createObjectURL(file.raw);
      //this.option.img = URL.createObjectURL(file.raw)
      this.cropperVisible = true;
      //})
    },
    //关闭裁剪框
    closeCropper(data) {
      this.cropperVisible = data;
    },
    //获取裁剪弹框的信息
    refreshData(img, id) {
      this.imageUrl = img;
      this.form.picId = id;
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
    }
}
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
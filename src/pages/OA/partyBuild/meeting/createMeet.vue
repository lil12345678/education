<template>
  <div class="container-box">
    <div class="title-box">
      <div class="rectangle"></div>
      <div class="TTtitle">创建会议</div>
    </div>
    <el-form ref="form" :model="form" label-width="80px" :rules="rules">
      <el-form-item label="会议名称" prop="baseInfo">
        <el-input v-model="form.baseInfo.title" style="width: 400px"></el-input>
      </el-form-item>
      <el-form-item label="会议类型" prop="menuId">
        <el-select v-model="form.menuId" placeholder="请选择">
          <el-option
            v-for="item in typeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="会议图片" prop="picId">
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
      <el-form-item label="会议室" prop="meetingRoom">
        <el-input v-model="form.meetingRoom" style="width: 400px"></el-input>
        <el-button class="button-new-tag" size="small" @click="goMeetingRoom"
          >选择会议室</el-button
        >
      </el-form-item>
      <el-form-item label="主持人" prop="compereByName">
       <el-tag
          :key="tag"
          v-for="tag in Tags1"
          closable
          :disable-transitions="false"
          @close="handleClose(tag)"
        >
          {{ tag }}
        </el-tag>
        <el-button class="button-new-tag" size="small" @click="showDialog"
          >+ New Tag</el-button
        >
      </el-form-item>
      <el-form-item label="记录人" prop="recorderByName">
        <el-tag
          :key="tag"
          v-for="tag in Tags2"
          closable
          :disable-transitions="false"
          @close="handleClose(tag)"
        >
          {{ tag }}
        </el-tag>
        <el-button class="button-new-tag" size="small" @click="showDialog"
          >+ New Tag</el-button
        >
      </el-form-item>
      <el-form-item label="参会对象" prop="participantByName">
        <el-tag
          :key="tag"
          v-for="tag in Tags3"
          closable
          :disable-transitions="false"
          @close="handleClose(tag)"
        >
          {{ tag }}
        </el-tag>
        <el-button class="button-new-tag" size="small" @click="showDialog"
          >+ New Tag</el-button
        >
      </el-form-item>

      <el-form-item label="内容" prop="content" style="margin-bottom: 24px">
        <Editor v-model="form.content" />
      </el-form-item>
      <el-form-item label="附件">
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
    </el-form>
    <div class="button-box">
      <el-button type="primary" @click="addSubmit" size="mini">确 定</el-button>
    </div>

    <!-- 选择人员 -->
    <el-dialog
      title="选择人员"
      width="40%"
      :visible.sync="selectDialogVisible"
      :before-close="selectClose"
    >
     <el-tree
   class="tree"
  :data="treeData"
  show-checkbox
  node-key="id"
  ref="tree"
  highlight-current
  :props="defaultProps"
  accordion>
</el-tree>
          <div class=" line"></div>                                                                 
  <div class="button-box">
    <el-button type="primary" @click="selectSubmit" size="mini">确 定</el-button>
  </div>
    </el-dialog>

    <el-dialog title="图片剪裁" :visible.sync="cropperVisible" width="400px">
      <Cropper
        :fileN="fileN"
        @closeCropper="closeCropper"
        @refreshData="refreshData"
        :optionImage="optionImage"
      ></Cropper>
    </el-dialog>
  </div>
</template>

<script>
import Editor from "@/components/editor";
import Breadcrumb from "@/components/breadcrumb";
import Cropper from "@/components/cropper";
import { getSortTree, newAddItem } from "@/api/event";
import SelectPer from "./select";
export default {
  name: "addMeeting",
  components: {
    SelectPer,
    Breadcrumb,
    Editor,
    Cropper,
  },
  data() {
    return {
      form: {
        baseInfo:{
          title:'',
        },
        menuId:'',
        meetingRoom:'',
        compereByName:'',
        recorderByName:'',
        participantByName:'',
        picId:'',
        content:'',
      },
      typeOptions: [],
      imageUrl: "",
      cropperVisible: false, //截图框弹窗
      fileN: "", //上传的图片name需要自己保存再进行裁剪
      optionImage: "",
      Tags1:[],
      Tags2:[],
      Tags3:[],
      selectDialogVisible: false,
      fileList: [],
      dynamicTags: [],
      rules: {
        baseInfo: [{ required: true, message: "请输入会议名称", trigger: "blur" }],
        menuId: [
          { required: true, message: "请选择会议分类", trigger: "blur" },
        ],
        meetingRoom:[
           { required: true, message: "请选择会议室", trigger: "blur" },
        ],
        compereByName:[
           { required: true, message: "请添加主持人", trigger: "blur" },
        ],
        recorderByName: [
          { required: true, message: "请添加记录人", trigger: "blur" },
        ],
        participantByName:[
          { required: true, message: "请添加参会人", trigger: "blur" },
        ],
        picId: [{ required: true, message: "请上传图片", trigger: "blur" }],
        content: [
          { required: true, message: "请输入内容", trigger: "blur" },
        ],
      },
      treeData:[],
       defaultProps: {
          children: 'children',
          label: 'label'
        },
    };
  },
  created() {
    this.getMeetingSort();
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    //添加面包屑
    setBreadItems() {
      this.breadItems = {
        '智慧党建': "/partyBuild",
        '三会一课': "/partyBuild/meeting",
        '创建会议': "/partyBuild/meeting/createMeet",
      };
    },
    //获取活动分类
    getMeetingSort() {
      let obj = {
        name: "三会一课",
      };
      getSortTree(obj)
        .then((res) => {
          let data = res.data.data[0].children;
          let arr = [];
          data.map((i) => {
            arr.push({ value: i.id, label: i.name });
          });
          this.typeOptions = arr;
        })
        .catch((err) => {});
    },
    //获取人员树
    
    //多个附件上传
    handleAvatarSuccess(res, file) {
      debugger;
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
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
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
    //保存
    addSubmit(formName) {
      debugger;
      this.form.activityTime = this.form.date[0];
      this.form.endTime = this.form.date[1];
      console.log(this.form);
      this.$refs[formName].validate((valid) => {
        debugger;
        if (valid) {
          newAddItem(this.form)
            .then((res) => {
              this.$message("您已提交成功");
            })
            .catch((err) => {});
        }
      });
    },
    //选择人员
    showDialog(){
  this.selectDialogVisible = true;
    },
    //选择会议室
    goMeetingRoom() {
      this.$router.push("/partyBuild/meeting/reservate");
    },
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },
selectClose(){
this.selectDialogVisible = false;
},
    selectSubmit(){
      this.selectDialogVisible = false;
    }
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
.box{
  display: flex;
  flex-direction: row;
}
.left{
  width: 214px;
}
.right{
  flex: 1;
}

.tree /deep/.el-tree-node__children{
    position: absolute;
    top:0;
    left:30%;
}
.line{
  height:60%;
  width:1px;
  border-right: 1px solid #e4e4e5;
  position: absolute;
  top:30%;
  left:30%;

}
</style>
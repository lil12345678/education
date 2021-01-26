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
        <div class="TTtitle">发布新闻</div>
      </div>
      <el-form ref="form" :model="form" label-width="80px" :rules="rules">
        <el-form-item label="新闻标题" prop="title">
          <el-input v-model="form.title" style="width: 400px"></el-input>
        </el-form-item>
        <el-form-item label="封面图片" prop="picId" ref="image">
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
        <el-form-item label="">
          <el-checkbox v-model="form.top">是否置顶</el-checkbox>
          <el-checkbox v-model="form.link">是否采用外部链接</el-checkbox>
        </el-form-item>
        <el-form-item label="内容" prop="content" style="margin-bottom: 24px">
          <Editor v-model="form.content" />
        </el-form-item>
        <el-form-item
          :rules="[
            { required: form.link, message: '请输入外部链接', trigger: 'blur' },
            {
              pattern: /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/,
              message: '请输入正确格式的链接地址',
            },
          ]"
          style="margin-top: 24px"
          label="链接地址"
          v-show="form.link == true"
          prop="linkAddress"
        >
          <el-input v-model="form.linkAddress" style="width: 400px"></el-input>
        </el-form-item>
      </el-form>
      <div class="button-box">
        <el-button type="primary" @click="submit('form')" size="mini"
          >发布</el-button
        >
      </div>
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
</template>

<script>
import { quillEditor } from "vue-quill-editor";
import Breadcrumb from "@/components/breadcrumb";
import Editor from "@/components/editor";
import { newAddNews } from "@/api/news";
import Cropper from "@/components/cropper";
import axios from "@/router/axios";
export default {
  name: "addNews",
  components: {
    Breadcrumb,
    Editor,
    Cropper,
  },
  data() {
    return {
      breadItems: {}, //面包屑组件传入的值
      form: {
        title: "",
        picId: "",
        top: false,
        link: false,
        content: "",
        linkAddress: "",
      },
      imageUrl: "",
      outputType: "jpg || png",
      outputSize: 1,
      typeOptions: [],
      content: null,
      editorOption: {},
      rules: {
        title: [{ required: true, message: "请输入新闻标题", trigger: "blur" }],
        picId: [{ required: true, message: "请上传图片", trigger: "blur" }],
        content: [
          { required: true, message: "请输入新闻内容", trigger: "blur" },
        ],
      },
      cropperVisible: false, //截图框弹窗
      fileN: "", //上传的图片name需要自己保存再进行裁剪
      optionImage: "",
    };
  },
  created() {
    this.setBreadItems();
    this.getContent();
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    //添加面包屑
    setBreadItems() {
      this.breadItems = {
        智慧党建: "/partyBuild",
        党建新闻: "/partyBuild/news",
        新闻管理: "/partyBuild/news/newsManage",
        发布新闻: "/partyBuild/news/newAdd",
      };
    },
    //获取详情内容
    getContent() {},
    //文本编辑器
    onEditorBlur() {
      //失去焦点事件
    },
    onEditorFocus() {
      //获得焦点事件
    },
    onEditorChange() {
      //内容改变事件
    },
    //保存
    submit(formName) {
      debugger;
      this.$refs[formName].validate((valid) => {
        debugger;
        if (valid) {
          debugger;
          console.log(this.form);
          if (this.form.top == true) {
            this.form.top = 1;
          } else if (this.form.top == false) {
            this.form.top = 0;
          }
          if (this.form.link == true) {
            this.form.link = 1;
          } else if (this.form.link == false) {
            this.form.link = 0;
          }
          newAddNews(this.form)
            .then((res) => {
              this.$message("您已提交成功");
            })
            .catch((err) => {});
        }
      });
    },
    //上传图片	显示裁剪框
    changeUpload(file, fileList) {
      debugger;
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
        debugger;
        this.optionImage = data;
        //this.option.img = data
      };
      // 转化为base64
      this.cropperVisible = true;
      reader.readAsArrayBuffer(file.raw);

      //第二种方法，URL.createObjectURL接收file类型
      //this.$nextTick(() => {
      debugger;
      this.optionImage = URL.createObjectURL(file.raw);
      //this.option.img = URL.createObjectURL(file.raw)
      this.cropperVisible = true;
      //})
    },
    //     //点击剪裁弹框的确定按钮
    // cropperFinish(data) {
    // 	this.$refs.cropper.getCropBlob((data) => {
    //   //将blob转换为file
    //       let file = new File([data], this.fileN, { type: 'image/png', lastModified: Date.now() });
    //       file.uid = Date.now();
    //       var form = new FormData();
    //       form.append("file", file, this.fileN);

    //         axios({
    // 		   method: 'POST',
    // 		   url: 'http://192.168.8.106:9030/api/articleInfo/uploadFile',
    // 		   data: form
    // 	    }).then((res) => {

    //          this.imageUrl = res.data.data.url;
    //        this.form.picId = res.data.data.id;
    //       this.$message.success("上传成功");
    //       this.cropperVisible = false;
    //       }).catch(err => {
    //         debugger
    //       })
    // 	 })
    // },
    //关闭裁剪框
    closeCropper(data) {
      this.cropperVisible = data;
    },
    //获取裁剪弹框的信息
    refreshData(img, id) {
      debugger;
      this.imageUrl = img;
      this.form.picId = id;
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
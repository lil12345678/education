<template>
  <div>
    <div class="cropper-content">
      <div style="width: 100%; height: 300px">
        <vue-cropper
          ref="cropper"
          :img="option.img"
          :output-size="option.size"
          :output-type="option.outputType"
          :info="true"
          :full="option.full"
          :fixed="option.fixed"
          :fixed-number="option.fixedNumber"
          :can-move="option.canMove"
          :can-move-box="option.canMoveBox"
          :fixed-box="option.fixedBox"
          :original="option.original"
          :auto-crop="option.autoCrop"
          :auto-crop-width="option.autoCropWidth"
          :auto-crop-height="option.autoCropHeight"
          :center-box="option.centerBox"
          @real-time="realTime"
          :high="option.high"
          @img-load="imgLoad"
          mode="cover"
          :max-img-size="option.max"
          @crop-moving="cropMoving"
        ></vue-cropper>
      </div>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="cropperFinish">确认</el-button>
    </div>
  </div>
</template>

<script>
import { VueCropper } from "vue-cropper";
import axios from "@/router/axios";
import {picUpload} from "@/api/news";
export default {
  name: "cropper",
  props: ["fileN", "optionImage"],
  components: {
    VueCropper,
  },
  data() {
    return {
      imageUrl: "",
      picId: "",
      option: {
        img: "",
        info: true, // 裁剪框的大小信息
        outputSize: 1, // 裁剪生成图片的质量
        full: true, // 输出原图比例截图 props名full   *
        outputType: "png", // 裁剪生成图片的格式
        canMove: true, // 能否拖动图片
        original: false, // 上传图片是否显示原始宽高
        canMoveBox: true, // 能否拖动截图框
        canScale: false, // 图片是否允许滚轮缩放
        autoCrop: true, // 是否默认生成截图框
        autoCropWidth: 360, // 默认生成截图框宽度       *
        autoCropHeight: 300, // 默认生成截图框高度      *
        fixedBox: false, // 截图框固定大小
        fixed: false, // 是否开启截图框宽高固定比例
        fixedNumber: [1, 1], // 截图框的宽高比例
        original: false, // 上传图片按照原始比例渲染
        centerBox: true, // 截图框是否被限制在图片里面
        infoTrue: true, // true 为展示真实
      },
      cropperVisible: false, //截图框弹窗
      //fileN:'',//上传的图片name需要自己保存再进行裁剪
    };
  },
  created() {
    this.init();
  },
  watch: {
    fileN() {
      this.init();
    },
  },
  methods: {
    init() {
      this.$nextTick(() => {
        this.option.img = this.optionImage;
      });
    },
    //点击剪裁弹框的确定按钮
    cropperFinish(data) {
      this.$refs.cropper.getCropBlob((data) => {
        //将blob转换为file
        let file = new File([data], this.fileN, {
          type: "image/png",
          lastModified: Date.now(),
        });
        file.uid = Date.now();
        var form = new FormData();
        form.append("file", file, this.fileN);
        // axios({
        //   method: "POST",
        //   url: "http://192.168.8.106:9030/api/articleInfo/uploadFile",
        //   data: form,
        // })
         picUpload(form) .then((res) => {
            this.imageUrl = res.data.data.url;
            this.picId = res.data.data.id;
            this.$emit("refreshData", this.imageUrl, this.picId);
            this.$message.success("上传成功");
            this.$emit("closeCropper", false);
          })
          .catch((err) => {});
      });
    },
    close(){
       this.$emit("closeCropper", false);
    },
    realTime() {},
    imgLoad() {},
    cropMoving() {},
  },
};
</script>
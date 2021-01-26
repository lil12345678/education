<template>
  <div>
    <div
      style="
        width: 100%;
        height: 1px;
        background-color: #ccc;
        margin-bottom: 24px;
      "
    ></div>
    <el-form :model="form" label-width="80px">
          <el-form-item label="职务名称" label-width="80px" style="width: 200">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="职务名称" label-width="80px" style="width: 200">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="职务描述">
            <el-input type="textarea" v-model="form.desc"></el-input>
          </el-form-item>
    </el-form>
    <div class="button-box">
      <el-button type="primary" @click="addSubmit" size="mini">确 定</el-button>
    </div>
  </div>
</template>
<script>
export default {
  name: "positionAdd",
  data() {
    return {
      form: {},
    };
  },
  methods: {
    //新增提交表单
    addSubmit() {
      this.$emit("closePositionDio", false);
    },
    //关闭弹窗
    close() {
      this.$emit("closePositionDio", false);
    },
  },
};
</script>
<style lang="scss" scoped>
.button-box{
     display: flex;
      justify-content: center;
      margin-top: 20px;
}
</style>
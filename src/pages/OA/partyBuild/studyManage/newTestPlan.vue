<template>
    <div class="container-box">
        <div class='title-box'>
            <div class="rectangle"></div>
            <div class="TTtitle">组合试题方案</div>
        </div>
<el-form ref="form" :model="form" label-width="80px" >
  <el-form-item label="方案名称">
    <el-input v-model="form.name" style='width:400px'></el-input>
  </el-form-item>
   <el-form-item label="考试时长">
                <el-select v-model="form.hour" placeholder="请选择" >
                      <el-option
                        v-for="item in typeOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                    <el-select v-model="form.munite" placeholder="请选择" >
                      <el-option
                        v-for="item in typeOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      ></el-option>
                    </el-select>
            </el-form-item>
              <el-form-item label="考试分类">
     <el-select v-model="form.dsType" placeholder="请选择" >
                      <el-option
                        v-for="item in typeOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      ></el-option>
                    </el-select>
  </el-form-item>
  <el-form-item label="考试总分">
    <el-input v-model="form.name" style='width:400px'></el-input>
  </el-form-item>
  <el-form-item label="及格分数">
    <el-input v-model="form.name" style='width:400px'></el-input>
  </el-form-item>
  <el-form-item label="试题来源">
      <el-radio-group v-model="form.radio">
    <el-radio :label="3">备选项</el-radio>
    <el-radio :label="6">备选项</el-radio>
    <el-radio :label="9">备选项</el-radio>
  </el-radio-group>
  </el-form-item>
    <el-form-item label="试题类型">
    <el-checkbox label="复选框 A"></el-checkbox>
    <el-checkbox label="复选框 B"></el-checkbox>
    <el-checkbox label="复选框 C"></el-checkbox>
    </el-form-item>
    <el-form-item label="试题数量">
        <span>单选题</span><el-input v-model="form.name" style='width:200px'></el-input>
        <span>多选题</span><el-input v-model="form.name" style='width:200px'></el-input>
        <span>判断题</span><el-input v-model="form.name" style='width:200px'></el-input>
    </el-form-item>
  </el-form>
  <div class="button-box">
    <!-- <el-button @click="close" size="mini">取 消</el-button> -->
    <el-button type="primary" @click="createQuestion" size="mini">生成试题</el-button>
  </div>
  <!-- 生成试题：如果错误显示无满足要求的提示弹框，否则返回配置好的列表弹框 -->
   <el-dialog
  v-if="history == false"
  title="自动试题组合方案"
  width="40%"
  :visible.sync="HistoryVisible"
  :before-close="handleClose"> 
  <span>根据您的配置，没有满足要求的组合，请重新修改您的配置</span>
<el-button type="primary" @click="HistoryVisible = false">确定</el-button>
</el-dialog>

<el-dialog
v-if="history == true"
  title="自动试题组合方案"
  width="40%"
  :visible.sync="HistoryVisible"
  :before-close="handleClose"> 
  <History ref="History" @closeHistory="closeHistory"></History>
</el-dialog>
    </div>
</template>

<script>
export default {
    name:'addHonor',
    data(){
        return{
            form:{},
            typeOptions:[],
              content:null,
                editorOption:{},
            correctDio:false,
            erroeDio:false,
        }
    },

     methods: {
    //生成试题：如果错误显示无满足要求的提示弹框，否则返回配置好的列表弹框
    createQuestion(){
       if(true){
           this.correctDio = true
       }else{
           this.erroeDio = true;
       }
    }
     }
}
</script>

<style lang="scss" scoped>
.container-box{
    background-color: #fff;
    margin:24px 24px 0 24px;
    padding-bottom: 24px;
}
.rectangle{
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
  .TTtitle{ 
        display: inline-block;
        margin: 24px 0 0 24px;
        font-size: 16px;
        font-weight: 400;
        color: #333333;
  }
  .el-form{
   margin:24px 0 0 0;
  }
  .upload /deep/ .el-upload{
      width: 80px;
      height:80px;
      line-height: 80px;
  }
  .button-box{
     display: flex;
      justify-content: center;
      margin-top: 24px ;
}
</style>
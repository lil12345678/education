<template>
    <div>
     <div style="width:100%;height:1px;background-color:#ccc;margin-bottom:24px"></div>
   <el-input class="addSearch search" style="height:24px" v-model="addSearchInput" placeholder="请输入内容" ></el-input>
   <div class="searcPerInfo">

       <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="date"
        label="日期"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址">
      </el-table-column>
    </el-table>
   </div>
  
    <div class="testNumber">
        <span>设置达标分数</span>
    <el-input v-model="testNumber" style="width:200px"></el-input>
  </div>                                                                                                                      
  <div class="button-box">
    <el-button @click="close" size="mini">继续选题</el-button>
    <el-button type="primary" @click="addSubmit" size="mini">生成考试</el-button>
  </div>
<!-- </el-dialog> -->
</div>
</template>
<script>
export default {
    name:'',
    data(){
        return{
            checked:true,//党员勾选
            formInline:{},
        addSearchInput:'',
        typeOptions:[],
        tableData:[
          {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }
        ],
        testNumber:''
        }
    },
    methods:{
    //新增提交表单
    addSubmit(){
 this.$emit('closestatistics',false)
    },
    //关闭弹窗
    close(){
        this.$emit('closestatistics',false)
    },
    //用户搜索新增党员基础信息显示表格
     setCurrent(row) {
        this.$refs.singleTable.setCurrentRow(row);
      },
      handleCurrentChange(val) {
        this.currentRow = val;
      }
    }
}
</script>
<style lang="scss" scoped>
.addSearch /deep/ .el-input__inner{
    width: 216px;
    border-radius: 4px;
    margin: 0 0 24px 0;
}
.searcPerInfo{
   //height:100px;
  // margin: 24px 0;
  .avatar{
      float: left;
  }
    .name, .sex, .address, .num{
        float:left;
      margin:6px 0 0 66px ;
  }

}
.check{
  margin-bottom: 24px;
}
.el-form-item{
  margin-bottom: 16px;
}
.el-row{
  margin-bottom: 0;
}
.button-box{
     display: flex;
      justify-content: center;
      margin-top: 20px;
}
.el-table{
  margin-top:24px;
}
.testNumber{
    margin: 24px 0;
}
</style>
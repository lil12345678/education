<template>
    <div>
          <el-input
    size="mini" class="top-search"
    placeholder="请输入内容"
    suffix-icon="el-icon-search" v-model="nameSearch" ></el-input>
        <div class="table-box">
            <p>历史试题组合方案</p>
            <el-table
    :data="tableData"
    border
    style="width: 100%">
    <el-table-column
      fixed
      prop="date"
      label="日期"
      width="150">
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名"
      width="120">
    </el-table-column>
    <el-table-column
      prop="province"
      label="省份"
      width="120">
    </el-table-column>
   
    <el-table-column
      fixed="right"
      label="操作"
      width="100">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
        <el-button type="text" size="small">生成试题</el-button>
      </template>
    </el-table-column>
  </el-table>
 <div class="button-box">
          <el-button type="primary"  @click="close">取消</el-button>
          <el-button  @click="createQ">生成试题</el-button>
  
      </div> 
        </div>
    </div>
</template>

<script>
export default {
    name:'historyPlan',
    data(){
        return{
            nameSearch:'',
             tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-04',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1517 弄',
          zip: 200333
        },],
        }
    },
    methods:{
        //生成试题
        createQ(){
this.$emit('closeHistory',false)
        },
        //关闭弹窗
    close(){
        this.$emit('closeHistory',false)
    },
    }
}
</script>

<style lang="scss" scoped>
.top-search{
  width:200px;
}
.table-box{
    margin-top:24px
}
.el-table{
    margin-top:24px
}
  .button-box{
     display: flex;
      justify-content: center;
      margin-top: 24px ;
}
</style>


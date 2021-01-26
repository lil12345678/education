<template>
    <div class="container-box">
        <div class="title">考试题目详情</div>
        <div style="float:right;margin:-24px 24px 0 0">
         <el-select v-model="questionType" placeholder="请选择" >
            <el-option
              v-for="item in typeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <el-button size="mini">启用</el-button>
        </div>
            <el-table
        class="table"
            ref="multipleTable"
            :data="tableData"
            tooltip-effect="dark"
            style="width: 100%;margin-top:24px"
            :header-cell-style="{background:'#f8f8f9'}"
      :row-style="{height:'40px'}"
      :cell-style="{padding:'0px'}">
            <el-table-column
            label="题目" align="center"
            width="120">
            <template slot-scope="scope">{{ scope.row.date }}</template>
            </el-table-column>
            <el-table-column
            prop="name" align="center"
            label="题型"
            width="120">
            </el-table-column>
            <el-table-column
            prop="address" align="center"
            label="地址"
            show-overflow-tooltip>
            </el-table-column>
            <el-table-column  fixed="right" label="操作">
      <template slot-scope="scope">
         <el-button @click="detailClick(scope.row)" type="text" size="small" >详情</el-button>
        <el-button @click="changeClick(scope.row)" type="text" size="small">替换</el-button>
      </template>
    </el-table-column>
        </el-table>
  <div class="page">
   <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>

    <!-- 题目详情 -->
       <el-dialog
  title="题目详情"
  width="40%"
  :visible.sync="QdetailVisible"
  :before-close="handleClose"> 
  <Questiondetail ref="Questiondetail" @closeQdetail="closeQdetail"></Questiondetail>
</el-dialog>
    </div>
</template>

<script>
import Questiondetail from './testQdetail'
export default {
    name:'testDetail',
    components:{
      Questiondetail,
    },
    data(){
        return{
          questionType:'',
          QdetailVisible:false,
    typeOptions:[],
           tableData: [{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, ],
         total: 0, // 总页数
      currentPage: 1, // 当前页数
      pageSize: 20, // 每页显示多少条,
        }
    },
    methods:{
      detailClick(){
        this.QdetailVisible = true;
      },
      //替换考试题目
      changeClick(){
        this.$router.push('/partyBuild/studyManage/changeTestQ')
      },
  //改变页码
    handleSizeChange(size) {
      this.pageSize = size;
      this.getList();
    },
    //改变当前页面
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      this.getList();
    },
      //关闭新增弹窗
    handleClose(){
this.QdetailVisible = false
    },
  //关闭新增弹窗
    closeQdetail(f){
      this.QdetailVisible = f;
    },
    }
}
</script>

<style lang="scss" scoped>
.container-box{
    background-color: #fff;
  margin: 24px 24px 0 24px;
}
.title{
    font-size: 20px;
    font-weight: bold;
    padding:24px 0 0 24px;
}
.table{
margin-top:24px;
}
.page{
    width:100%;
    height:80px;
    background-color: #fff;
}
.el-pagination{
    float:right;
  
      margin:24px 24px 0 0;
}
</style>
<template>
  <div>
   <el-input class="search" style="height:24px" v-model="searchInput" placeholder="请输入内容" ></el-input>
      <div class="tableBtn-box">
        <el-button class="btn1" size="mini" type="primary" @click="addDialog">新增</el-button>
        <el-button class="btn1" size="mini" type="primary" @click="del">删除</el-button>
        <el-button class="btn2" size="mini" type="primary" @click="leadIn">导入</el-button>
        <el-button class="btn1" size="mini" type="primary" @click="leadOut">导出</el-button>
      </div>
        <el-table
        class="table"
            ref="multipleTable"
            :data="tableData"
            tooltip-effect="dark"
            style="width: 100%;margin-top:24px"
            @selection-change="handleSelectionChange"
            :header-cell-style="{background:'#f8f8f9'}"
      :row-style="{height:'40px'}"
      :cell-style="{padding:'0px'}">
            <el-table-column
            type="selection" align="center"
            width="55">
            </el-table-column>
            <el-table-column
            label="其他人员信息" align="center"
            width="120">
            <template slot-scope="scope">{{ scope.row.date }}</template>
            </el-table-column>
            <el-table-column
            prop="name" align="center"
            label="姓名"
            width="120">
            </el-table-column>
            <el-table-column
            prop="address" align="center"
            label="地址"
            show-overflow-tooltip>
            </el-table-column>
            <el-table-column  fixed="right" label="操作">
      <template slot-scope="scope">
        <el-button @click="editClick(scope.row)" type="text" size="small">编辑</el-button>
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
     <el-dialog
  title="新增其他成员"
  width="40%"
  :visible.sync="addDialogVisible"
  :before-close="handleClose"> 
  <OtherNewAdd ref="newAddDio" @closeAddDio="closeAddDio"></OtherNewAdd>
</el-dialog>
  </div>
</template>

<script>
import OtherNewAdd from './otherNewAdd'
export default {
  name: "partyPer",
  components: {
    OtherNewAdd,
  },
  data() {
    return {
        searchInput:'',
        activeName:"first",
        showPartyBtn:true,
        total: 0, // 总页数
      currentPage: 1, // 当前页数
      pageSize: 20, // 每页显示多少条,
        tableData: [{
          date: '2016-05-03',
          name: '其他人员',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-02',
          name: '其他人员',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '其他人员',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '其他人员',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-08',
          name: '其他人员',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-06',
          name: '其他人员',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }],
        multipleSelection: [],
        addDialogVisible:false,
    };
  },
  methods:{
      //获取表格数据
      getList(){

      },
      //党员信息
      showParty(){
          this.showPartyBtn = true
      },
      //其他成员信息页面
      showOther(){
          this.showPartyBtn = false;
      },
 //信息字段管理页面跳转
      infoMang(){
        this.$router.push('/partyBuild/partyInfo/field')
      },
      //新增按钮出现弹框
    addDialog(){
      this.addDialogVisible = true;
    },
     //删除
      del(){},
      //导入
    leadIn(){},
    //导出
    leadOut(){},
      //选择的项
      handleSelectionChange(val) {
        this.multipleSelection = val;
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
    //
    handleClick(){},
    //关闭新增弹窗
    handleClose(){
this.addDialogVisible = false
    },
    //关闭新增弹窗
    closeAddDio(f){
      this.addDialogVisible = f;
    },
  }
};
</script>
<style lang="scss" scoped>

.search /deep/ .el-input__inner{
  width: 216px;
  height: 24px ;
  border-radius: 4px;
   margin: 24px 0 24px 24px;
}
.tableBtn-box {
    display: inline-block;
  float: right;
  margin: -24px 24px 0 0;
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
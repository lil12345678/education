<template>
  <div >
   <el-input class="search" style="height:24px" v-model="searchInput" placeholder="请输入内容" ></el-input>
      <div class="tableBtn-box">
        <!--配置好权限才能用这个 <el-button v-if="this.permissionChange" class="btn1" size="mini" type="primary" @click="relChange">关系转移记录</el-button>
        <el-button v-if="this.permissionDict" class="btn2" size="mini" type="primary" @click="infoMang">信息字段管理</el-button>
        <el-button v-if="this.permissionAdd" class="btn1" size="mini" type="primary" @click="addDialog">新增</el-button>
        <el-button v-if="this.permissionDel" class="btn1" size="mini" type="primary" @click="del">删除</el-button>
        <el-button v-if="this.permissionIn" class="btn2" size="mini" type="primary" @click="leadIn">导入</el-button>
        <el-button v-if="this.permissionOut" class="btn1" size="mini" type="primary" @click="leadOut">导出</el-button> -->
         <el-button  class="btn1" size="mini" type="primary" @click="relChange">关系转移记录</el-button>
        <el-button  class="btn2" size="mini" type="primary" @click="infoMang">信息字段管理</el-button>
        <el-button  class="btn1" size="mini" type="primary" @click="addDialog">新增</el-button>
        <el-button  class="btn1" size="mini" type="primary" @click="del">删除</el-button>
        <el-button  class="btn2" size="mini" type="primary" @click="leadIn">导入</el-button>
        <el-button  class="btn1" size="mini" type="primary" @click="leadOut">导出</el-button>
      </div>
      <!-- 自定义表头，获取系统字段为默认表头，再根据用户新增字段是否显示为表头 -->

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
            label="姓名" align="center" prop="userName"
            width="120">
            <template slot-scope="scope">{{ scope.row.userName }}</template>
            </el-table-column>
            <el-table-column
            prop="statue" align="center"
            label="类别"
            width="120">
            <template slot-scope="scope">{{ scope.row.statue | statusFilter}}</template>
            </el-table-column>
            <el-table-column
            prop="gender" align="center"
            label="性别">
            <template slot-scope="scope">{{ scope.row.statue | sexFilter}}</template>
            </el-table-column>
               <el-table-column
            prop="nativePlace" align="center"
            label="籍贯"
            >
            </el-table-column>
            <el-table-column
            prop="birthday" align="center"
            label="出生年月"
            >
            </el-table-column>
            <el-table-column
            prop="identity" align="center"
            label="身份证号"
            >
            </el-table-column>
            <el-table-column  fixed="right" label="操作">
      <template slot-scope="scope">
         <el-button @click="regClick(scope.row)" type="text" size="small"  v-show="scope.row.statue == 3">转正</el-button>
        <el-button @click="editClick(scope.row)" type="text" size="small">编辑</el-button>
        <el-button @click="limitClick(scope.row)" type="text" size="small">权限</el-button>
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
  title="新增党员"
  width="40%"
  :visible.sync="addDialogVisible"
  :before-close="handleClose"> 
  <NewAdd ref="newAddDio" @closeAddDio="closeAddDio"></NewAdd>
</el-dialog>

<!-- 编辑党员 -->
    <el-dialog
  title="编辑党员"
  width="40%"
  :visible.sync="editDialogVisible"
  :before-close="editClose"> 
 
</el-dialog>
  </div>
</template>

<script>
import NewAdd from './newAdd';
import {getDetail} from "@/api/partyInfo"
export default {
  name: "partyPer",
  components: {
    NewAdd,
  },
  data() {
    return {
        searchInput:'',
        activeName:"first",
        showPartyBtn:true,
        total: 0, // 总页数
      currentPage: 1, // 当前页数
      pageSize: 20, // 每页显示多少条,
        tableData: [],
        multipleSelection: [],
        addDialogVisible:false,
        editDialogVisible:false,
//        birthday: "2019-01-01 00:00:00"
// gender: "0"
// identity: "111"
// nativePlace: "上海"
// oid: 9
// organizeName: "测试组织1"
// properties: []
// statue: "1"
// uid: 1002
// userName: "小团团"
        permissionAdd:false,
        permissionDel:false,
        permissionChange:false,
        permissionDict:false,
        permissionIn:false,
        permissionOut:false
    };
  },
  filters: {
    statusFilter(value) {
      const stateMap = {
        1: "党员",
        2: "入党积极分子",
        3: "预备党员"
      };
      return stateMap[value];
    },
    sexFilter(value) {
      const sex = {
        0:"女",
        1:"男"
      };
      return sex[value];
    }
  },
  created(){
      this.getPermissions();
      this.getList()
  },
  methods:{
          //页面初始先获取页面的删除、新增按钮等操作权限
  getPermissions(){
    let data = JSON.parse(sessionStorage.getItem('PERMISSION'))
    for(let i in data[0]){
      if(data[0][i].operationName == '新增'){
        this.permissionAdd = true;
      }else if(data[0][i].operationName == '删除'){
        this.permissionDel = true;
      }else if(data[0][i].operationName == '党员关系转移'){
        this.permissionChange = true;
      }else if(data[0][i].operationName == '信息字段管理'){
        this.permissionDict = true;
      }else if(data[0][i].operationName == '导入'){
        this.permissionDIn = true;
      }
      else if(data[0][i].operationName == '导出'){
        this.permissionOut = true;
      }
    }
  },
      //获取表格数据
      getList(params){
          getDetail(
        Object.assign(
          {
            pageNo: this.currentPage,
            pageSize: this.pageSize,
          },
          params
        )
      )
        .then((res) => {
          this.tableData = res.data.data.records;
          this.total = res.data.data.total;
          this.listLoading = false;
        })
        .catch((err) => {
          this.listLoading = false;
        });
      },
      //党员信息
      showParty(){
          this.showPartyBtn = true
      },
      //其他成员信息页面
      showOther(){
          this.showPartyBtn = false;
      },
      //打开关系转移页面
      relChange(){
        this.$router.push('/partyBuild/partyInfo/relChange')
      },
      //信息字段管理页面跳转
      infoMang(){
        this.$router.push('/partyBuild/partyInfo/field')
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
    //
    editClose(){},
    //新增按钮
    addDialog(){
      this.addDialogVisible = true;
    },
//关闭新增弹窗
    handleClose(){
this.addDialogVisible = false
    },
  //关闭新增弹窗
    closeAddDio(f){
      this.addDialogVisible = f;
    },
    //转正
regClick(){},
//编辑
editClick(){},
//权限
limitClick(){},
  }
};
</script>
<style lang="scss" scoped>
.search /deep/ .el-input__inner{
  width: 216px;
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
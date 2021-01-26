<template>
 <div >
     <div class="top">
            <i class="icon el-icon-location"></i>
            <Breadcrumb class="bread" :items="breadItems"></Breadcrumb>
        </div>
        <div class="table-box">
    <div class="field-title" style="height: 24px">党员关系转移</div>
    <div class="tableBtn-box">
        <el-button class="btn2" size="mini" type="primary" @click="leadIn">导入</el-button>
        <el-button class="btn1" size="mini" type="primary" @click="leadOut">导出</el-button>
    </div>
    <!-- 自定义表头，获取系统字段为默认表头，再根据用户新增字段是否显示为表头 -->
    <el-table
      class="table"
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%; margin-top: 24px"
      :header-cell-style="{ background: '#f8f8f9' }"
      :row-style="{ height: '40px' }"
      :cell-style="{ padding: '0px' }"
    >
      <el-table-column label="姓名" align="center" >
        <template slot-scope="scope">{{ scope.row.name }}</template>
      </el-table-column>
       <el-table-column label="性别" align="center" >
        <template slot-scope="scope">{{ scope.row.gender }}</template>
      </el-table-column>
      <el-table-column prop="identity" align="center" label="证件号" >
      </el-table-column>
      <el-table-column label="类别" align="center" >
          <template slot-scope="scope">{{ scope.row.statue | statusFilter}}</template>
      </el-table-column>
      <el-table-column
        prop="address"
        align="center"
        label="转入组织名称"
        show-overflow-tooltip
      >
      </el-table-column>
       <el-table-column prop="identity" align="center" label="转出组织名称" >
      </el-table-column>
       <el-table-column prop="identity" align="center" label="转移时间" >
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
      >
      </el-pagination>
    </div>
  </div>
 </div>
</template>
<script>
import Breadcrumb from '@/components/breadcrumb';
import {getChangeInfo} from "@/api/partyInfo"
export default {
  name: "relChange",
  components:{
Breadcrumb
  },
  data() {
    return {
      breadItems:{},
      total: 0, // 总页数
      currentPage: 1, // 当前页数
      pageSize: 20, // 每页显示多少条,
      tableData: [
      ],
    };
  },
   created(){
      this.setBreadItems()
      this.getList();
    },
  methods: {
         //添加面包屑
      setBreadItems(){
        this.breadItems = {
          '智慧党建':'/partyBuild',
          '党员信息管理':'/partyBuild/partyInfo',
          '党员关系转移':'/partyBuild/partyInfo/relChange'
        }
        
      },
      //
      //获取表格数据
      getList(params){
        debugger
          getChangeInfo(
        Object.assign(
          {
            pageNo: this.currentPage,
            pageSize: this.pageSize,
          },
          params
        )
      )
        .then((res) => {
          debugger
          this.tableData = res.data.data.records;
          this.total = res.data.data.total;
          this.listLoading = false;
        })
        .catch((err) => {
          this.listLoading = false;
        });
      },
    leadIn() {},
    leadOut() {},
    handleSelectionChange() {},
    handleSizeChange() {},
    handleCurrentChange() {},
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
.bread{
    display: inline-block;
}
.table-box {
  margin: 24px 24px 0 24px;
  background-color: #fff;
}
.field-title {
  width: 216px;
  font-size: 16px;
  font-weight: 400;
  padding: 24px 0 0 24px;
}

.tableBtn-box {
  display: inline-block;
  float: right;
  margin: -24px 24px 0 0;
}
.page {
  width: 100%;
  height: 80px;
  background-color: #fff;
}
.el-pagination {
  float: right;

  margin: 24px 24px 0 0;
}
</style>
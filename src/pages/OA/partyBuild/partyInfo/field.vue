<template>
  <div>
    <div class="top">
      <i class="icon el-icon-location"></i>
      <Breadcrumb class="bread" :items="breadItems"></Breadcrumb>
      <div class="back" @click="goBack">
        <i class="el-icon-refresh-left"></i><span>返回</span>
      </div>
    </div>
    <div class="table-box">
      <div class="field-title" style="height: 24px">字段管理</div>
      <div class="tableBtn-box">
        <el-button class="btn1" size="mini" type="primary" @click="addDialog"
          >新增</el-button
        >
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
        @cell-mouse-enter="hover"
      >
        <!-- canDel: "1" notNull: "0" propertyId: 1001 propertyName: "党员额外属性1"
        propertyType: "3" schoolId: 1 state: "1" -->
        <el-table-column label="字段名" align="center" width="120">
          <template slot-scope="scope">{{ scope.row.propertyName }}</template>
        </el-table-column>
        <el-table-column
          v-if="false"
          prop="notNull"
          align="center"
          label="是否必填"
        >
          <template slot-scope="scope">{{
            scope.row.notNull | stateFilter
          }}</template>
        </el-table-column>
        <el-table-column prop="notNull" align="center" label="是否必填">
          <template slot-scope="scope">
            <el-select
              v-model="scope.row.notNull "
              placeholder="请选择"
              style="width: 80px"
              @change="selectChange"
            >
              <el-option
                v-for="item in stateOptions"
                :key="item.id"
                :label="item.label"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="state" align="center" label="是否在列表中显示">
          <template slot-scope="scope">{{
            scope.row.notNull | stateFilter
          }}</template>
        </el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button
              @click="del(scope.row)"
              type="text"
              size="small"
              v-if="scope.row.canDel == 1"
              >删除</el-button
            >
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
        >
        </el-pagination>
      </div>
    </div>
    <!-- 新增字段 -->
     <el-dialog
      title="新增字段"
      width="40%"
      :visible.sync="Visible"
      :before-close="HandleClose"
    >
      <el-form :model="form" label-width="80px">
          <el-form-item label="字段名称">
          <el-input v-model="form.propertyName" width="200"></el-input>
        </el-form-item>
        <el-form-item >
             <el-checkbox v-model="form.notNull">是否必填</el-checkbox>
             <el-checkbox v-model="form.state">是否在列表中显示</el-checkbox>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitTest(type)">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getField } from "@/api/partyInfo";
import Breadcrumb from "../../../../components/breadcrumb";
export default {
  name: "field",
  components: {
    Breadcrumb,
  },
  data() {
    return {
      breadItems: {},
      total: 0, // 总页数
      currentPage: 1, // 当前页数
      pageSize: 20, // 每页显示多少条,
      tableData: [],
      form:{
        propertyName:'',
        checked1:'',
      checked2:'',
      },
      Visible:false,
      stateOptions: [
        {
          id: 0,
          label: "否",
        },
        {
          id: 1,
          label: "是",
        },
      ],
      rowObj: {},
    };
  },
  filters: {
    stateFilter(value) {
      const stateMap = {
        0: "否",
        1: "是",
      };
      return stateMap[value];
    },
  },
  computed: {},
  created() {
    this.getTable();
    this.setBreadItems()
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    //添加面包屑
    setBreadItems() {
      this.breadItems = {
        智慧党建: "/partyBuild",
        党员信息管理: "/partyBuild/partyInfo",
        字段管理: "/partyBuild/partyInfo/field",
      };
    },
    getTable() {
      let obj = {
        propertyType: 3,
      };
      getField(obj)
        .then((res) => {
          debugger
          this.tableData = res.data.data;
        })
        .catch((err) => {});
    },
    hover(row, column, cell, event) {
      this.rowObj = {
        propertyId: row.id,
        // canDel: row.canDel,
        // notNull: row.notNull,
        propertyName: row.propertyName,
        propertyType: row.propertyType,
        schoolId: row.schoolId,
        state: row.state,
      };
    },
    selectChange(data) {
      debugger;
      let obj =Object.assign(this.rowObj,{notNull:data})
      //修改字段接口
    },
    del() {},
    addDialog() {
      this.Visible = true
    },
    HandleClose(){
       this.Visible = false
    },
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
.bread {
  display: inline-block;
}
.back {
  float: right;
  line-height: 40px;
  margin-right: 64px;
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
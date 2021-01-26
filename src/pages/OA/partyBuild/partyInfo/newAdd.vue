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
     <el-input
                  class=" search"
                  style=" width: 240px"
                  v-model="addSearchInput"
                  placeholder="请输入内容"
                  @keyup.enter.native="search"
                >
                  <i
                    class="el-icon-search el-input__icon"
                    slot="suffix"
                    @click="search"
                  >
                  </i>
                </el-input>
    <div class="searcPerInfo">
      <el-table
        class="infoTable"
        ref="singleTable"
        :data="infoTableData"
        highlight-current-row
        @current-change="handleCurrentChange"
        :show-header="false"
        style="width: 100%"
        height="100px"
        :header-cell-style="{ background: '#f8f8f9' }"
        :row-style="{ height: '32px' }"
        :cell-style="{ padding: '0px' }"
      >
          <el-table-column
            label="姓名" align="center" prop="userName"
         >
            <template slot-scope="scope">{{ scope.row.userName }}</template>
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
            prop="identity" align="center"
            label="身份证号"
            >
            </el-table-column>
      </el-table>
    </div>
    <div
      style="
        width: 100%;
        height: 1px;
        background-color: #ccc;
        margin-bottom: 24px;
      "
    ></div>
    <el-checkbox class="check" v-model="checked">是否为转入党员</el-checkbox>
    <el-form :model="formInline" label-width="80px">
      <el-row>
        <el-col :span="12">
          <el-form-item label="转出单位" label-width="80px">
            <el-select v-model="formInline.dsType" placeholder="请选择">
              <el-option
                v-for="item in typeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="转入时间">
            <el-select v-model="formInline.dsType" placeholder="请选择">
              <el-option
                v-for="item in typeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="类别">
            <el-select v-model="formInline.dsType" placeholder="请选择">
              <el-option
                v-for="item in typeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="入党时间">
            <el-select v-model="formInline.dsType" placeholder="请选择">
              <el-option
                v-for="item in typeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="组织">
            <el-select v-model="formInline.dsType" placeholder="请选择">
              <el-option
                v-for="item in typeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="组织职务">
            <el-select v-model="formInline.dsType" placeholder="请选择">
              <el-option
                v-for="item in typeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="button-box">
      <!-- <el-button @click="close" size="mini">取 消</el-button> -->
      <el-button type="primary" @click="addSubmit" size="mini">确 定</el-button>
    </div>
    <!-- </el-dialog> -->
  </div>
</template>
<script>
import {searchFParty} from "@/api/partyInfo";
export default {
  name: "",
  props: {
    addDialogVisible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      checked: true, //党员勾选
      formInline: {},
      addSearchInput: "",
      typeOptions: [],
      //circleUrl:'',
      // name:'萱萱',
      // sex:'女',
      // address:'湖北武汉',
      // num:'421022817716621233',
      infoTableData: [
      ],
    };
  },
    filters: {
    sexFilter(value) {
      const sex = {
        0:"女",
        1:"男"
      };
      return sex[value];
    }
  },
  created(){
  },
  methods: {
    search(){
      this.getTable()
    },
    //搜索非党员表格数据
    getTable(){

      let obj = {
        param:this.addSearchInput
      }
      searchFParty(obj).then(res => {

this.infoTableData = res.data.data;
      }).catch(err => {

      })
    },
    
    //新增提交表单
    addSubmit() {
      this.$emit("closeAddDio", false);
    },
    //关闭弹窗
    close() {
      this.$emit("closeAddDio", false);
    },
    //用户搜索新增党员基础信息显示表格
    setCurrent(row) {
      this.$refs.singleTable.setCurrentRow(row);
    },
    handleCurrentChange(val) {
      this.currentRow = val;
    },
  },
};
</script>
<style lang="scss" scoped>
.addSearch /deep/ .el-input__inner {
  width: 216px;
  border-radius: 4px;
  margin: 0 0 24px 0;
}
.searcPerInfo {
  //height:100px;
  // margin: 24px 0;
  .avatar {
    float: left;
  }
  .name,
  .sex,
  .address,
  .num {
    float: left;
    margin: 6px 0 0 66px;
  }
}
.check {
  margin-bottom: 24px;
}
.el-form-item {
  margin-bottom: 16px;
}
.el-row {
  margin-bottom: 0;
}
.button-box {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
.el-table {
  margin-top: 24px;
}
</style>
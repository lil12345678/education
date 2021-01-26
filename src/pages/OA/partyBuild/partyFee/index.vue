<template>
  <div>
    <div class="top">
            <i class="icon el-icon-location"></i>
            <Breadcrumb class="bread" :items="breadItems"></Breadcrumb>
             <div class="back" @click="goBack">
    <i class="el-icon-refresh-left"></i><span>返回</span>
    </div>
        </div>
    <div class="content-box">
      <div class="search-box">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="缴费状态">
            <el-select v-model="formInline.status" placeholder="请选择">
              <el-option
                v-for="item in stateOptions"
                :key="item.id"
                :label="item.label"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="组织">
            <el-select v-model="formInline.organizeName">
              <el-option
                v-for="item in treeData"
                :key="item.id"
                :label="item.label"
                :value="item.id"
              >
                <el-tree
                  ref="selectTree"
                  :data="treeData"
                  :props="defaultProps"
                  default-expand-all
                  @node-click="handleNodeClick2"
                >
                  <span class="custom-tree-node" slot-scope="{ node, data }">
                    <span>{{ data.label || "" }}</span>
                  </span>
                </el-tree>
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="月份">
            <el-select v-model="formInline.duesTime" placeholder="请选择">
              <el-option
                v-for="item in timeOptions"
                :key="item.id"
                :label="item.label"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-input
              class="search"
              style="height: 24px; width: 240px"
              v-model="formInline.title"
              placeholder="请输入用户姓名"
              @keyup.enter.native="search"
            >
              <i
                class="el-icon-search el-input__icon"
                slot="suffix"
                @click="search"
              >
              </i>
            </el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="btn-box">
        <el-button class="btn2" size="mini" type="primary" @click="edit"
          >编辑</el-button
        >
        <el-button class="btn1" size="mini" type="primary" @click="leadOut"
          >导出</el-button
        >
        <el-button class="btn1" size="mini" type="primary" @click="del"
          >删除</el-button
        >
        <el-button class="btn2" size="mini" type="primary" @click="leadIn"
          >导入</el-button
        >
      </div>
      <el-table
        class="table"
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        @selection-change="handleSelectionChange"
        :header-cell-style="{ background: '#f8f8f9' }"
        :row-style="{ height: '40px' }"
        :cell-style="{ padding: '0px' }"
      >
        <el-table-column type="selection" align="center" width="55">
        </el-table-column>
        <el-table-column label="姓名" align="center">
          <template slot-scope="scope">{{ scope.row.userName }}</template>
        </el-table-column>
        <el-table-column prop="organizeName" align="center" label="组织名称">
        </el-table-column>
        <el-table-column
          prop="duesTime"
          align="center"
          label="缴费月份"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column prop="payMoney" align="center" label="应缴金额">
        </el-table-column>
        <el-table-column
          v-if="editState === false"
          prop="status"
          align="center"
          label="缴费状态"
        >
          <template slot-scope="scope">{{
            scope.row.status | statusFilter
          }}</template>
        </el-table-column>
        <el-table-column
          v-if="editState === true"
          fixed="right"
          label="缴费状态"
          prop="status"
          align="center"
        >
          <template slot-scope="scope">
            <el-select
              v-model="scope.row.status"
              placeholder="请选择"
              style="width: 120px"
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
    </div>
    <!-- 导入弹窗：选择直接导入和下载模板 -->
    <el-dialog
      title="导入文件"
      width="40%"
      :visible.sync="leadInVisible"
      :before-close="leadInClose"
      class="dio-box"
    >
    <el-form  :model="leadform" >
      <el-form-item label="组织">
     <el-select v-model="leadform.organizeName">
              <el-option
                v-for="item in treeData2"
                :key="item.id"
                :label="item.label"
                :value="item.id"
              >
                <el-tree
                  ref="selectTree"
                  :data="treeData2"
                  :props="defaultProps"
                  default-expand-all
                  @node-click="handleNodeClick3"
                >
                  <span class="custom-tree-node" slot-scope="{ node, data }">
                    <span>{{ data.label || "" }}</span>
                  </span>
                </el-tree>
              </el-option>
            </el-select>  
      </el-form-item>
        <el-form-item > 
      <el-upload
      style="margin:0 20%"
        class="upload-demo"
        drag
        action=""
        :headers="headers" 
        :before-upload="handleBefore"
            :limit="1">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text" >点击上传</div>
        <div class="el-upload__tip" slot="tip">仅允许导入“xls”或者“xlxs”文件</div>
      </el-upload>
        </el-form-item>
    </el-form>
      <el-button style="margin:0 20%" type="text" @click="downLoad">下载模板</el-button>
    </el-dialog>
  </div>
</template>

<script>
import Breadcrumb from "../../../../components/breadcrumb";
import store from "@/store";
import { mapState } from "vuex";
import { getDetail, getTemplate, delItem, editItem, leadInData, leadOutData } from "@/api/fee";
import { orgList } from "@/api/org.js";
export default {
  name: "fee",
  components: {
    Breadcrumb,
  },
  data() {
    return {
      breadItems: {}, //面包屑组件传入的值
      editState: false, //判断表格的缴费状态的显示状态
      stateOptions: [
        //缴费状态
        {
          id: 0,
          label: "未交费",
        },
        {
          id: 1,
          label: "已交费",
        },
      ],
      formInline: {
        status: null,
        organizeId: null,
        duesTime: "",
        organizeName: "",
        userName: "",
      },
      leadform:{
        organizeName:'',
        organizeId:null,

      },
      timeOptions: [
        {
          id: 1,
          label: "一月",
        },
        {
          id: 2,
          label: "二月",
        },
        {
          id: 3,
          label: "三月",
        },
        {
          id: 4,
          label: "四月",
        },
        {
          id: 5,
          label: "五月",
        },
        {
          id: 6,
          label: "六月",
        },
        {
          id: 7,
          label: "七月",
        },
        {
          id: 8,
          label: "八月",
        },
        {
          id: 9,
          label: "九月",
        },
        {
          id: 10,
          label: "十月",
        },
        {
          id: 11,
          label: "十一月",
        },
        {
          id: 12,
          label: "十二月",
        },
      ],
      orgOptions: [],
      treeData: [],
      treeData2:[],
      stateValue: "",
      total: 0, // 总页数
      currentPage: 1, // 当前页数
      pageSize: 20, // 每页显示多少条,
      tableData: [],
      multipleSelection: [],
      defaultProps: {
        children: "children",
        label: "label",
      },
      leadInVisible: false,
       headers:{//上传头部
          'Authorization': 'Bearer' + " " + sessionStorage.getItem('TOKEN'),
          'school_id': sessionStorage.getItem('SCHOOLID')
       },
       
    };
  },
  computed: {
    ...mapState({
      menuPath: (state) => state.menu.menuPath,
    }),
  },
  filters: {
    statusFilter(value) {
      const stateMap = {
        0: "未缴费",
        1: "已缴费",
      };
      return stateMap[value];
    },
  },
  created() {
    this.setBreadItems();
    this.getList();
    this.getOrgList();
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    //添加面包屑
    setBreadItems() {
      this.breadItems = {
        智慧党建: "/partyBuild",
        党费管理: "/partyBuild/fee",
      };
    },
    getList(params) {
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
    //递归树结构
    mapTree(org) {
      const haveChildren = Array.isArray(org.childs) && org.childs.length > 0;
      return {
        //分别将我们查询出来的值做出改变他的key
        label: org.organizeName,
        id: org.oid,
        data: { ...org },
        //判断它是否存在子集，若果存在就进行再次进行遍历操作，知道不存在子集便对其他的元素进行操作
        children: haveChildren ? org.childs.map((i) => this.mapTree(i)) : [],
      };
    },
    //按type获取组织下拉组织树
    getOrgList() {
      let obj = {
        schoolId: 1,
        organizeType: 2,
      };
      orgList(obj)
        .then((res) => {
          let data = [];
          data.push(res.data.data);
          this.treeData = data.map((org) => this.mapTree(org));
          this.treeData2 = data.map((org) => this.mapTree(org));
          console.log(this.treeData);
        })
        .catch((err) => {});
    },
    //选择组织树
    handleNodeClick2(data) {
      this.formInline.organizeName = data.label;
      this.formInline.organizeId = data.id;
    },
    handleNodeClick3(data) {
      this.leadform.organizeName = data.label;
      this.leadform.organizeId = data.id;
    },
    search() {
      debugger
      let data = {
        status: this.formInline.status,
        duesTime: this.formInline.duesTime,
        organizeName: this.formInline.organizeName,
        userName: this.formInline.userName,
      };
      this.getList(data);
    },
    //编辑
    edit() {
      debugger
      this.editState = true;
    },
    selectChange(data) {
      debugger;
      if(this.multipleSelection.length == 0){
        this.$message.error('请先勾选修改项')
        return false
      }
      let obj = {
         status:data,
         id:this.multipleSelection[0].id
      }
     
      editItem(obj)
        .then((res) => {
          debugger;
          if (res.data.status == 0) {
            this.$message.success("您已修改成功");
            this.getList();
          }
        })
        .catch((err) => {});
    },
    //删除
    del() {
      debugger;
      let arr = [];
      for (let i in this.multipleSelection) {
        arr.push(this.multipleSelection[i].id);
      }
      delItem(arr)
        .then((res) => {
          debugger;
          if (res.data.status == 0) {
            this.$message.success("您已成功删除");
            this.getList();
          }
        })
        .catch((err) => {});
    },
    //关闭导入弹窗
    leadInClose() {
      this.leadInVisible = false;
    },
    //导入
    leadIn() {
      this.leadInVisible = true;
     
    },   
    // 上传前的回调函数/导入
 　　handleBefore(file, fileList) {
   debugger;
   if(this.leadform.organizeId == null){
     this.$message.error('请先选择组织')
     return false
   }
  let formdata = new FormData();
      formdata.append('file',file);
      formdata.append('organizeId',this.leadform.organizeId);
leadInData(formdata).then((res) => {
          debugger;
          if (res.status == 0) {
            this.$message.success("您已导入成功");
          }else{
            this.$message({
 　　　　　　　　message: res.errorMsg,
 　　　　　　　　type: 'error'
 　　　　　　});
          }
        })
        .catch((err) => {});
      this.leadInVisible = false;
 　　},
  
    //下载模板
    downLoad(){
      let schoolId = sessionStorage.getItem('SCHOOLID');
      let token = sessionStorage.getItem('TOKEN');
      window.open('http://192.168.8.16:9000/zhxy-event/api/partyDuesInfo/template-down' + '?' + 'schoolId=' + schoolId + '&' + 'token=' + token)
    },


    //导出
    leadOut() {
        let schoolId = sessionStorage.getItem('SCHOOLID');
      let token = sessionStorage.getItem('TOKEN');
      let status = this.formInline.status;
      let duesTime = this.formInline.duesTime;
      let organizeId = this.formInline.organizeId;
      window.open(
        'http://192.168.8.16:9000/zhxy-event/api/partyDuesInfo/template-down' 
        + '?' + 'schoolId=' + schoolId + '&' + 'token=' + token + '&' + 'status=' + status + '&' + 'duesTime=' + duesTime + '&' + 'organizeId=' + organizeId
        )
      // debugger
      // let obj = {
      //    status: this.formInline.status,
      //   duesTime: this.formInline.duesTime,
      //   organizeId: this.formInline.organizeId,
      // }
      // leadOutData(obj).then((res) => {
      //     debugger;
      //     if (res.data.status == 0) {
      //       this.$message.success("您已导出成功");
      //     }
      //   })
      //   .catch((err) => {});
    },
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
.content-box {
  background-color: #fff;
  margin: 24px 24px 0 24px;
}
.search-box {
  float: left;
  margin: 12px 0 0 24px;
}
.search-box /deep/ .el-input {
  width: 120px;
  border-radius: 4px;
  // margin: 0 0 24px 0;
}
.classA /deep/ .el-input__inner {
  width: 216px;
  border-radius: 4px;
  // margin: 0 0 24px 0;
}
.btn-box {
  //display: inline-block;
  float: right;
  margin: 24px 24px 0 0;
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
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
.el-scrollbar .el-scrollbar__view .el-select-dropdown__item {
  height: auto;
  max-height: 274px;
  padding: 0 12px;
  overflow: hidden;
  overflow-y: auto;
}
.el-select-dropdown__item.selected {
  font-weight: normal;
}
ul li >>> .el-tree .el-tree-node__content {
  height: auto;
  padding: 0 20px;
}
.el-tree-node__label {
  font-weight: normal;
}
.el-tree >>> .is-current .el-tree-node__label {
  color: #409eff;
  font-weight: 700;
}
.el-tree >>> .is-current .el-tree-node__children .el-tree-node__label {
  color: #606266;
  font-weight: normal;
}
.dio-box{

}
</style>
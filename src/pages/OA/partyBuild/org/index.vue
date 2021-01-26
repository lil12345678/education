<template>
  <div>
    <div class="top">
      <i class="icon el-icon-location"></i>
      <Breadcrumb class="bread" :items="breadItems"></Breadcrumb>
    </div>
    <div class="all-box">
      <div class="content-box">
        <div class="left-box">
          <div class="tree-title">党组织</div>
          <el-tree
            :min-width="218"
            :data="treeData"
            :props="defaultProps"
            @node-click="handleNodeClick"
          >
            <span class="custom-tree-node" slot-scope="{ node, data }">
              <span>{{ node.label }}</span>
              <el-dropdown>
                <span class="el-dropdown-link">
                  <el-icon class="el-icon-more"> </el-icon>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item
                    v-for="item in dropdwonList"
                    :key="item.index"
                    @click.native="handleCommand(data, item)"
                    >{{ item.name }}</el-dropdown-item
                  >
                </el-dropdown-menu>
              </el-dropdown>
            </span>
          </el-tree>
        </div>
        <div class="right-box">
          <div class="title">职位信息</div>
          <div class="btn-box">
            <el-button
              v-if="this.permissionAdd"
              class="btn1"
              size="mini"
              type="primary"
              @click="addPosition"
              >添加</el-button
            >
            <el-button
              class="btn1"
              size="mini"
              type="primary"
              @click="del"
              v-if="this.permissionDel"
              >删除</el-button
            >
          </div>
          <el-table
            class="table"
            ref="multipleTable"
            :data="tableData"
            tooltip-effect="dark"
            :header-cell-style="{ background: '#f8f8f9' }"
            :row-style="{ height: '40px' }"
            :cell-style="{ padding: '0px' }"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" width="55"> </el-table-column>
            <el-table-column label="职务名称" align="center" width="120">
              <template slot-scope="scope">{{ scope.row.dutiesName }}</template>
            </el-table-column>
            <el-table-column
              prop="description"
              align="center"
              label="职务描述"
              width="120"
            >
            </el-table-column>
            <el-table-column fixed="right" label="操作">
              <template slot-scope="scope">
                <el-button
                  @click="limitEdit(scope.row)"
                  type="text"
                  size="small"
                  >设置权限</el-button
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
            ></el-pagination>
          </div>
        </div>
      </div>
      <div class="circle-btn">
        <el-button
          class="addGroup-btn"
          style="color: #5dcfe9"
          icon="el-icon-plus"
          circle
          @click="newPartyGroup"
        ></el-button>
      </div>
    </div>
    <!-- 新增祖先节点弹窗 -->
    <el-dialog
      title="新增组织"
      width="40%"
      :visible.sync="dialogVisible"
      :before-close="fatherClose"
    >
      <el-form :model="form1">
        <el-form-item label="活动名称" label-width="80px">
          <el-input v-model="form1.organizeName" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="saveFather">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 新增党组织弹窗 -->
    <el-dialog
      title="新增组织"
      width="40%"
      :visible.sync="addDialogVisible"
      :before-close="handleClose"
    >
      <!-- <AddGroup
        ref="groupAddDio"
        @closeAddDio="closeAddDio"
        :form="form"
        :oid="oid"
        :treeData="treeData"
      ></AddGroup> -->
      <el-form :model="orgForm" label-width="80px">
        <el-form-item label="组织名称" label-width="80px" style="width: 200">
          <el-input
            v-model="orgForm.organizeName"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="上级组织">
          <el-select v-model="orgForm.parentId">
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
      </el-form>
      <div class="button-box">
        <el-button type="primary" @click="submit" size="mini">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 修改组织名称 -->
    <el-dialog
      title="修改组织名称"
      width="40%"
      :visible.sync="newsortDio"
      :before-close="closeEditDio"
    >
      组织名称：<el-input
        style="width: 75%"
        v-model="inputVal"
        placeholder="请输入内容"
      ></el-input>
      <el-button
        style="margin: 24px 45% 0 45%"
        type="primary"
        @click="saveOrg"
        size="mini"
        >确 定</el-button
      >
    </el-dialog>
    <!-- 权限设置弹框 -->
    <el-dialog
      title="权限设置"
      width="40%"
      :visible.sync="limitDialogVisible"
      :before-close="limitHandleClose"
    >
      <!-- <Limit ref="limitAddDio" @closeLimitDio="closeLimitDio"></Limit> -->
      <el-tree
        class="limitTree"
        :data="treedata"
        show-checkbox
        node-key="id"
        ref="tree"
        highlight-current
        :props="limitdefaultProps"
        @check-change="handleCheckChange"
        @node-click="handleNodeClick3"
        accordion
      >
      </el-tree>
      <div class="line"></div>
      <el-checkbox-group v-model="checkList">
        <el-checkbox
          v-for="i in limitOption"
          :label="i.label"
          :key="i.id"
          @change="handleChecked(i)"
          >{{ i.label }}</el-checkbox
        >
      </el-checkbox-group>
      <div class="button-box">
        <el-button type="primary" @click="limitSubmit" size="mini"
          >确 定</el-button
        >
      </div>
    </el-dialog>

    <!-- 新增职位弹窗 -->
    <el-dialog
      title="新增职位"
      width="40%"
      :visible.sync="positionDialogVisible"
      :before-close="positionHandleClose"
    >
      <!-- <PositionAddDio
        ref="positionAddDio"
        @closePositionDio="closePositionDio"
      ></PositionAddDio> -->
      <el-form :model="positionForm" label-width="80px">
        <el-form-item label="组织名称" label-width="80px" style="width: 200">
          <el-input v-model="this.nodeName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="职务名称" label-width="80px" style="width: 200">
          <el-input
            v-model="positionForm.dutiesName"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="职务描述">
          <el-input
            type="textarea"
            v-model="positionForm.description"
          ></el-input>
        </el-form-item>
      </el-form>
      <div class="button-box">
        <el-button type="primary" @click="positionSubmit" size="mini"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Breadcrumb from "../../../../components/breadcrumb";
import {
  orgList,
  fatherOrg,
  ChildOrg,
  editOrg,
  deleteOrg,
  getItem,
  addItem,
} from "@/api/org.js";
import { productMenu, getPermission } from "@/api/menu.js";
import AddGroup from "./addGroup";
import Limit from "./limit";
import PositionAddDio from "./addPosition";
import axios from "@/router/axios";
export default {
  name: "fee",
  components: {
    Breadcrumb,
    AddGroup,
    Limit,
    PositionAddDio,
  },
  data() {
    return {
      form: {},
      breadItems: {},
      permissionAdd: false,
      permissionDel: false,
      orgType: "", //组织分类需要动态获取
      form1: {
        organizeName: "", //祖先节点数据
      },
      orgForm: {
        organizeName: "",
        parentId: "",
      },
      positionForm: {
        description: "",
        dutiesName: "",
      },
      oid: null,
      typeOptions: [],
      total: 0, // 总页数
      currentPage: 1, // 当前页数
      pageSize: 20, // 每页显示多少条,
      tableData: [],
      multipleSelection: [],
      treeData: [],
      defaultProps: {
        children: "children",
        label: "label",
      },
      dropdwonList: [
        {
          name: "修改名称",
          index: "0",
        },
        {
          name: "删除",
          index: "1",
        },
      ],
      dialogVisible: false,
      addDialogVisible: false,
      limitDialogVisible: false,
      positionDialogVisible: false,
      newsortDio: false,
      dropdownItem: {},
      inputVal: "",
      nodeId: null,
      nodeName: "",
      treedata: [], //权限菜单树
      checkList: [], //权限
      limitOption: [],
      testData: [],
      limitData: [],
      limitdefaultProps: {
        children: "children",
        label: "label",
        operations: "operations",
      },
      DID: "",
      saveMID: 0,
      saveItem: {},
    };
  },
  created() {
    this.setBreadItems();
    this.getPermissions();
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
        组织管理: "/partyBuild/org",
      };
    },
    //页面初始先获取页面的删除、新增按钮等操作权限
    getPermissions() {
      let data = JSON.parse(sessionStorage.getItem("PERMISSION"));
      for (let i in data[0]) {
        if (data[0][i].operationName == "添加") {
          this.permissionAdd = true;
        } else if (data[0][i].operationName == "删除") {
          this.permissionDel = true;
        }
      }
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
          console.log(this.treeData);
        })
        .catch((err) => {});
    },
    //新增党组织,判断是否有根节点
    newPartyGroup() {
      if (this.treeData.length == 0) {
        this.dialogVisible = true;
      } else {
        //创建子节点
        this.addDialogVisible = true;
      }
    },
    //保存祖先组织
    saveFather() {
      //创建祖先节点
      let obj = {
        organizeType: "3", //暂时写死的
        organizeName: this.form1.organizeName,
        schoolId: 1,
      };
      fatherOrg(obj)
        .then((res) => {
          this.$message("您添加已成功新的组织");
        })
        .catch((err) => {});
    },
    //保存tree子节点
    submit() {
      ChildOrg(this.orgForm)
        .then((res) => {
          if (res.data.status == 0) {
            this.$message("您已成功添加新的组织");
          }
          this.getOrgList();
        })
        .catch((err) => {});
    },
    //关闭新增弹窗
    fatherClose() {
      this.dialogVisible = false;
    },
    //选择上级组织树
    handleNodeClick2(data) {
      this.orgForm.parentId = data.id;
    },
    handleClose() {
      this.addDialogVisible = false;
    },

    //删除
    del() {

    },
    //选择的项
    handleSelectionChange(val) {
      debugger

      this.multipleSelection.push(val.did);
      this.multipleSelection = toString(this.multipleSelection);
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
    //组织树获取item
    handleNodeClick(data) {
      this.nodeId = data.id;
      this.nodeName = data.label;
      let obj = {
        oid: data.id,
        schoolId: 1,
        dutiesType: 1,
      };
      getItem(obj)
        .then((res) => {
          this.tableData = res.data.data;
        })
        .catch((err) => {});
    },
    handleCommand(a, b) {
      this.dropdownItem = a;
      if (b.index == 0) {
        this.newsortDio = true;
      } else {
        //删除分类
        this.$confirm("是否确认删除名称为" + a.name + "的分类?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }).then(() => {
          let obj = {
            oid: a.id,
          };
          deleteOrg(obj)
            .then(() => {
              this.$notify({
                title: "成功",
                message: "删除成功",
                type: "success",
                duration: 2000,
              });
              this.getOrgList();
            })
            .catch(() => {
              this.$notify({
                title: "失败",
                message: "删除失败",
                type: "error",
                duration: 2000,
              });
            });
        });
      }
    },
    //修改名称
    saveOrg() {
      let obj = {
        oid: this.dropdownItem.id,
        organizeName: this.inputVal,
      };
      editOrg(obj)
        .then((res) => {
          if (res.data.status == 0) {
            this.$message("您已成功修改新的组织");
          }
          this.getOrgList();
        })
        .catch((err) => {});
    },
    closeEditDio() {
      this.newsortDio = false;
    },
    //关闭新增弹窗
    closeAddDio(f) {
      this.addDialogVisible = f;
    },
    //递归菜单取id
    setTree(data) {
      let arr = [];
      let arr1 = [];
      let arr2 = [];
      for (let i in data) {
        arr1.push(data[i].mid);
        for (let j in data[i].childMenus) {
          arr2.push(data[i].childMenus[j].mid);
        }
      }
      arr = arr1.concat(arr2);
      console.log(arr);
      return arr;
    },
    //获取职位的菜单权限
    getUserPer(row) {
      let obj = {
        pid: 1,
        did: row.did,
      };
      axios
        .get("http://192.168.8.16:9000/zhxy-auth/duty/getDutyMenu", {
          params: obj,
        })
        .then((res) => {
          let data = res.data.data;
          let d = this.setTree(data);
          if (res.data.status == 0) {
            let _this = this;
            setTimeout(function () {
              d.forEach((val) => {
                _this.$refs.tree.setChecked(val, true, false);
              });
            }, 500);
          }
        })
        .catch((err) => {});
    },
    //权限设置
    limitEdit(row) {
      this.getUserPer(row);
      this.DID = row.did;
      let obj = {
        pid: sessionStorage.getItem("PRODUCTID"),
      };
      // productMenu(obj).then(res => {
      //   debugger
      // }).catch(err => {
      // })
      axios
        .get("http://192.168.8.16:9000/zhxy-auth/menu/getProductMenu", {
          headers: {
            product_id: sessionStorage.getItem("PRODUCTID"),
          },
          params: obj,
        })
        .then((res) => {
          let data = res.data.data;
          this.limitData = res.data.data;
          //
          this.treedata = data.map((m) => this.mapTree2(m));
          console.log(this.treedata);
        })
        .catch((err) => {});
      this.limitDialogVisible = true;
    },
    mapTree2(m) {
      const haveChildren =
        Array.isArray(m.childMenus) && m.childMenus.length > 0;
      return {
        //分别将我们查询出来的值做出改变他的key
        label: m.menuName,
        id: m.mid,
        operations: m.operations,
        data: { ...m },
        //判断它是否存在子集，若果存在就进行再次进行遍历操作，知道不存在子集便对其他的元素进行操作
        children: haveChildren ? m.childMenus.map((i) => this.mapTree2(i)) : [],
      };
    },
    handleCheckChange(data, checked, indeterminate) {
      if (checked == true) {
        this.saveMID = data.id;
        if (this.saveItem[data.id] == null) {
          this.saveItem[data.id] = {};
        }
      }
      // this.handleNodeClick3(data);
      this.limitOption = [];
      this.MID = data.id;
      let obj = {
        mid: data.id,
      };
      axios
        .get("http://192.168.8.16:9000/zhxy-auth/menu/getMenuInfo", {
          params: obj,
        })
        .then((res) => {
          let data = res.data.data.operations;
          let a = [];
          data.map((i) => {
            a.push({ label: i.operationName, id: i.operationId });
          });
          this.limitOption = a;
          this.getMenuLimit();
        })
        .catch((err) => {});
    },
    //权限菜单树
    handleNodeClick3(data) {
      // this.limitOption = [];
      // this.MID = data.id;
      // let obj = {
      //   mid: data.id,
      // };
      // axios
      //   .get("http://192.168.8.16:9000/zhxy-auth/menu/getMenuInfo", {
      //     params: obj,
      //   })
      //   .then((res) => {
      //     let data = res.data.data.operations;
      //     let a = [];
      //     data.map((i) => {
      //       a.push({ label: i.operationName, id: i.operationId });
      //     });
      //     this.limitOption = a;
      //     this.getMenuLimit();
      //   })
      //   .catch((err) => {});
    },
    getMenuLimit() {
      axios
        .get("http://192.168.8.16:9000/zhxy-auth/duty/getDutyMenuOperations", {
          params: {
            did: this.DID,
            mid: this.MID,
            pid: sessionStorage.getItem("PRODUCTID"),
          },
        })
        .then((res) => {
          let data = res.data.data[0].childMenus;
          let arr = [];
          for (let i in data[0].operations) {
            arr.push(data[0].operations[i].operationName);
          }
          this.checkList = arr;
        })
        .catch((err) => {});
    },
    //选择权限
    handleChecked(i) {
    
      if (this.checkList.includes(i.label)) {
        if (this.saveItem[this.saveMID][i.id] != null) {
          delete this.saveItem[this.saveMID][i.id];
        } else {
          this.saveItem[this.saveMID][i.id] = "";
        }
        console.log(this.saveItem);
      } else {
        delete this.saveItem[this.saveMID][i.id];
      }
    },
    //
    limitHandleClose() {
      this.limitOption = [];
      this.limitDialogVisible = false;
    },
    //保存权限
    limitSubmit() {
      let arr = [];
      for (let i in this.saveItem) {
        let mod = {
          mid: i,
          operationIds: "",
        };
        // if(this.saveItem[i] != {}){} 就循环
        for (let j in this.saveItem[i]) {
          if (mod.operationIds == "") {
            mod.operationIds = j;
          } else {
            mod.operationIds += "," + j;
          }
        }
        arr.push(mod);
      }
      debugger;
      let obj = {
        pid: Number(sessionStorage.getItem("PRODUCTID")),
        did: this.DID,
        items: arr,
      };
      axios
        .post("http://192.168.8.16:9000/zhxy-auth/duty/addDutyMenu", obj)
        .then((res) => {
          if (res.status == 0) {
            this.message.success("您已成功添加该职位权限");
          }
        })
        .catch((err) => {});
    },
    //
    addPosition() {
      if (this.nodeId == null) {
        this.$message("请选择左侧您想添加职位的组织");
      } else {
        this.positionDialogVisible = true;
      }
    },
    //保存职位
    positionSubmit() {
      let obj = {
        oid: this.nodeId,
        dutiesType: 1,
        schoolId: 1,
      };
      Object.assign(this.positionForm, obj);
      addItem(this.positionForm)
        .then((res) => {
          if (res.data.status == 0) {
            this.$message("您已成功添加职位");
          }
        })
        .catch((err) => {});
    },

    //
    closePositionDio(f) {
      this.positionDialogVisible = f;
    },
    positionHandleClose() {
      this.positionDialogVisible = false;
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
.all-box {
  height: 760px;
  background-color: #fff;
  margin: 24px;
  overflow: hidden;
}
.content-box {
  background-color: #fff;
  margin: 24px 24px 0 24px;
  display: flex;
  flex-direction: row;
}
.left-box {
  border-right: 1px solid #e4e4e4;
}
.el-tree {
  min-width: 214px;
}
.circle-btn {
  height: 40px;
  width: 100%;
  margin: -64px 0 0 112px;
}
.addGroup-btn {
  border: none;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.14);
}
.tree-title {
  height: 40px;
  line-height: 40px;
  margin: 0 0 0 24px;
  font-size: 14px;
  font-weight: 400;
}
.right-box {
  flex: 1;
}
.title {
  float: left;
  margin: 24px 0 0 24px;
}
.btn-box {
  //display: inline-block;
  float: right;
  margin: 24px 24px 24px 0;
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
.limitTree {
  border-right: 1px solid #cfcfcf;
  width: 180px;
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
  padding: 0;
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
.selectInput {
  padding: 0 5px;
  box-sizing: border-box;
}
.el-checkbox-group {
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 60px;
  left: 300px;
}
.el-checkbox {
  height: 32px;
}
.button-box {
  display: flex;
  justify-content: center;
  margin-top: 24px;
}
</style>
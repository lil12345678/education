<template>
  <div class="out-box">
    <div class="content-box">
      <div class="left-box">
        <div class="Menu-title">题库类别</div>
        <el-menu :default-active="active" active-text-color="#419eef">
          <el-menu-item
            :index="i.id"
            v-for="i in navList"
            :key="i.id"
            @click="select(i.id)"
          >
            <span slot="title">{{ i.name }}</span>
            <el-dropdown>
              <span class="el-dropdown-link">
                <el-icon class="el-icon-more"> </el-icon>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  v-for="item in dropdwonList"
                  :key="item.index"
                  @click.native="handleCommand(i, item)"
                  >{{ item.name }}</el-dropdown-item
                >
              </el-dropdown-menu>
            </el-dropdown>
          </el-menu-item>
        </el-menu>
      </div>

      <div class="right-box">
        <el-input
          size="mini"
          class="top-search"
          placeholder="请输入内容"
          suffix-icon="el-icon-search"
          v-model="nameSearch"
        ></el-input>
        <div class="btn-box">
          <el-button class="btn1" size="mini" type="primary" @click="addTest"
            >新增题目</el-button
          >
        </div>
          <el-table
          :data="tableData">
          <el-table-column
          width="700"
            prop="subjectTitle"
            label="题目"  show-overflow-tooltip >
             <template slot-scope="scope">
          <span>{{ scope.row.subjectTitle }}</span>
        </template>
          </el-table-column>
          <el-table-column
            label="操作"
            align="center"
            >
            <template slot-scope="scope">
              <!-- <div class="btn"> -->
                  <i
                    v-if="status == 0"
                    class="el-icon-circle-check"
                    style="padding-left: 12px; color: green"
                    @click.native.prevent="editClose(scope.$index, tableData)"
                  ></i>
                  <i
                    v-else
                    class="el-icon-remove-outline"
                    style="padding-left: 12px; color: red"
                    @click.native.prevent="editStart(scope.$index, tableData)"
                  ></i>
                  <i
                    class="el-icon-edit"
                    style="padding-left: 12px"
                    @click.native.prevent="editItem(scope.$index, tableData)"
                  ></i>
                  <i
                    class="el-icon-delete"
                    style="padding-left: 12px"
                  @click.native.prevent="deleteRow(scope.$index, tableData)"
                  ></i>
                <!-- </div> -->
            </template>
          </el-table-column>
        </el-table>

        
        <div class="page">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :page-sizes="[5,10,15]"
            :current-page="currentPage"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          ></el-pagination>
        </div>
      </div>
    </div>
    <div class="line"></div>
    <div class="circle-btn">
      <el-button
        class="addGroup-btn"
        style="color: #5dcfe9"
        icon="el-icon-plus"
        circle
        @click="newTestSort"
      ></el-button>
    </div>

    <!-- 新增考试分类弹窗 -->
    <el-dialog
      :title="dialogTitle"
      width="30%"
      :visible.sync="testSortVisible"
      :before-close="testSortClose"
    >
      <div
        style="
          width: 100%;
          height: 1px;
          background-color: #e4e4e4;
          margin: 24px 0;
        "
      ></div>
      <el-form :model="sortForm" label-width="80px">
        <el-form-item label="分类名称">
          <el-input v-model="sortForm.name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="button-box">
        <el-button size="mini" type="primary" @click="submitSort(dialogTitle)"
          >确 定</el-button
        >
      </div>
    </el-dialog>

    <!-- 新增职位弹窗 -->
    <el-dialog
      title="新增考试"
      width="40%"
      :visible.sync="testVisible"
      :before-close="testHandleClose"
    >
      <el-form :model="form">
        <el-form-item label="分类名称">
          <el-radio-group v-model="type">
            <el-radio label="手动选题"></el-radio>
            <el-radio label="自动生成"></el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitTest(type)">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 自动生成试题出现弹框两种：无历史记录、有历史记录 -->
    <el-dialog
      v-if="history == false"
      title="自动试题组合方案"
      width="40%"
      :visible.sync="HistoryVisible"
      :before-close="handleClose"
    >
      <img src="url" alt="无方案" style="display: block" />
      <el-button type="primary" @click="goPlan">新增方案</el-button>
    </el-dialog>

    <el-dialog
      v-if="history == true"
      title="自动试题组合方案"
      width="40%"
      :visible.sync="HistoryVisible"
      :before-close="handleClose"
    >
      <History ref="History" @closeHistory="closeHistory"></History>
    </el-dialog>
  </div>
</template>

<script>
import History from "./historyPlan";
import {
  getNewsList,
  addTypy,
  getSortTree,
  editSort,
  deleteSort,
  deleteItem,
  editArticleInfo,
} from "@/api/news";
import {examSubject} from "@/api/study"
export default {
  name: "test",
  props: ["list"],
  components: {
    History,
  },
  data() {
    return {
      active: "", //菜单默认项
      navList: [],
      dialogTitle: "", //公用弹窗的title
      status: null,
      sortMenuId: null, //保存分类id用于编辑后获取数据
      nameSearch: "",
      sortForm: {},
      form: {},
      typeOptions: [],
      type: "手动选题",
      total: 0, // 总页数
      currentPage: 1, // 当前页数
      pageSize: 5, // 每页显示多少条,
      listData: [],
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
      testSortVisible: false, //新增分类
      testVisible: false, //新增考试
      HistoryVisible: false, //历史试题弹框
      history: false, //是否有历史试题方案
       tableData: []
    };
  },
  created() {
    this.getTree();
    this.init();
  },
  watch: {
    navList() {
      this.init();
    },
    active() {},
  },
  methods: {
    init() {
      if (this.navList == null || this.navList.length == 0) {
        return;
      } else {
        this.select(this.navList[0].id);
        this.active = this.navList[0].id;
      }
    },
    //获取分类
    getTree() {
      let obj = {
        name: "在线题库",
      };
      getSortTree(obj)
        .then((res) => {
          let arr = res.data.data;
          let tabs = [];
          arr.forEach((e) => {
            this.pId = e.id;
            tabs = e.children;
          });
          this.navList = tabs;
        })
        .catch((err) => {});
    },
    //左边菜单选中显示相应的右侧内容
    select(ID) {
      this.sortMenuId = ID;
      let obj = {
        menuId: ID,
      };
      this.getList(obj);
    },
    //获取itemlist
    getList(params) {
      // let params = {
      //   menuId: id,
      // };
      examSubject(
        Object.assign(
          {
            current: this.currentPage,
            size: this.pageSize,
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
    //分类下拉框
    handleCommand(a, b) {
      this.dropdownItem = a;
      if (b.index == 0) {
        this.dialogTitle = "修改学习类别";
        this.testSortVisible = true;
      } else {
        //删除分类
        this.$confirm("是否确认删除名称为" + a.name + "的分类?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }).then(() => {
          deleteSort(a.id)
            .then(() => {
              this.$notify({
                title: "成功",
                message: "删除成功",
                type: "success",
                duration: 2000,
              });
              this.getTree();
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
    //启用
    editStart(item) {
      //传入启用字段
      let obj = {
        id: item.id,
        status: 0,
      };
      editArticleInfo(obj)
        .then((res) => {
          if (res.data.status == 0) {
            let o = {
              menuId: this.sortMenuId,
            };
            this.getList(o);
          }
        })
        .catch((err) => {});
    },
    //禁用
    editClose(item) {
      let obj = {
        id: item.id,
        status: 1,
      };
      editArticleInfo(obj)
        .then((res) => {
          if (res.data.status == 0) {
            let o = {
              menuId: this.sortMenuId,
            };
            this.getList(o);
          }
        })
        .catch((err) => {});
    },
    //修改item
    editItem(item) {
      debugger;
      this.$router.push({
        path: "/partyBuild/studyManage/addStudy",
        query: {
          id: item.id,
          state: "edit",
        },
      });
    },
    //删除item
    delItem(item) {
      deleteItem(item.id)
        .then((res) => {
          if (res.data.status == 0) {
            this.$message.success("您已经成功删除");
            this.getList();
          } else {
            this.$message.error("删除失败，请稍后再试");
          }
        })
        .catch((err) => {});
    },
    goDetail(ID) {
      this.$router.push({
        path: "/partyBuild/partStyle/studyDetail",
        query: {
          id: ID,
          name: "学习管理",
        },
      });
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

    //新增学习分类
    newTestSort() {
      this.dialogTitle = "新增学习分类";
      this.testSortVisible = true;
    },
    //关闭学习分类
    testSortClose() {
      this.testSortVisible = false;
    },
    //关闭新增弹窗
    handleClose() {
      this.HistoryVisible = false;
    },
    //分类确定
    submitSort(t) {
      let obj = {
        parentId: this.pId,
        name: this.sortForm.name,
      };
      if (t == "新增学习分类") {
        addTypy(obj)
          .then((res) => {
            this.getTree();
          })
          .catch((err) => {});
      } else if (t == "修改学习分类") {
        editSort(obj)
          .then((res) => {
            this.getTree();
          })
          .catch((err) => {});
      }
      this.testSortVisible = false;
    },
    //关闭考试新增弹窗
    testHandleClose() {
      this.testVisible = false;
    },
    //新增考试
    addTest() {
      this.$router.push({
        path: "/partyBuild/studyManage/addStudy",
        query: {
          state: "add",
        },
      });
    },
    //新建考试确定
    submitTest(type) {
      this.testVisible = false;
      if (type == "手动选题") {
        this.$router.push("/partyBuild/studyManage/addTestHand");
      } else if (type == "自动生成") {
        this.HistoryVisible = true;
      }
    },
    //去新增方案页面
    goPlan() {
      this.$router.push("/partyBuild/studyManage/newTestPlan");
    },

    closeHistory(f) {
      this.HistoryVisible = f;
    },
  },
};
</script>
<style lang="scss" scoped>
.el-icon-location {
  padding: 16px;
}
.bread {
  display: inline-block;
}
.out-box {
  background-color: #fff;
  margin: 24px 24px 0 24px;
  height: 720px;
  position: relative;
}
.content-box {
  display: flex;
  flex-direction: row;
}
.left-box {
  // border-right: 1px solid ;
  min-width: 214px;
}
.line {
  width: 1px;
  height: 100%;
  background-color: #e4e4e4;
  position: absolute;
  top: 0;
  left: 214px;
}
.Menu-title {
  height: 40px;
  line-height: 40px;
  margin: 16px 0 0 24px;
  font-size: 14px;
  font-weight: 400;
}
.circle-btn {
  position: absolute;
  bottom: 48px;
  margin: 0 0 0 80px;
}
.addGroup-btn {
  border: none;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.14);
}
.right-box {
  flex: 1;
  // min-width: 900px;
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
.el-menu {
  border-right: none;
  margin-bottom: 64px;
}

.el-dropdown {
  position: absolute;
  right: 12px;
}
.top-search {
  margin: 24px 0 0 24px;
  width: 200px;
}
.item {
  height: 80px;

  border: 1px solid #ccc;
  border-radius: 4px;
  margin: 24px 24px 0 24px;
}
.name {
  font-size: 14px;
  font-weight: bold;
  color: #333333;
  padding: 16px 0 16px 16px;
}
.auth,
.num,
.date {
  font-size: 10px;
  line-height: 13px;
  color: #999999;
  margin: 16px 16px 0 16px;
}
.btn {
  float: right;
  margin: 0 24px 0 0;
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
.button-box {
  display: flex;
  justify-content: center;
  margin-top: -24px;
}
</style>
<template>
  <div class="out-box">
    <div class="content-box">
      <div class="left-box">
        <div class="Menu-title">考试类别</div>
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
            >发布考试</el-button
          >
        </div>
        <div
          class="item"
          v-for="item in listData"
          :key="item.id"
          @click="goDetail(item.id)"
        >
          <p class="name">{{ item.title }}</p>
          <span class="date">题目数量：{{ item.createdTime }}</span>
          <span class="auth" style="color:#419eef" @click.stop="achievement">成绩分析</span>
          <span class="num" style="color:#419eef" @click.stop="limit">部分可见</span>
          <span class="num" style="color:#419eef" @click.stop="testTime">考试时间</span>
          <div class="btn">
            <i
              v-if="status == 0"
              class="el-icon-circle-check"
              style="padding-left: 12px; color: green"
              @click.stop="editClose(item)"
            ></i>
            <i
              v-else
              class="el-icon-remove-outline"
              style="padding-left: 12px; color: red"
              @click.stop="editStart(item)"
            ></i>
            <i
              class="el-icon-edit"
              style="padding-left: 12px"
              @click.stop="editItem(item)"
            ></i>
            <i
              class="el-icon-delete"
              style="padding-left: 12px"
              @click.stop="delItem(item)"
            ></i>
          </div>
        </div>

        <div class="page">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :page-sizes="[5]"
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
      title="新增考试分类"
      width="20%"
      :visible.sync="testSortVisible"
      :before-close="handleClose"
    >
      <el-form :model="form">
        <el-form-item label="分类名称">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitSort">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 考试权限 -->

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
  components: {
    History,
  },
  data() {
    return {
      active: "", //菜单默认项
      status: null,
      nameSearch: "",
      form: {},
      typeOptions: [],
      type: "手动选题",
      total: 0, // 总页数
      currentPage: 1, // 当前页数
      pageSize: 20, // 每页显示多少条,
      listData: [],
      navList: [],
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
    getTree() {
      let obj = {
        name: "在线考试",
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
          this.listData = res.data.data.articleList;
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
    //成绩分析弹框
    achievement() {},
    //考试权限弹框
    limit() {},
    //设置考试时间弹框
    testTime() {},
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

    //新增考试分类
    newTestSort() {
      this.testSortVisible = true;
    },
    //关闭新增弹窗
    handleClose() {
      this.HistoryVisible = false;
    },
    //分类确定
    submitSort() {
      this.testSortVisible = false;
    },
    //关闭考试新增弹窗
    testHandleClose() {
      this.testVisible = false;
    },
    //新增考试
    addTest() {
      this.testVisible = true;
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
    //去详情页
    goDetail() {
      this.$router.push("/partyBuild/studyManage/testDetail");
    },
    closeHistory(f) {
      this.HistoryVisible = f;
    },
  },
};
</script>
<style lang="scss" scoped>
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
  margin: 16px 0 0 0;
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
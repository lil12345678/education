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
            >替换</el-button
          >
        </div>
        <!-- 替换题目 -->
        <el-table
          v-if="allSelect == true"
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
          <el-table-column
            width="700"
            prop="subjectTitle"
            label="题目"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <span>{{ scope.row.subjectTitle }}</span>
            </template>
          </el-table-column>
        </el-table>
        <!-- 创建考试，手动添加题目 滚动批量选题-->
        <el-table
          v-else
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
          <el-table-column
          width="700"
            prop="subjectTitle"
            label="题目"  show-overflow-tooltip >
             <template slot-scope="scope">
          <span>{{ scope.row.subjectTitle }}</span>
        </template>
          </el-table-column>
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="">
                  <span>{{ props.row.name }}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
           <el-table-column
           fixed="right"
            prop="num"
            label="练习次数">
             <template slot-scope="scope">
          <span>{{ scope.row.num }}</span>
        </template>
          </el-table-column>
        </el-table>
        <div class="button-box">
          <el-button type="primary" @click="selectSubmit" size="mini"
            >确 定</el-button
          >
        </div>
      </div>
    </div>
    <!-- 统计弹框 -->
    <el-dialog
      title="提示"
      width="40%"
      :visible.sync="statisticsDio"
      :before-close="statisticsClose"
    >
      <Statistics
        ref="newAddDio"
        @closestatistics="closestatistics"
      ></Statistics>
    </el-dialog>
  </div>
</template>

<script>
import Statistics from "./newTestStatistics";
import Breadcrumb from "@/components/breadcrumb";
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
  name: "changeTestQ",
  components: {
    Statistics,
    Breadcrumb,
  },
  data() {
    return {
      BreadItems:{},
      active: "", //菜单默认项
      status: null,
      allSelect: false, //替换和手动选题公用一个页面，控制table批量选择列显示
      nameSearch: "",
      DelDia: false,
      showDle: false,
      formInline: {
        user: "",
        region: "",
      },
      typeOptions: [],
      total: 0, // 总页数
      currentPage: 1, // 当前页数
      pageSize: 20, // 每页显示多少条,
      tableData: [],
      multipleSelection: [],
      listData: [
      
      ],
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
      statisticsDio: false,
      navList: [
      ],
    };
  },
   created() {
     this.getTree();
    this.setBreadItems();
   },
  methods: {
     goBack() {
      this.$router.go(-1);
    },
    //添加面包屑
    setBreadItems() {
      this.breadItems = {
        '智慧党建': "/partyBuild",
        '学习管理': "/partyBuild/studyManage",
        '添加测试': "/partyBuild/studyManage/addTestHand",
        '选择题目': "/partyBuild/studyManage/changeTestQ",
      };
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
    //替换
    ChangeClick() {},
    //选完题目保存
    selectSubmit() {
      this.statisticsDio = true;
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
    closestatistics(f) {
      this.statisticsDio = f;
    },
    statisticsClose() {
      this.statisticsClose = false;
    },
  },
};
</script>
<style lang="scss" scoped>
.Menu-title {
  height: 40px;
  line-height: 40px;
  margin: 16px 0 0 24px;
  font-size: 14px;
  font-weight: 400;
}
.top-search {
  width: 200px;
  position: absolute;
  right:120px;
   margin: 24px 24px 24px 0;
   display: inline-block;
}
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
.el-dropdown {
  position: absolute;
  right: 0;
}
.content-box {
  background-color: #fff;
  margin: 24px 24px 0 24px;
  display: flex;
  flex-direction: row;
}
.left-box {
  width: 214px;
  border-right: 1px solid #e4e4e4;
}

.circle-btn {
  height: 40px;
  width: 100%;
  margin: -64px 0 0 112px;
}

.tree-title {
  height: 40px;
  line-height: 40px;
  margin: 16px 0 0 24px;
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
  float: right;
  margin: 24px 24px 24px 0;
}
.button-box {
  display: flex;
  justify-content: center;
  margin: 20px 0;
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
}
.form {
  float: left;
  margin: 24px 0 0 24px;
}
.form /deep/ .el-input__inner {
  height: 32px;
  border-radius: 4px;
}
</style>
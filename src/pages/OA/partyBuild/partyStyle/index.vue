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
        <div class="Menu-title">党风廉政</div>
        <!-- 根据左侧菜单显示相应的内容 -->
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
        <div class="btn-box">
          <el-button
            class="btn1"
            size="mini"
            type="primary"
            @click="createStyle"
            >新增</el-button
          >
        </div>
        <div class="container-box">
          <div class="top-box">
            <el-form :inline="true" :model="formInline" class="form">
              <el-form-item label="时间">
                <el-date-picker
                  class="top-date"
                  size="mini"
                  v-model="formInline.date"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  value-format="timestamp"
                >
                </el-date-picker>
              </el-form-item>
              <el-form-item>
                <el-input
                  class="search"
                  style="height: 24px; width: 240px"
                  v-model="formInline.title"
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
              </el-form-item>
            </el-form>
          </div>
          <div
            class="img-box"
            v-loading="listLoading"
            element-loading-background="rgba(0, 0, 0, 0.5)"
            element-loading-text="图标正在加载中"
          >
            <el-row :gutter="20">
              <el-col :span="6" v-for="item in listData" :key="item.id">
                <div
                  class="item"
                  @click="goDetail(item.id)"
                  @mouseenter="showDelBtn(item.id)"
                  @mouseleave="closeDelBtn"
                >
                  <el-popconfirm
                    confirmButtonText="好的"
                    cancelButtonText="不用了"
                    icon="el-icon-info"
                    iconColor="red"
                    title="这是一段内容确定删除吗？"
                    @onConfirm="saveDel(item.id)"
                  >
                    <el-button
                      slot="reference"
                      type="text"
                      v-show="showId == item.id"
                      @click.stop="showDel"
                      class="delBtn"
                      >删除</el-button
                    >
                  </el-popconfirm>
                  <img class="image" :src="item.picList[0].url" />
                  <p class="title">{{ item.title }}</p>
                  <p class="from">{{ item.createCompanyName }}</p>
                  <p class="date">{{ item.date }}</p>
                  <div class="look-box">
                    <i class="el-icon-view"></i>
                    <span class="look">{{ item.readNum }}</span>
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
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
        @click="newHonorGroup"
      ></el-button>
    </div>

    <!-- 新增荣誉分类 -->
    <el-dialog
      :title="dialogTitle"
      width="40%"
      :visible.sync="newsortDio"
      :before-close="handleClose"
    >
      廉政分类名称：<el-input
        style="width: 75%"
        v-model="sortVal"
        placeholder="请输入内容"
      ></el-input>
      <el-button
        style="margin: 24px 45% 0 45%"
        type="primary"
        @click="saveSort(dialogTitle)"
        size="mini"
        >确 定</el-button
      >
    </el-dialog>
  </div>
</template>

<script>
import Breadcrumb from "@/components/breadcrumb";
import {
  getNewsList,
  addTypy,
  getSortTree,
  editSort,
  deleteSort,
} from "@/api/news";

export default {
  name: "honor",
  components: {
    Breadcrumb,
  },
  data() {
    return {
      breadItems: {},
      showDle: false, //删除按钮隐藏与显示
      formInline: {
        date: "",
        title: "",
      },
      typeOptions: [],
      total: 0, // 总页数
      currentPage: 1, // 当前页数
      pageSize: 20, // 每页显示多少条,
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
      listData: [],
      dialogTitle: "", //公用弹窗的title
      type: "", //公用弹窗
      newsortDio: false,
      dropdownItem: {}, //下拉选项的选中数据对象
      sortVal: "",
      pId: "", //父节点ID
      itemId: "",
      showId: null,
      listLoading: true,
      active: "", //菜单默认项
    };
  },
  created() {
    this.setBreadItems();
    this.init();
    this.getTree();
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
    goBack() {
      this.$router.go(-1);
    },
    //添加面包屑
    setBreadItems() {
      this.breadItems = {
        '智慧党建': "/partyBuild",
        '党风廉政': "/partyBuild/partyStyle",
      };
    },
    getList(params) {
      this.listLoading = true;
      getNewsList(
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
    //出现删除确定弹框
    showDel() {},
    //删除item确定
    saveDel(i) {
      debugger;
      deleteItem(i)
        .then((res) => {
          debugger;
          this.getList();
        })
        .catch((err) => {
          debugger;
        });
    },
    showDelBtn(id) {
      this.showId = id;
    },
    closeDelBtn() {
      this.showId = null;
    },

    //左边菜单选中显示相应的右侧内容
    select(ID) {
      let obj = {
        menuId: ID,
      };
      this.getList(obj);
    },
    //新增item 跳转
    createStyle() {
      this.$router.push("/partyBuild/partyStyle/addStyle");
    },
    //新增分类
    newHonorGroup() {
      this.dialogTitle = "新增廉政分类";
      this.newsortDio = true;
    },
    //获取树,找到分类的父ID
    getTree() {
      let obj = {
        name: "党风廉政",
      };
      getSortTree(obj)
        .then((res) => {
          let arr = res.data.data;
          let tabs = [];
          arr.forEach((e) => {
            this.pId = e.id;
            tabs = e.children;
          });
          let a = [];
          tabs.map((i) => {
            a.push({ name: i.name, id: i.id });
          });
          this.navList = a;
        })
        .catch((err) => {});
    },
    //保存分类
    saveSort(t) {
      if (t == "新增廉政分类") {
        let o = {
          parentId: this.pId,
          name: this.sortVal,
        };
        addTypy(o)
          .then((res) => {
            this.getTree();
            this.newsortDio = false;
          })
          .catch((err) => {});
      } else if (t == "修改廉政名称") {
        let obj = {
          id: this.itemId,
          name: this.sortVal,
        };
        editSort(obj)
          .then((res) => {
            this.getTree();
            this.newsortDio = false;
          })
          .catch((err) => {});
      }
    },
    //关闭新增分类弹窗
    handleClose() {
      this.newsortDio = false;
    },
    //搜索
    search() {
      let params = {
        startTime: this.formInline.date[0],
        endTime: this.formInline.date[1],
        title: this.formInline.title,
      };
      this.getList(params);
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
    //分类下拉框
    handleCommand(a, b) {
      this.itemId = a.id;
      this.dropdownItem = a;
      if (b.index == 0) {
        this.dialogTitle = "修改廉政名称";
        this.newsortDio = true;
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

    //跳转item详情页
    goDetail(Id) {
      this.$router.push({
        path: "/partyBuild/partyStyle/styleDetail",
        query: {
          id: Id,
        },
      });
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
  display: flex;
  flex-direction: row;
}
.left-box {
  border-right: 1px solid #e4e4e4;
  min-width: 214px;
}
.Menu-title {
  height: 40px;
  line-height: 40px;
  margin: 16px 0 0 24px;
  font-size: 14px;
  font-weight: 400;
}
.circle-btn {
  height: 40px;
  width: 100%;
  margin: -48px 0 0 112px;
}
.addGroup-btn {
  border: none;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.14);
}
.right-box {
  flex: 1;
  min-width: 900px;
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
.form {
  float: left;
  margin: 24px 0 0 24px;
}
.form /deep/ .el-input__inner {
  height: 32px;
  border-radius: 4px;
}
.btn-box {
  float: right;
  margin: 24px 24px 0 0;
}
.top-box {
  overflow: hidden;
}
.top-date {
  width: 194px;
}
.img-box {
  text-align: center;

  .item {
    margin: 0 auto;
    width: 211px;
    height: 178px;
    background: #ffffff;
    box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    margin-bottom: 24px;
    position: relative;
  }
  .delBtn {
    position: absolute;
    top: 0;
    left: 12px;
  }
  .image {
    width: 211px;
    height: 118px;
    border-radius: 4px 4px 0 0;
  }
  .title {
    margin-top: 12px;
    font-size: 10px;
    font-weight: bold;
    line-height: 13px;
    color: #333333;
    opacity: 1;
  }
  .from {
    font-size: 8px;

    font-weight: 400;
    line-height: 10px;
    color: #cccccc;
    margin: 8px 0 0 12px;
    text-align: left;
  }
  .date {
    margin: 8px 0 0 12px;
    text-align: left;
    font-size: 8px;
    font-weight: 400;
    line-height: 10px;
    color: #cccccc;
  }
  .look-box {
    float: right;
    margin: -12px 12px 0 0;
    font-size: 7px;
    font-weight: 400;
    line-height: 9px;
    color: #999999;
  }
  .attend {
    float: right;
    margin: -12px 12px 0 0;
  }
  .minute {
    float: right;
  }
}

</style>
<template>
  <div class="box">
    <div style="padding-bottom: 24px; width: 100%">
      <div class="item" v-for="item in courseList" :key="item.id">
        <p class="name">{{ item.name }}</p>
        <span class="date">发布时间：{{ item.createdTime }}</span>
        <span class="auth">发布者：{{ item.createdByName }}</span>
        <span class="num">学习人数：{{ item.num }}</span>
        <el-button class="btn" @click="goDetail(item.id)">去学习</el-button>
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
</template>

<script>
import {
  getNewsList,
  addTypy,
  getSortTree,
  editSort,
  deleteSort,
  deleteItem,
} from "@/api/news";
export default {
  name: "lineQestion",
  props: ["list"],
  data() {
    return {
      courseList: this.list,
      total: 0, // 总页数
      currentPage: 1, // 当前页数
      pageSize: 20, // 每页显示多少条,
    };
  },
  created() {
    this.getTree();
  },
  methods: {
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
          this.courseList = tabs;
        })
        .catch((err) => {});
    },

    goDetail(ID) {
      this.$router.push({
        path: "/partyBuild/studyManage/QDetail",
        query: {
          id: ID,
          name: "党员学习",
        },
      });
    },
    
    //改变页码
    handleSizeChange(size) {
      this.pageSize = size;
      this.getPageData();
    },
    //改变当前页面
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      this.getPageData();
    },
  },
};
</script>
<style lang="scss" scoped>
.box {
  height: 700px;
  background-color: #fff;
}
.course-sort-title {
  float: left;
  padding: 24px;
}
.top-tabs {
  display: inline-block;
  margin: 14px 24px 0 0;
}
.el-tabs /deep/.el-tabs__content {
  left: -80px;
}
.el-tabs /deep/ .el-tabs__nav-wrap::after {
  display: none;
}
.el-tabs /deep/ .el-tabs__active-bar {
  display: none;
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
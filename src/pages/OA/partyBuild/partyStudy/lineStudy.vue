<template>
<div class="box">
  <div style="padding-bottom: 24px;width:100%">
    <p class="course-sort-title">课程类型:</p>
    <el-tabs class="top-tabs" v-model="activeName" @tab-click="handleClick">
      <el-tab-pane
        v-for="i in courseList"
        :key="i.id"
        :label="i.name"
        :name="i.id"
      >
        <div class="course">共{{ total}}个课程</div>
      </el-tab-pane>
    </el-tabs>

    <!-- listData要与courseList相关联 -->
    <div class="item" v-for="item in listData" :key="item.id" >
      <p class="name">{{ item.title }}</p>
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
  name: "lineStudy",
  props: ["list"],
  data() {
    return {
      activeName: "0",
      courseList: this.list,
      listData: [],
       total: 0, // 总页数
      currentPage: 1, // 当前页数
      pageSize: 20, // 每页显示多少条,
    };
  },
  created() {
     this. getTree();
     this. getPageData()
  },
  methods: {
  //获取分类
    getTree() {
      let obj = {
        name: "在线学习",
      };
      getSortTree(obj)
        .then((res) => {
          let arr = res.data.data;
          let tabs = [];
          arr.forEach((e) => {
            this.pId = e.id;
            tabs = e.children;
          });
          let obj = {
            name:'全部',
            id:'0',
          }
            tabs.unshift(obj)
         this.courseList = tabs;
        })
        .catch((err) => {});
    },
     //获取itemlist
    getPageData(id) {
      let params = {
        menuId: id,
      };
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
    handleClick(tab, event) {
        let id = tab.name
        if(id == 0){
          this.getPageData()
        }else{
          this.getPageData(id)
        }
        
    },
    goDetail(ID){
        this.$router.push({
            path:'/partyBuild/studyManage/studyDetail',
            query:{
                 id: ID,
                 name:'党员学习'
            }
        })
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
.box{
    height:700px;
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
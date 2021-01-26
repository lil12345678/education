<template>
<div >
  <div class="top">
            <i class="icon el-icon-location"></i>
            <Breadcrumb class="bread" :items="breadItems"></Breadcrumb>
             <div class="back" @click="goBack">
    <i class="el-icon-refresh-left"></i><span>返回</span>
    </div>
  </div>
  <div>
    <div class="btn-box" >
      <el-button class="btn1" v-if="tabState == '1'" size="mini" type="primary" >在线学习</el-button>
      <el-button class="btn1" v-else size="mini"  @click="showParty">在线学习</el-button>
      <el-button class="btn2" v-if="tabState == '2'" size="mini" type="primary" plain >在线题库</el-button>
      <el-button class="btn2" v-else size="mini"  plain @click="showTop" >在线题库</el-button>
       <el-button class="btn2" v-if="tabState == '3'" size="mini" type="primary" plain >在线考试</el-button>
      <el-button class="btn2" v-else size="mini"  plain @click="showOrg" >在线考试</el-button>
    </div>
   
    <div class="table-box">
     <LineStudy v-if="tabState == '1'" :studyId='studyId' :list='list'></LineStudy>
     <LineQuestion v-if="tabState == '2'" :quesId='quesId' :list='list'></LineQuestion>
     <LineTest v-if="tabState == '3'" :testId='testId' :list='list'></LineTest>
    </div> 
  </div>
</div>
</template>
<script>
import Breadcrumb from '@/components/breadcrumb';
import LineStudy from "./lineStudy";
import LineQuestion from "./lineQuestion";
import LineTest from './lineTest';
import {
  getNewsList,
  addTypy,
  getSortTree,
  editSort,
  deleteSort,
  deleteItem,
} from "@/api/news";
export default {
  name: "partyPer",
  components: {
    LineStudy,
    LineQuestion,
    LineTest,
    Breadcrumb
  },
  data() {
    return {
      breadItems:{},
        tabState:'1',
        studyId:'',
        quesId:'',
        testId:'',
        list:[],
    };
  },
    created(){
      this.setBreadItems();
      this.getTree();
    },
  methods: {
    goBack(){
       this.$router.go(-1);
    }, 
     //添加面包屑
      setBreadItems(){
            this.breadItems = {
          '智慧党建':'/partyBuild',
          '党员学习':'/partyBuild/partyStudy'
        }
        
      },

       //获取分类
       getTree() {
      let obj = {
        name: "党员学习",
      };
      getSortTree(obj)
        .then((res) => {
          let arr = res.data.data;
          let tabs = [];
          arr.forEach((e) => {
            this.pId = e.id;
            tabs = e.children;
          });
          tabs.forEach(i => {
            if(i.name == '在线学习'){
              this.studyId= i.id;
            }else if (i.name == '在线题库'){
              this.quesId= i.id;
            }else if (i.name == '在线测试'){
              this.testId= i.id;
            }
          })
          
         
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
          this.list = res.data.data.articleList;
          this.total = res.data.data.total;
          this.listLoading = false;
        })
        .catch((err) => {
          this.listLoading = false;
        });
    },
      //在线学习
    showParty() {
      this.tabState = '1';
      this.getPageData(this.studyId)
    },
    //在线题库
    showTop() {
      this.tabState = '2';
      this.getPageData(this.quesId)
    },
    //在线考试
    showOrg(){
        this.tabState = '3';
        this.getPageData(this.testId)
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
.bread{
    display: inline-block;
}
.back{
  float: right;
  line-height: 40px;
  margin-right: 64px;
}
.btn-box {
  margin: 24px 0 0 24px;
}
.btn2 {
  display: inline-block;
}
.table-box {
  margin: 24px 24px 0 24px;
  background-color: #fff;
}
</style>

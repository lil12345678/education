<template>
<div>
  <div class="top">
            <i class="icon el-icon-location"></i>
            <Breadcrumb class="bread" :items="breadItems"></Breadcrumb>
             <div class="back" @click="goBack">
    <i class="el-icon-refresh-left"></i><span>返回</span>
    </div>
  </div>
  <div class="container-box">
    <el-input class="search" style="height:24px;width:240px" v-model="searchInput" placeholder="请输入新闻标题" @keyup.enter.native="search" >
             <i
              class="el-icon-search el-input__icon"
              slot="suffix"
              @click="search">
            </i>
           </el-input>
      <div class="tableBtn-box">
        <el-button class="btn1" size="mini" type="primary" @click="addNews">发布新闻</el-button>
        <el-button class="btn1" size="mini" type="primary" @click="del">删除</el-button>
      </div>
        <el-table
        class="table"
            ref="multipleTable"
            :data="tableData"
            tooltip-effect="dark"
            style="width: 100%;margin-top:24px"
            @select="handleSelectionChange"
             @select-all="handleSelectionChange"
            :header-cell-style="{background:'#f8f8f9'}"
      :row-style="{height:'40px'}"
      :cell-style="{padding:'0px'}">
            <el-table-column
            type="selection" align="center"
            width="55">
            </el-table-column>
            <el-table-column
            label="新闻标题" align="center"
          >
            <template slot-scope="scope">{{ scope.row.title }}</template>
            </el-table-column>
            <el-table-column
            prop="createdTime" align="center"
            label="发布日期"
          
          >
            </el-table-column>
            <el-table-column
            prop="createdCompany" align="center"
            label="发布单位"
            >
            </el-table-column>
            <el-table-column
            prop="readNum" align="center"
            label="阅读次数"
            >
            </el-table-column>
            <el-table-column  fixed="right" label="操作">
      <template slot-scope="scope">
        <el-button @click="top(scope.row)" type="text" size="small">置顶</el-button>
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
      >
      </el-pagination>
    </div>
  </div>
  </div>
</template>

<script>
import Breadcrumb from '@/components/breadcrumb';
import {deleteBatchIds,getNewsList,editNews} from '@/api/news'
import axios from '@/router/axios'
export default {
  name: "partyPer",
  components: {
    Breadcrumb
  },
  data() {
    return {
      breadItems:{},//面包屑组件传入的值
        searchInput:'',
        activeName:"first",
        showPartyBtn:true,
        total: 0, // 总页数
      currentPage: 1, // 当前页数
      pageSize: 20, // 每页显示多少条,
        tableData: [
          // {
          //   id:1,
          //   title:'aaaa'
          // },
          // {
          //   id:2,
          //   title:'aaaa'
          // }
        ],
        multipleSelection: [],
        addDialogVisible:false,
    };
  },
  created(){
      this.setBreadItems();
      this.getList();
    },
  methods:{
      goBack(){
       this.$router.go(-1);
    }, 
    //添加面包屑
      setBreadItems(){
        this.breadItems = {
          '智慧党建':'/partyBuild',
          '党建新闻':'/partyBuild/news',
          '新闻管理':'/partyBuild/news/newsManage',
        }
        
      },
      //获取表格数据
       getList(params){
      this.listLoading = true;
      getNewsList(
         Object.assign(
          {
            current: this.currentPage,
            size: this.pageSize,
          },
          params
        )
      ).then( res =>{
        this.tableData = res.data.data.articleList;
        this.total = res.data.data.total;
        this.listLoading = false;
      }).catch( err =>{
        this.listLoading = false;
      })
    },
    //查询
    search(){
      let obj = {title:this.searchInput}
      this.getList(obj);
    },
 //发布新闻
      addNews(){
        this.$router.push('/partyBuild/news/newAdd')
      },
     //批量删除
      del(){
        debugger
        let arr = this.multipleSelection;
        let p = ''
        arr.forEach(e => {
          p += (e.id + ',');
        })
        deleteBatchIds(p).then(res => {
          debugger
        }).catch(err =>{
          debugger
        })
      },
      //置顶
      top(row){
        debugger
        let obj = {
          id:row.id,
          top:1
        }
        editNews(obj).then(res => {
          debugger
          this.getList()
        }).catch(err => {
          console.log(err)
        })
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
    //
    handleClick(){},
    //关闭新增弹窗
    handleClose(){
this.addDialogVisible = false
    },
    //关闭新增弹窗
    closeAddDio(f){
      this.addDialogVisible = f;
    },
  }
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
.container-box{
background-color: #fff;
margin:24px 24px 0 24px;
}
.search {
   margin: 24px 0 24px 24px;
}
.tableBtn-box {
    display: inline-block;
  float: right;
  margin: 24px 24px 0 0;
}
.page{
    width:100%;
    height:80px;
    background-color: #fff;
}
.el-pagination{
    float:right;
  
      margin:24px 24px 0 0;
}
</style>
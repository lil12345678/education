
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
           <el-button class="btn" size="mini" type="primary" @click="goManage">管理新闻</el-button>
        <div class="list-item"  v-for="i in listData" :key="i.id" @click="goDetail(i.id)" v-loading="listLoading">
            <div class="left" >
              <img class="img" :src="i.picList[0].url" />   
            </div>
            <div class="right-box">
                <p class="title">{{i.title}}</p>
                <p class="auth">发布者：{{i.createdBy}}</p>
                <div class="view"><i class="el-icon-view"></i><span>{{i.commentNum}}</span></div>
            </div>
            <p class="date">{{i.createdTime}}</p>
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
import Breadcrumb from '@/components/breadcrumb';
import {getNewsList} from '@/api/news'
export default {
    name:'newsList',
    components:{
Breadcrumb,
    },
    data(){
        return{
           breadItems:{},//面包屑组件传入的值
            searchInput:'',
            total: 0, // 总页数
            currentPage: 1, // 当前页数
            pageSize: 10, // 每页显示多少条,
            listData:[],
            listLoading:true,
        }
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
          '党建新闻':'/partyBuild/news'
        }
        
      },
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
        this.listData = res.data.data.articleList;
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

       
        goDetail(ID){
            this.$router.push({
              path:'/partyBuild/news/detail',
              query:{
                id:ID
              }
            })
        },
        goManage(){
           this.$router.push('/partyBuild/news/newsManage')
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
    }
}
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
.btn{
  float: right;
  margin: 24px 24px 0 0 ;
}
.list-item{
    height:162px;
    border-bottom: 1px solid #ccc;
}
.left{
    float: left;
}
.img{
    width:208px;
    height:112px;
    margin:24px 0 0 24px;
}
.right-box{
    float: left;
    margin-left:40px;
}
.title{
font-size: 20px;
font-weight: bold;
color: #333333;
margin-top:24px;
}
.auth{
font-size: 10px;
color: #999999;
margin:10px 0 24px 0;
}
.date{
    float: right;
    margin:24px 24px 0 0;
font-size: 10px;
color: #999999;
}
.view{
font-size: 10px;
color: #999999;
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
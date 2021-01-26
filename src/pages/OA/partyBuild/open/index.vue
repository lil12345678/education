<template>
    <div >
        <div class="top">
            <i class="icon el-icon-location"></i>
            <Breadcrumb class="bread" :items="breadItems"></Breadcrumb>
             <div class="back" @click="goBack">
    <i class="el-icon-refresh-left"></i><span>返回</span>
    </div>
        </div>
        <div class="content-box">
        <div class="title">校务公开</div>
        
        <div  class="btn-box">
            <el-button class="btn2" size="mini" type="primary" @click="newAdd">新增</el-button>
            <el-button class="btn1" size="mini" type="primary" @click="del">删除</el-button>
        </div>
         <el-table
        class="table"
            ref="multipleTable"
            :data="tableData"
            tooltip-effect="dark"
        
            @selection-change="handleSelectionChange"
            :header-cell-style="{background:'#f8f8f9'}"
      :row-style="{height:'40px'}"
      :cell-style="{padding:'0px'}">
            <el-table-column
            type="selection" align="center"
            width="55">
            </el-table-column>
            <el-table-column
            label="标题" align="center"
            width="120">
            <template slot-scope="scope">{{ scope.row.title }}</template>
            </el-table-column>
            <el-table-column
            prop="createdCompany" align="center"
            label="发布单位"
            width="120">
            </el-table-column>
            <el-table-column
            prop="createdTime" align="center"
            label="发布时间"
            show-overflow-tooltip>
            </el-table-column>
            <el-table-column  fixed="right" label="操作">
      <template slot-scope="scope">
        <el-button @click="check(scope.row)" type="text" size="small">查看</el-button>
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
      ></el-pagination>
    </div>
        </div>
    </div>
</template>

<script>
import Breadcrumb from '@/components/breadcrumb';
import {getNewsList, editNews, deleteBatchIds} from '@/api/news'
export default {
    name:'open',
    components:{
Breadcrumb
    },
    data(){
        return{
          breadItems:{},//面包屑组件传入的值
             formInline: {
          user: '',
          region: ''
        },
        typeOptions:[],
         total: 0, // 总页数
      currentPage: 1, // 当前页数
      pageSize: 20, // 每页显示多少条,
        tableData: [],
        multipleSelection: [],
        }
    },
    created(){
      this.setBreadItems();
      this.getList();
    },
     methods: {
          goBack(){
       this.$router.go(-1);
    }, 
    //添加面包屑
      setBreadItems(){
        this.breadItems = {
          '智慧党建':'/partyBuild',
          '校务公开':'/partyBuild/open'
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
        this.tableData = res.data.data.articleList;
        this.total = res.data.data.total;
        this.listLoading = false;
      }).catch( err =>{
        this.listLoading = false;
      })
    },
      //新增
      newAdd(){
          this.$router.push('/partyBuild/open/openAdd')
      },
       //删除
      del(){

      },
      //查看
      check(row){
        //  this.$router.push('/partyBuild/open/detail')
          this.$router.push({
              path:'/partyBuild/open/detail',
              query:{
                id:row.id
              }
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
.content-box{
background-color: #fff;
margin:24px 24px 0 24px;
}
.title{
    font-size: 16px;
    padding:24px 0 0 24px;
}
.classA /deep/ .el-input__inner{
    width:216px;
    border-radius: 4px;
    // margin: 0 0 24px 0;
}
.btn-box {
    //display: inline-block;
  float: right;
  margin: -24px 24px 0 0;
  padding-bottom: 24px;
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
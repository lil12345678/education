<template>
    <div>
        <div class="top">
            <i class="icon el-icon-location"></i>
            <Breadcrumb class="bread" :items="breadItems"></Breadcrumb>
             <div class="back" @click="goBack">
    <i class="el-icon-refresh-left"></i><span>返回</span>
    </div>
  </div>
        <div class="detail-box" >
            <p class="title">{{this.title}}</p>
            <p class="from">{{this.createdCompany}}</p>
            <p class="date">{{this.createdTime}}</p>
            <div class="view">
            <i class="el-icon-view"></i>
            <span class="look">{{this.readNum}}</span>
            </div>
            <div class="line"></div>
            <div class="text" v-html="this.content">{{this.content}}</div>
        </div>
    </div>
</template>

<script>
import {getDetail} from '@/api/news.js';
import Breadcrumb from '@/components/breadcrumb';
export default {
    name:'newsDetail',
     components: {
    Breadcrumb
  },
    data(){
        return{     
            breadItems:{},//面包屑组件传入的值    
          title: "",
          createdCompany: "",
          createdTime: "",
          readNum: "",
            content:''
        }
    },
    created(){
        this.setBreadItems();
        this.getpageDetail()
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
          '新闻详情':'/partyBuild/news/detail',
        }
        
      },
        getpageDetail(){
            let I  = {id : this.$route.query.id}
            getDetail(I).then(res => {
              debugger
              this.title = res.data.data.title;
              this.createdCompany = res.data.data.createdCompany
              this.createdTime = res.data.data.createdTime;
              this.readNum = res.data.data.readNum;
              this.content = res.data.data.content;
            }).catch(err => {

            })

            
        }
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
.detail-box{
    background-color: #fff;
    margin:24px 24px 0 24px;
}
.title{
height: 25px;
font-size: 20px;
font-weight: bold;
line-height: 25px;
color: #333333;
padding:24px 0 0 24px;
}
.from{
height: 18px;
font-size: 14px;
font-weight: 400;
padding:24px 0 0 24px;
color: #999999;
}
.date{
height: 18px;
font-size: 14px;
padding:14px 0 0 24px;

font-weight: 400;
color: #CCCCCC;
}
.view{
   float:right;
   margin:-24px 24px 0 0;
height: 10px;
font-size: 8px;
font-weight: 400;
line-height: 10px;
color: #999999;
}
.line{
  width:100%;
  height:1px;
  background-color: #ccc;
}
</style>
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
      <div class="title-box">
        <div class="rectangle"></div>
        <div class="TTtitle">详情</div>
      </div>

      <div class="item">
        <span class="left">事务名称:</span>
        <span class='right'>{{ this.title }}</span>
      </div>
      <div class="item">
        <span class="left">公开范围:</span>
        <span class='right'>{{ this.scope }}</span>
      </div>
      <div class="item linkItem">
        <div class="left">附件:</div>
        <div class="right " v-for= 'i in fileList' :key="i.id">
        <a class="link" :href="i.url">{{i.url}}</a>
        </div>
      </div>
      <div class="item contentItem">
        <div class="left">提案内容:</div>
        <span class='right' v-html="this.content">{{ this.content }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import Breadcrumb from '@/components/breadcrumb';
import {getDetail} from '@/api/news.js';
export default {
  name: "openDetail",
  components: {
    Breadcrumb
  },
  data() {
    return {
      breadItems:{},//面包屑组件传入的值   
      title: "aaaaa",
      scope: "全校公开",
      fileList: [
        {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'},
        {name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, 

        ],
      content: "<p>aaaaaa</p>",
    };
  },
   created(){
        this.setBreadItems();
        //this.getPage()
    },
    methods:{
          goBack(){
       this.$router.go(-1);
    }, 
    //添加面包屑
      setBreadItems(){
        this.breadItems = {
          '智慧党建':'/partyBuild',
          '校务公开':'/partyBuild/open',
          '校务详情':'/partyBuild/open/detail',
        }
        
      },
        // getPage(){
        //      let I  = {id : this.$route.query.id}
        //     getDetail(I).then(res => {
        //       this.title = res.data.data.title;
        //       this.createdCompany = res.data.data.createdCompany
        //       this.createdTime = res.data.data.createdTime;
        //       this.readNum = res.data.data.readNum;
        //       this.content = res.data.data.content;
        //     }).catch(err => {

        //     })
        // }
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
.container-box {
  background-color: #fff;
  margin: 24px 24px 0 24px;
  padding-bottom: 24px;
}
.title-box{
  margin-bottom: 42px;
}
.rectangle {
  float: left;
  margin: 24px 0 0 24px;
  height: 20px;
  width: 4px;
  background: linear-gradient(
    to bottom,
    rgb(138, 206, 252) 0%,
    rgb(13, 135, 248) 60%
  );
}
.TTtitle {
  display: inline-block;
  margin: 24px 0 0 24px;
  font-size: 16px;
  font-weight: 400;
  color: #333333;
}
.item{
  height:40px;
  margin-left:24px;
  font-size: 14px;
  line-height: 40px;
  display:flex;
  flex-direction: row;
}
.left{
  font-weight: 700;
  width: 100px;
}

a{
  display:block;
 width:120px;
 height:40px;
   overflow: hidden;
}
.right{
  flex:1;
}
.upload-demo{
}
</style>
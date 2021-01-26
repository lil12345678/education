<template>
  <div>
      <div class="top-box">
      <el-form :inline="true" :model="formInline" class="form">
  <el-form-item label="时间">
    <el-date-picker
    class="top-date"
    size='mini'
      v-model="formInline.value1"
      type="daterange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
    >
   
    </el-date-picker> 
    </el-form-item>
  <el-form-item label="">
    <el-input
      class="search"
      style="height: 24px"
      v-model="formInline.searchInput"
      placeholder="请输入内容"
    ></el-input>
      </el-form-item>
</el-form>  
<!-- <div class="btn-box">
      <el-button class="btn1" size="mini" type="primary" @click="admin"
        >管理</el-button
      >
    </div>  -->
      </div>
  <div class="content-box">
    <el-row :gutter="20">
              <el-col :span='6'  v-for="item in listData" :key="item.id">
       <div class="item" @click="goDetail">
       <img class="image" :src="item.url" />
       <p class="title">{{ item.title }}</p>
            <p class="from">{{ item.from }}</p>
            <p class="date">{{ item.date }}</p>
            <div class="look-box">
           <i class="el-icon-view"></i>
           <span class="look">{{ item.look }}</span>
            </div>
       </div>
    </el-col>
    </el-row>
  </div>
  </div>
</template>

<script>
export default {
  name: "goodParty",
  data() {
    return {  
        formInline:{
            value1:'',
searchInput: "",
        },
      
      listData: [
        {
          //url: require(""),
          title: "[优秀党员]雪域高原传真情，重返岗位再出发",
          from: "****党支部",
          id: 0,
          date: "2020-01-13",
          look: "220",
        },
        {
          //url: require(""),
          title: "[优秀党员]雪域高原传真情，重返岗位再出发",
          from: "****党支部",
          id: 1,
          date: "2020-01-13",
          look: "220",
        },
        {
          //url: require(""),
          title: "[优秀党员]雪域高原传真情，重返岗位再出发",
          from: "****党支部",
          id: 2,
          date: "2020-01-13",
          look: "220",
        },
        {
          //url: require(""),
         title: "[优秀党员]雪域高原传真情，重返岗位再出发",
          from: "****党支部",
          id: 3,
          date: "2020-01-13",
          look: "220",
        },
        {
          //url: require(""),
         title: "[优秀党员]雪域高原传真情，重返岗位再出发",
          from: "****党支部",
          id: 4,
          date: "2020-01-13",
          look: "220",
        },
      ],
    
    }
  },
  methods: {
    admin() {
        this.$router.push('/partyBuild/honor/honorSort')
    },
    goDetail(){
      this.$router.push('/partyBuild/honor/detail')
    }
  },
};
</script>
<style lang="scss" scoped>
.form{
    float: left;
    margin:24px 0 0 24px;
}
.form /deep/ .el-input__inner {
    height:32px;
    border-radius: 4px;
}
.btn-box{
float: right;
margin:24px 24px 0 0;
}
.top-box{
    overflow: hidden;
}
.top-date{
width:194px;
}
.content-box{
    text-align: center;
    .item{ margin: 0 auto;
        width: 261px;
        height: 244px;
        background: #FFFFFF;
        box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.1);
        border-radius: 4px;
        margin-bottom: 24px;
    }
    .image{
        width: 260px;
        height: 170px;
        border-radius: 4px 4px 0 0;
    }
    .title{
        margin-top: 12px;
font-size: 10px;
font-weight: bold;
line-height: 13px;
color: #333333;
opacity: 1;
    }
    .from{

font-size: 8px;

font-weight: 400;
line-height: 10px;
color: #CCCCCC;
margin: 8px 0 0 12px;
text-align: left;
    }
    .date{
margin: 8px 0 0 12px;
text-align: left;
font-size: 8px;
font-weight: 400;
line-height: 10px;
color: #CCCCCC;

    }
    .look-box{
        float:right;
        margin:-12px 12px 0 0;
font-size: 7px;
font-weight: 400;
line-height: 9px;
color: #999999;
    }
}

</style>
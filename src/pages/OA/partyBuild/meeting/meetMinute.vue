<template>
    <div class="container-box">
        <div class='title-box'>
            <div class="rectangle"></div>
            <div class="TTtitle">会议纪要</div>
        </div>
        <div class="top-box">
            <div class="top-left">
                <img class="img" :src="url" />
            </div>
            <div class="right">
                <p class="name">会议纪要</p>
                <p class="name">会议时间</p>
                <p class="name">会议室</p>
                <p class="name">主持人</p>
                <p class="name">记录人</p>
            </div>
        </div>
        <div class="table-box">
             <el-tabs v-model="activeName" >
    <el-tab-pane label="会议纪要" name="first">
         <quill-editor 
      v-model="content" 
      ref="myQuillEditor" 
      :options="editorOption" 
   >
    </quill-editor>
    </el-tab-pane>
    <el-tab-pane label="人员出勤情况" name="second">
      <Attend></Attend>
    </el-tab-pane>
  </el-tabs>

        </div>
    </div>
</template>

<script>
import Attend from './attend'
export default {
    name:'meetMunite',
    components:{
        Attend,
    },
    data(){
        return{
            attendSearch:'',
            nameSearch:'',
            url:'',
            activeName:'first',
            content:'',
             editorOption:{},
        }
    },
    methods:{
        handleClick(){}
    }
}
</script>

<style lang="scss" scoped>
.container-box{
    background-color: #fff;
    margin:24px 24px 0 24px;
    padding-bottom: 24px;
}
.rectangle{
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
  .TTtitle{ 
        display: inline-block;
        margin: 24px 0 0 24px;
        font-size: 16px;
        font-weight: 400;
        color: #333333;
  }
  .top-box{
      display: flex;
      flex-direction: row;
      margin-bottom: 24px;
  }
  .top-left{
      width:325px;
  }
  .img{
      width: 260px;
height: 155px;
margin: 24px 0 0 24px;
  }
  .top-right{
      flex:1;
  }
  .name{
      font-size: 14px;
  }

</style>
<template>
    <div class="container-box">
        <p class="name">会议名称</p>
        <p class="name">会议时间</p>
        <p class="name">会议类型</p>
        <p class="name">会议室</p>
        <p class="name">主持人</p>
        <p class="name">记录人</p>
        <p class="name">参会人</p>
         <p class="name">参会人</p>
         <el-upload
  class="upload-demo"
  action="https://jsonplaceholder.typicode.com/posts/"
  :on-change="handleChange"
  :file-list="fileList">
  
</el-upload>
    </div>
</template>
<script>
export default {
    name:'meetingDetail',
    components:{

    },
    data(){
        return{
            fileList:[
                {
          name: 'food.jpeg',
          url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        }, 
            ]
        }
    },
    methods:{
        handleChange(){}
    }
}
</script>

<style lang="scss" scoped>
.container-box{
     background-color: #fff;
    margin:24px 24px 0 24px;
    padding-bottom: 24px;
}
</style>
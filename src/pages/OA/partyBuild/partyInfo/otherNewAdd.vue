<template>
    <div>
     <div style="width:100%;height:1px;background-color:#ccc;margin-bottom:24px"></div>
   <el-input class="addSearch search" style="height:24px" v-model="addSearchInput" placeholder="请输入内容" ></el-input>
   <div class="searcPerInfo">
     <el-avatar class="avatar" :size="32" :src="circleUrl"></el-avatar>
     <span class="name">{{name}}</span>
     <span class="sex">{{sex}}</span>
     <span class="address">{{address}}</span>
     <span class="num">{{num}}</span>
   </div>
   <div style="width:100%;height:1px;background-color:#ccc;margin-bottom:24px"></div>
      <el-form  :model="formInline" label-width="80px">
        <el-row>
          <el-col :span='12'>
            <el-form-item label="类别" label-width="80px">
                <el-select v-model="formInline.dsType" placeholder="请选择" >
                      <el-option
                        v-for="item in typeOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      ></el-option>
                    </el-select>
            </el-form-item>
          </el-col>
          <el-col :span='12'>
            <el-form-item label="组织">
                <el-select v-model="formInline.dsType" placeholder="请选择" >
                      <el-option
                        v-for="item in typeOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      ></el-option>
                    </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>                                                                                                                        
  <div class="button-box">
    <el-button type="primary" @click="addSubmit" size="mini">确 定</el-button>
  </div>
</div>
</template>
<script>
export default {
    name:'',
    data(){
        return{
            checked:true,//党员勾选
            formInline:{},
        addSearchInput:'',
        typeOptions:[],
        circleUrl:'',
        name:'萱萱',
        sex:'女',
        address:'湖北武汉',
        num:'421022817716621233',
        }
    },
    methods:{
    //新增提交表单
    addSubmit(){
 this.$emit('closeAddDio',false)
    },
    //关闭弹窗
    close(){
        this.$emit('closeAddDio',false)
    },
    }
}
</script>
<style lang="scss" scoped>
.addSearch /deep/ .el-input__inner{
    width: 216px;
    border-radius: 4px;
    margin: 0 0 24px 0;
}
.searcPerInfo{
  height:40px;
  margin: 24px 0;
  .avatar{
      float: left;
  }
    .name, .sex, .address, .num{
        float:left;
      margin:6px 0 0 66px ;
  }

}
.check{
  margin-bottom: 24px;
}
.el-form-item{
  margin-bottom: 16px;
}
.el-row{
  margin-bottom: 0;
}
.button-box{
     display: flex;
      justify-content: center;
      margin-top: 20px;
}
</style>
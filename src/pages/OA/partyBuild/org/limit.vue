<template>
    <div>
   <div style="width:100%;height:1px;background-color:#ccc;margin-bottom:24px"></div>
   <el-tree
   class="tree"
  :data="data"
  show-checkbox
  node-key="id"
  ref="tree"
  highlight-current
  :props="defaultProps"
  accordion>
</el-tree>
          <div class=" line"></div>                                                                 
  <div class="button-box">
    <el-button type="primary" @click="addSubmit" size="mini">确 定</el-button>
  </div>

</div>
</template>
<script>
import {Menu} from '../../../../const/menu'
export default {
    name:'limit',
    data(){
        return{
      showVefity:false,
       data: [{
          id: 1,
          label: '党员信息管理',
          children: [{
            id: 4,
            label: '党员信息新增',
          },
          {
            id: 4,
            label: '党员信息修改',
          },]
        }, {
          id: 2,
          label: '党费管理',
          children: [{
            id: 5,
            label: '党费修改'
          }, {
            id: 6,
            label: '党费删除'
          }]
        }, {
          id: 3,
          label: '组织管理',
          children: [{
            id: 7,
            label: '二级 3-1'
          }, {
            id: 8,
            label: '二级 3-2'
          }]
        }],
      defaultProps: {
          children: 'children',
          label: 'label'
        },
        
        }
    },
    created(){
      this.handleData();
    },
    methods:{
      //处理treeData
      handleData(){
},
varityChange(id){},
    //新增提交表单
    addSubmit(){
 this.$emit('closeLimitDio',false)
    },
    //关闭弹窗
    close(){
        this.$emit('closeLimitDio',false)
    },
    //用户搜索新增党员基础信息显示表格
    }
}
</script>
<style lang="scss" scoped>
.box{
  display: flex;
  flex-direction: row;
}
.left{
  width: 214px;
}
.right{
  flex: 1;
}
.button-box{
     display: flex;
      justify-content: center;
      margin-top: 20px;
}

.tree /deep/.el-tree-node__children{
    position: absolute;
    top:0;
    left:30%;
}
.line{
  height:60%;
  width:1px;
  border-right: 1px solid #e4e4e5;
  position: absolute;
  top:30%;
  left:30%;

}
</style>
<template>
    <div>
   <div style="width:100%;height:1px;background-color:#ccc;margin-bottom:24px"></div>
      <el-form  :model="form" label-width="80px">
          <el-row>
              <el-col :span="24">
            <el-form-item label="组织名称" label-width="80px" style="width:200">
                 <el-input v-model="form.name" autocomplete="off" ></el-input>
            </el-form-item>
              </el-col>
</el-row>
<el-row>
              <el-col :span="24">
            <el-form-item label="上级组织">
               <el-select
                      v-model="form.parentId">
                      <el-option
                        v-for="item in treeData"
                        :key="item.oid"
                        :label="item.organizeName"
                        :value="item.oid"
                      >
                        <el-tree
                          ref="selectTree"
                          :data="treeData"
                          :props="defaultProps"
                          default-expand-all
                          @node-click="handleNodeClick"
                        >
                          <span class="custom-tree-node" slot-scope="{ node, data }">
                            <span>{{ data.name || "" }}</span>
                          </span>
                        </el-tree>
                      </el-option>
                    </el-select>
            </el-form-item>
                   </el-col>
</el-row>
      </el-form>                                                                                                                        
  <div class="button-box">
    <!-- <el-button @click="close" size="mini">取 消</el-button> -->
    <el-button type="primary" @click="addSubmit" size="mini">确 定</el-button>
  </div>
<!-- </el-dialog> -->
</div>
</template>
<script>
import {getOrg,orgList} from '@/api/org.js'
export default {
    name:'addGroup',
    props:['OID'],
    data(){
        return{
        form:{
          organizeName:'',
          parentId:''
        },
        treeData:'',
        typeOptions:[],
        closeAdd:false,
         defaultProps: {
        children: "children",
        label: "label",
      },
        }
    },
    created(){
      this.getdropDown()
    },
    methods:{
      //下拉框为整棵树
      getdropDown(){
        let obj = {
        schoolId: 1,
        organizeType: 2,
      };
      orgList(obj)
        .then((res) => {
          let data = [];
          data.push(res.data.data);
          this.treeData = data
        })
        .catch((err) => {});
      },
      //选择上级组织树
      handleNodeClick(){

      },
    //新增提交表单
    addSubmit(){
 this.$emit('closeAddDio',this.closeAdd, this.form)
    },
    //关闭弹窗
    close(){
        this.$emit('closeAddDio',false)
    },
    //用户搜索新增党员基础信息显示表格
     setCurrent(row) {
        this.$refs.singleTable.setCurrentRow(row);
      },
      handleCurrentChange(val) {
        this.currentRow = val;
      }
    }
}
</script>
<style lang="scss" scoped>

.button-box{
     display: flex;
      justify-content: center;
      margin-top: 20px;
}

</style>
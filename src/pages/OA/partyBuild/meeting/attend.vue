<template>
    <div>
          <el-select v-model="attendSearch" placeholder="请选择" >
                      <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                     <el-input
    size="mini" class="top-search"
    placeholder="请输入内容"
    suffix-icon="el-icon-search" v-model="nameSearch" ></el-input>
         <el-table
        class="table"
            :data="tableData"
            tooltip-effect="dark"
            :header-cell-style="{background:'#f8f8f9'}"
      :row-style="{height:'40px'}"
      :cell-style="{padding:'0px'}">
          
            <el-table-column
            label="姓名" align="center"
            width="120">
            <template slot-scope="scope">{{ scope.row.name }}</template>
            </el-table-column>
            <el-table-column
            prop="name" align="center"
            label="出勤"
            width="120">
            <template slot-scope="scope">
                 <el-select v-model="scope.row.address" placeholder="请选择" >
                      <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      ></el-option>
                    </el-select>
            </template>
            </el-table-column>
            <el-table-column
            prop="address" align="center"
            label="备注"
            show-overflow-tooltip>
            <template slot-scope="scope">
      <div class="input-box">
         <el-input size="small" v-model="scope.row.description" ></el-input>
      </div>
      <span>{{scope.row.description}}</span>
   </template>
            </el-table-column>
        </el-table>
         <el-button @click=" handleClick"  size="small">提交</el-button>
    </div>
</template>
<script>

export default {
    name:'attend',
    data(){
        return{
            attendSearch:'',
            nameSearch:'',
            url:'',
            activeName:'first',
            content:'',
             editorOption:{},
              tableData: [
                  {
          date: '2016-05-04',
          name: '王小虎',
          address: '1'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '2'
        }, {
          date: '2016-05-08',
          name: '王小虎',
          address: '1'
        }, {
          date: '2016-05-06',
          name: '王小虎',
          address: '1'
        }, {
          date: '2016-05-07',
          name: '王小虎',
          address: '2'
        }
              ],
               options: [{
          value: '1',
          label: '出勤'
        }, {
          value: '2',
          label: '缺勤'
        }],
        }
    },
    methods:{
        handleClick(){}
    }
}
</script>
<style lang="scss" scoped>
.top-search{
  width:200px;float:right;
}
.table{
  width: 100%;margin-top:24px;
}
.el-select /deep/ .el-input__icon{
  height:30px;
  line-height: 30px;
}
</style>
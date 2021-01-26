<template>
<div>
    <div class="content-box">
        <div class="left-box">
             <div class="left-title">党群活动分类</div>
             <div class="sort-item" v-for="i in sortList" :key="i.id">
                 <span class="name">{{i.name}}</span>
                 <span class="num">({{i.num}})</span>
                  <el-dropdown class="drop-dwon">
              <span class="el-dropdown-link">
                <el-icon class="el-icon-more">
                </el-icon>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item v-for="item in dropdwonList" :key="item.index"  @click.native="handleCommand(data,item)">{{item.name}}</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
             </div>
        </div>
        <div class="right-box">
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
            <div class="btn-box">
                <el-button class="btn1" size="mini" type="primary" @click="addstyle">新增</el-button>
                <el-button class="btn1" size="mini" type="primary" @click="del">删除</el-button>
            </div> 
            </div>
             <el-table
          class="table"
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
       
          :header-cell-style="{ background: '#f8f8f9' }"
          :row-style="{ height: '40px' }"
          :cell-style="{ padding: '0px' }"
        @selection-change="handleSelectionChange">
    <el-table-column
      type="selection"
      width="55">
    </el-table-column>
          <el-table-column label="标题" align="center" width="120">
            <template slot-scope="scope">{{ scope.row.date }}</template>
          </el-table-column>
          <el-table-column prop="name" align="center" label="发布单位" width="120">
          </el-table-column>
          <el-table-column fixed="right" label="操作">
            <template slot-scope="scope">
              <el-button @click="check(scope.row)" type="text" size="small"
                >查看</el-button
              >
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
    <div class="circle-btn">
        <el-button class="addGroup-btn"  style="color:#5DCFE9;" icon="el-icon-plus" circle @click="newAddSort"></el-button>
        </div>
         <!-- 新增荣誉分类 -->
<el-dialog
  title="新增分类"
  width="20%"
  :visible.sync="newsortDio"
  :before-close="handleClose"> 
  活动分类名称：<el-input style="width:75%" v-model="sortVal" placeholder="请输入内容"></el-input>
  <el-button style="margin:24px 45% 0 45%" type="primary" @click="saveSort" size="mini">确 定</el-button>
</el-dialog>

 <!-- 报名情况弹窗 -->
<el-dialog
  title="报名情况"
  width="20%"
  :visible.sync="newsortDio"
  :before-close="handleClose"> 
   <el-table :data="gridData">
    <el-table-column property="date" label="姓名" width="150"></el-table-column>
    <el-table-column property="name" label="所属支部" width="200"></el-table-column>
  
  </el-table>
</el-dialog>

</div>
</template>
<script>
export default {
    name:'honorSort',
    data(){
        return {
            sortList:[
                {
                    id:1,
                    name:'廉政通报',
                    num:'10'
                },
                {
                    id:2,
                    name:'廉政学习',
                    num:'5'
                },
            ],
            dropdwonList:[
          {
              name:'修改名称',
              index:'0'
          },
          {
              name:'删除',
              index:'1'
          },
      ],
      formInline:{},
      total: 0, // 总页数
      currentPage: 1, // 当前页数
      pageSize: 20, // 每页显示多少条,
      tableData: [
        {
          date: "2016-05-03",
          name: "其他人员",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-02",
          name: "其他人员",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "其他人员",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-01",
          name: "其他人员",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-08",
          name: "其他人员",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-06",
          name: "其他人员",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-07",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
      ],
      multipleSelection: [],
      treeData: [
        {
          id: 1,
          label: "一级 2",
          children: [
            {
              id: 3,
              label: "二级 2-1",
              children: [
                {
                  id: 4,
                  label: "三级 3-1-1",
                },
                {
                  id: 5,
                  label: "三级 3-1-2",
                  disabled: true,
                },
              ],
            },
            {
              id: 2,
              label: "二级 2-2",
              disabled: true,
              children: [
                {
                  id: 6,
                  label: "三级 3-2-1",
                },
                {
                  id: 7,
                  label: "三级 3-2-2",
                  disabled: true,
                },
              ],
            },
          ],
        },
      ],
      defaultProps: {
        children: "children",
        label: "label",
      },
      newsortDio:false ,//新增荣誉分类弹框show
      sortVal:'',//新增荣誉分类输入框
      gridData:[
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }
      ]
        }
    },
    methods:{
        //批量删除按钮
        del(){

        },
        //查看
        check(){
            this.$router.push('/partyBuild/partyGroup/activityDetail')
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
    //新增荣誉分类按钮
    newAddSort(){
        this.newsortDio = true;
    },
    handleClose(){
        this.newsortDio = false;
    },
    //新增荣誉分类保存
    saveSort(){
        this.newsortDio = false;
    },
    //新增荣誉
    addstyle(){
      this.$router.push('/partyBuild/partyGroup/addActivity')
    }
    }
    
}
</script>
<style lang="scss" scoped>
.content-box{
    background-color: #fff;
   display: flex;
   flex-direction: row;
    margin:24px 24px 0 24px;
}
.left-box{
    width:214px;
    border-right:1px solid #e4e4e5;
}
.right-box{
    flex:1;
}
.left-title{
    height: 42px;
  line-height: 40px;
  margin: 0 0 0 24px;
  font-size: 14px;
  font-weight: 400;
}
.drop-dwon{
    float: right;
    margin-right: 24px;
}
.sort-item{
    height: 40px;
    padding-left: 24px;
    font-size: 12px;
}
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
.page {
  width: 100%;
  height: 80px;
  background-color: #fff;
}
.el-pagination {
  float: right;
  margin: 24px 24px 0 0;
}
.circle-btn{
height:40px;
width:100%;
margin:-64px 0 0 112px;
}
.addGroup-btn{
    border:none;
box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.14);
}
</style>
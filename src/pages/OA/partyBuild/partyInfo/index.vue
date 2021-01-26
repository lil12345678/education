<template>
  <div>
     <div class="top">
            <i class="icon el-icon-location"></i>
            <Breadcrumb class="bread" :items="breadItems"></Breadcrumb>
        </div>
    <div class="btn-box">
      <el-button class="btn1" v-if="showPartyBtn == true" size="mini" type="primary"  >党员信息</el-button>
      <el-button class="btn1" v-else size="mini"  plain @click="showParty">党员信息</el-button>
      <el-button class="btn2" v-if="showPartyBtn == false" size="mini" type="primary" plain >其他成员信息</el-button>
      <el-button class="btn2" v-else size="mini"  plain @click="showOther" >其他成员信息</el-button>
    </div>
    <div class="table-box">
     <PartyPer v-if="showPartyBtn == true"></PartyPer>
     <OtherPer v-else></OtherPer>
    </div> 
  </div>
</template>
<script>
import Breadcrumb from '../../../../components/breadcrumb';
import PartyPer from "./partyPer";
import OtherPer from "./otherPer";
export default {
  name: "partyInfo",
  components: {
    PartyPer,
    OtherPer,
    Breadcrumb
  },
  data() {
    return {
      breadItems:{},
      showTable: true,
      showRelChange: false,
      searchInput: "",
      activeName: "first",
      showPartyBtn: true,
      total: 0, // 总页数
      currentPage: 1, // 当前页数
      pageSize: 20, // 每页显示多少条,
      tableData: [
      ],
      multipleSelection: [],
    };
  },
   created(){
      this.setBreadItems()
    },
  methods: {
         //添加面包屑
      setBreadItems(){
        this.breadItems = {
          '智慧党建':'/partyBuild',
          '党员信息管理':'/partyBuild/partyInfo'
        }
        
      },

    //党员信息
    showParty() {
      this.showPartyBtn = true;
    },
    //其他成员信息页面
    showOther() {
      this.showPartyBtn = false;
    },
  },
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
.btn-box {
  margin: 24px 0 0 24px;
}
.btn2 {
  display: inline-block;
}
.table-box {
  margin: 24px 24px 0 24px;
  background-color: #fff;
}
</style>
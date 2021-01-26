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
    <div>
      <div style="height: 40px; padding: 24px 24px 0 0">
        <el-input
          size="mini"
          style="width: 200px; float: right"
          placeholder="请输入内容"
          suffix-icon="el-icon-search"
          v-model="nameSearch"
        ></el-input>
      </div>
      <div class="top-box">
        <div class="top-radio">
          <el-radio v-model="radio" label="1">已预约</el-radio>
          <el-radio v-model="radio" label="2">待审批</el-radio>
        </div>
        <el-button size="mini" class="top-today" type="primary">今天</el-button>
        <el-date-picker
          class="top-date"
          style="width: 100px"
          v-model="dateValue"
          type="date"
          placeholder="日期"
        >
        </el-date-picker>
      </div>
    </div>
    <div class="byted-weektime" style="width: 99%; padding: 24px 24px 0 24px">
      <div class="calendar" style="width: 98%">
        <table class="calendar-table" style="width: 98%">
          <thead class="calendar-head">
            <tr>
              <th rowspan="2" class="week-td">会议室/时间</th>
              <!-- <th colspan="24">00:00 - 12:00</th>
            <th colspan="24">12:00 - 24:00</th> -->
            </tr>
            <tr>
              <td colspan="1" v-for="(item, index) in tableHeader" :key="index">
                {{ item }}
              </td>
            </tr>
          </thead>
          <tbody id="tableBody">
           
            <tr v-for="(items, j) in weekDate" :key="items.id">
              <td>{{ items.name }}</td>
              <!-- @mousedown.prevent="handleMouseDown(i,0)"
              @mouseup.prevent="handleMouseUp(i,0)" -->
              <td
                @click="hanleClick(j,items, i)"
                class="calendar-atom-time"
                :class="item.class"
                v-for="(item, i) in rowUnit[j]"
                :key="i"
                id="timeItem"
              ></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <el-dialog title="预约会议室" :visible.sync="dialogVisible" width="30%">
      <el-form :model="form">
        <el-form-item label="开始时间" label-width="100px">
          <el-time-select
            placeholder="起始时间"
            v-model="form.startTime"
            :default-value="time"
            :picker-options="{
              start: '07:00',
              step: '01:00',
              end: '22:00',
            }"
          >
          </el-time-select>
        </el-form-item>
        <el-form-item label="结束时间" label-width="100px">
          <el-time-select
            placeholder="结束时间"
            v-model="form.endTime"
            :picker-options="{
              start: '07:00',
              step: '01:00',
              end: '22:00',
              minTime: form.startTime,
            }"
          >
          </el-time-select>
        </el-form-item>
      </el-form>
      <el-button
        style="margin: 24px 45% 0 45%"
        type="primary"
        @click="saveDate"
        size="mini"
        >确 定</el-button
      >
    </el-dialog>
  </div>
</div>
</template>

<script>
import Breadcrumb from "@/components/breadcrumb";
export default {
  name: "timeSelect",
   components: {
    Breadcrumb,
  },
  data() {
    return {
      breadItems: {}, //面包屑组件传入的值
      nameSearch: "",
      radio: "1",
      dateValue: "",
      dialogVisible: false,
      Y:null,
      room: "", //选中的会议室
      //time: "07:00", //选中的时间
      form: {
        startTime: "",
        endTime: "",
      },

      tableHeader: [
        "07:00",
        "08:00",
        "09:00",
        "10:00",
        "11:00",
        "12:00",
        "13:00",
        "14:00",
        "15:00",
        "16:00",
        "17:00",
        "18:00",
        "19:00",
        "20:00",
        "21:00",
        "22:00",
      ],
      weekDate: [
        {
          id: "1",
          name: "会议室1",
        },
        {
          id: "2",
          name: "会议室2",
        },
        {
          id: "3",
          name: "会议室3",
        },
      ],
      rowUnit: [], //每一个单元格
      timeContent: [], //选中的时间段原始数据
      timeSection: [], //时间段，可以返回给后台的数据
      timeStr: [], //时间段，前端显示的数据

    };
  },
  created() {
    this.init();
    this.getPage();
    this.setBreadItems();
  },
  mounted() {},
  methods: {
      goBack() {
      this.$router.go(-1);
    },
    //添加面包屑
    setBreadItems() {
      this.breadItems = {
        智慧党建: "/partyBuild",
        党群活动: "/partyBuild/partyGroup",
        创建活动:'/partyBuild/partyGroup/addActivity',
        预约会议室: "/partyBuild/partyGroup/reservate",
      };
    },
    init() {
      let len = this.weekDate.length;
      for (let i = 0; i < 3; i++) {
        let arr = [];
        // for (let j = 0; j < 48; j++) {
        for (let j = 0; j < 16; j++) {
          arr.push({ class: null, timeData: j });
        }
        this.rowUnit.push(arr);
        this.timeContent.push({ arr: [] });
        this.timeSection.push([]);
        this.timeStr.push("");
      }
    },
    initForm(){
      this.form = {};
    },
    //获取当天的预约数据
    getPage() {
      
      // getData().then(res => {
        //当一天中有多个时段
      //   this.fillColor(res.data.data.start, res.data.data.end,this.Y)
      // })
    },
    hanleClick(a, b, c) {
      debugger
      console.log(a, b,c);
      this.Y = a;//取y轴，会议室的下标
      //选中时间后默认填充到表单中
      this.form.startTime = this.tableHeader[c];
      
      this.dialogVisible = true;
    },
    //保存预约时间
    saveDate() {
      this.fillColor(this.form.startTime,this.form.endTime,this.Y)
     this.dialogVisible = false;
     this.initForm()
    },
    fillColor(s, e, y) {
       let x = 0;
      let xend = 0;
      for(let j = 0; j < this.tableHeader.length ; j++){
        if(s == this.tableHeader[j]){
          x=j;
        }
      }
         for(let z = 0; z < this.tableHeader.length ; z++){
        if(e == this.tableHeader[z]){
          xend=z;
        }
      }
      for (let i = x; i < xend + 1; i++) {
        let Y = y;//获取y轴，就是会议室的下标
        this.rowUnit[y][i].class = "ui-selected";
      }
    },

  },
};
</script>

<style lang="scss" scoped>
.top {
  height: 40px;
  background-color: #fff;
  width: 100%;
  margin: 24px 0 0 24px;
}
.el-icon-location {
  padding-left: 16px;
}
.bread {
  display: inline-block;
  line-height:20px;
}
.back {
  float: right;
  line-height: 40px;
  margin-right: 64px;
}
.container-box {
  background-color: #fff;
  margin: 24px 24px 0 24px;
  padding-bottom: 24px;
}
.top-box {
  margin: 12px 24px 0 24px;
}
.top-date,
.top-today {
  position: absolute;
  right: 48px;
  margin-top: -24px;
}
.top-today {
  right: 160px;
}
.top-date /deep/ .el-input__icon {
  height: 30px;
  line-height: 30px;
}
.byted-weektime .calendar {
  -webkit-user-select: none;
  position: relative;
  display: inline-block;
}
#tableBody {
  /* position: relative; */
}
/*.byted-weektime .calendar .schedule{background:#2F88FF;width:0;height:0;position:fixed;display:none;top:0;left:0;pointer-events:none;-webkit-transition:all 400ms ease;-moz-transition:all 400ms ease;-ms-transition:all 400ms ease;transition:all 400ms ease}*/
.byted-weektime .calendar .calendar-table {
  border-collapse: collapse;
  border-radius: 4px;
}
.byted-weektime .calendar .calendar-table tr .calendar-atom-time:hover {
  background: #ff907a;
}
.byted-weektime .calendar .calendar-table tr .ui-selected {
  background: #ff907a;
}
.byted-weektime .calendar .calendar-table tr .ui-selected:hover {
  background: #2f88ff;
}
.byted-weektime .calendar .calendar-table tr,
.byted-weektime .calendar .calendar-table td,
.byted-weektime .calendar .calendar-table th {
  border: 1px solid #ccc;
  font-size: 12px;
  text-align: center;

  line-height: 1.8em;
  -webkit-transition: background 200ms ease;
  -moz-transition: background 200ms ease;
  -ms-transition: background 200ms ease;
  transition: background 200ms ease;
}
.byted-weektime .calendar .calendar-table tbody tr {
  height: 40px;
}
.byted-weektime .calendar .calendar-table tbody tr td:first-child {
  background: #f8f9fa;
}
.byted-weektime .calendar .calendar-table thead th,
.byted-weektime .calendar .calendar-table thead td {
  background: #f8f9fa;
}
.byted-weektime .calendar .calendar-table .td-table-tip {
  line-height: 2.4em;
  padding: 0 12px 0 19px;
  background: #fff !important;
}
.byted-weektime .calendar .calendar-table .td-table-tip .clearfix {
  height: 46px;
  line-height: 46px;
}
.byted-weektime .calendar .calendar-table .td-table-tip .pull-left {
  font-size: 14px;
  color: #333333;
}
.byted-weektime .week-td {
  width: 75px;
  padding: 20px 0;
}
.byted-weektime a {
  cursor: pointer;
  color: #2f88ff;
  font-size: 14px;
}
#kuang {
  position: absolute;
  background-color: blue;
  opacity: 0.3;
}
</style>

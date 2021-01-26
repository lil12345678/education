<template>
  <div>
    <div class="top">
      <i class="icon el-icon-location"></i>
      <Breadcrumb class="bread" :items="breadItems"></Breadcrumb>
      <div class="back" @click="goBack">
        <i class="el-icon-refresh-left"></i><span>返回</span>
      </div>
    </div>
    <div class="content-box">
      <div class="detail-box">
        <div class="f-box">
          <div class="title">{{ this.title }}</div>
          <div class="status">{{ this.status }}</div>
        </div>
        <div class="s-box">
          <div class="questionNum">题目数量:{{ this.questionNum }}</div>
          <div class="finish">
            已完成:{{ this.finish }}/{{ this.questionNum }}
          </div>
          <div class="progress">学习时长:{{ this.progress }}</div>
        </div>
        <div class="qustionStyle">{{ this.qustionStyle }}</div>
        <div class="qusItem" v-for="i in this.question" :key="i.item">
          <div class="question">{{ i.item }}</div>
          <div class="select">
            <el-radio
              v-model="radio"
              :label="j.id"
              v-for="j in i.select"
              :key="j.id"
              >{{ j.item }}</el-radio
            >
          </div>
        </div>
      </div>
      <div class="right-box">
        <div class="time">
          <span>倒计时</span>
          <div class="countDown"><i class="el-icon-time"></i>{{hr}}时 {{min}}分钟 {{sec}}秒 </div>
        </div>
        <div class="line"></div>
        <div class="qustionsStyle2">{{ this.qustionStyle }}</div>
        <div class="card">
            <el-row :gutter="20">
        <el-col :span="4" class="circle" v-for="(index,i) in question" :key="i.id" >
          <span style="color:#fff;line-height:24px">{{ i+1 }}</span>
        </el-col>
            </el-row>
        </div>
      </div>
    </div>
    <el-button size="mini" type="primary" @click="submit">交卷</el-button>
    <!-- 得分弹框 -->
  </div>
</template>

<script>
import Breadcrumb from "@/components/breadcrumb";
export default {
  name: "testDetail",
  components: {
    Breadcrumb,
  },
  data() {
    return {
      breadItems: {}, //面包屑组件传入的值
      title: "三会一课测试",
      status: "1",
      questionNum: "90",
      finish: "24",
      progress: 40,
      qustionStyle: "一、选择题", //题型
      question: [
        {
            id:110,
          item: "1、党章规定…………………………………………………………（）",
          select: [
            {
              item: "A、党委",
              id: 1,
            },
            {
              item: "B、党委",
              id: 2,
            },
            {
              item: "C、党委",
              id: 3,
            },
            {
              item: "D、党委",
              id: 4,
            },
          ],
        },
        {
            id:211,
          item:
            "2、党章规定…………………………………………………………（）…………………………………………………………………………………………",
          select: [
            {
              item: "A、党委",
              id: 11,
            },
            {
              item: "B、党委",
              id: 21,
            },
            {
              item: "C、党委",
              id: 31,
            },
            {
              item: "D、党委",
              id: 41,
            },
          ],
        }
      ],
      radio:'',
      date:'',
      countDown:'',
      timeStamp:30,
      msec:'',
      day:'',
      hr:'',
      min:'',
      sec:'',
      timer:null,
    };
  },
  created() {
    this.setBreadItems();

  },
  mounted(){
    this.countdown();
  },
   beforeDestroy(){
//            清楚定时器
            clearInterval(this.timer)
      },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    //添加面包屑
    setBreadItems() {
      this.breadItems = {
        智慧党建: "/partyBuild",
        党员学习: "/partyBuild/partyStudy",
        在线考试: "/partyBuild/partyStudy/testDetail",
      };
    },
    countdown(s, m, h) {
      // let it = 0;
      // if (s) it += s;
      // if (m) it += m * 60;
      // if (h) it += h * 3600;
      let _this = this;
      setTimeout(function () {
        _this.showTime()
      }, 1000)
    },
    //倒计时
    showTime() {
      let timeOut = this.timeStamp * 60000
        let current  = new Date()
        let endTime = new Date(new Date().getTime() + timeOut) //1800000换成传入的this.timestamp  

          const end = Date.parse(new Date(endTime))//时间戳
      const now = Date.parse(new Date())
      this.msec = end - now
      console.log(this.msec)
      if(this.msec<0) return;
        let _this = this
        console.log(_this.msec)
        this.timer = setInterval(function () {
          if(_this.msec > 0 || _this.msec <= timeOut){
            
            _this.hr = parseInt((_this.msec / (1000 * 60 * 60)) % 24);
            _this.min = parseInt((_this.msec / (1000 * 60)) % 60);
            _this.sec = parseInt((_this.msec / 1000) % 60);
            // _this.hr = hr > 9 ? hr : '0' + hr;
            // _this.min = min > 9 ? min : '0' + min;
            // _this.sec = sec > 9 ? sec : '0' + sec;
            _this.msec-=1000;
            console.log(_this.msec)
            console.log(_this.sec)
          }else{
            _this.$message('考试时间到')
            clearInterval(_this.timer);
            _this.timer = null
          }
        },1000)
      
    },

    submit() {},
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
.bread {
  display: inline-block;
}
.back {
  float: right;
  line-height: 40px;
  margin-right: 64px;
}
.content-box {
  display: flex;
  flex-direction: row;
}
.right-box {
  width: 287px;
  margin: 24px 24px 24px 0;
  background-color: #fff;
}
.detail-box {
  flex: 1;
  height: 760px;
  background-color: #fff;
  margin: 24px;
}
.f-box {
  padding: 24px 0 0 24px;
  height: 40px;
  position: relative;
}
.title {
  line-height: 18px;
  font-size: 14px;
  font-weight: 700;
}
.status {
  width: 52px;
  height: 18px;
  position: absolute;
  top: 24px;
  left: 120px;
  background: #f3d354;
  border-radius: 4px;
  text-align: center;
}
.s-box {
  position: relative;
  width: 100%;
}
.questionNum,
.finish,
.progress {
  font-size: 10px;
  color: #999999;
  padding-left: 24px;
  margin-bottom: 24px;
}
.finish {
  position: absolute;
  left: 120px;
  top: 0;
}
.progress {
  position: absolute;
  left: 220px;
  top: 0;
  height: 20px;

}
.qustionStyle {
  padding-left: 24px;
  width: 100%;
  background-color: #f8f8f8;
  line-height: 40px;
  font-size: 10px;
  font-weight: 700;
}
.qusItem {
  padding: 24px 0 0 24px;
}
.question {
  color: #333333;
  font-size: 14px;
}
.select {
  padding: 24px 0 0 0;
  color: #333333;
  font-size: 14px;
}
.time{
    padding:24px 24px 0 24px
}
.qustionsStyle2 {
    margin:24px 0 0 24px;
}

.el-row{
    margin:0 12px;
    padding-left:24px;
}
.circle{
    width:24px;
    height: 24px;
    margin:24px 12px;
    background-color: red;
    border-radius: 50%;
}
.countDown{
    float: right;
font-weight: bold;
line-height: 22px;
color: #FF6B5B;
font-size: 18px;
}
</style>
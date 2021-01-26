<template>
  <div>
    <div class="top">
      <i class="icon el-icon-location"></i>
      <Breadcrumb class="bread" :items="breadItems"></Breadcrumb>
      <div class="back" @click="goBack">
        <i class="el-icon-refresh-left"></i><span>返回</span>
      </div>
    </div>

    <div class="detail-box">
      <div class="f-box">
        <div class="title">{{ this.title }}</div>
        <div class="status">{{ this.status }}</div>
      </div>
      <div class="s-box">
        <div class="questionNum">题目数量：{{ this.total}}</div>
        <div class="finish1">
          已完成：{{ this.finish }}/{{ this.total }}
        </div>
        <div class="progress">
          <span>学习进度</span>
          <el-progress class="pro" :percentage="progress"></el-progress>
        </div>
        <div class="line"></div>
      </div>
      <el-carousel
        ref="carousel"
        setActiveItem=""
        arrow="never"
        trigger="click"
        height="150px"
        :autoplay="false"
      >
        <el-carousel-item
          v-for="(i, index) in questionList"
          :key="index"
        >
          <div class="question">{{ i.subjectTitle }}</div>
          <!-- 判断是单选题还是多选题 -->
          <div class="select" v-if="i.subjectType == 0">
            <el-radio
              v-model="selectRadio"
              :label="item"
              v-for="item in i.selectItem"
              :key="item"
              >{{ item }}</el-radio
            >
          </div>
          <el-checkbox-group
            v-model="checkList"
            v-else-if="i.subjectType == 1"
            class="select"
          >
            <el-checkbox
              :label="item"
              v-for="item in i.selectItem"
              :key="item.id"
            ></el-checkbox>
          </el-checkbox-group>

          <div class="select" v-else-if="i.subjectType == 2">
            <el-radio v-model="TFradio" label="1">是</el-radio>
            <el-radio v-model="TFradio" label="2">否</el-radio>
          </div>
        </el-carousel-item>
      </el-carousel>

      <el-button class="btn1" size="mini" type="primary" @click="showAnwser">查看答案</el-button>
      <div class="questionNum2">
        <el-button
          class="btn1"
          size="mini"
          type="primary"
          icon="el-icon-arrow-left"
          @click="lastQ('prev')"
        ></el-button>
        <div style="padding: 50px 0 0 12px; color: #419eef">
          {{ this.finish }}/{{ this.total }}
        </div>
        <el-button
          class="btn1"
          size="mini"
          type="primary"
          icon="el-icon-arrow-right"
          @click="nextQ('next')"
        ></el-button>
      </div>
      <div class="line"></div>
      <div v-if="showA">
        <div v-if="status == 1">
          <div class="CW">
            <div class="state">{{ item.status }}</div>
            <div class="refer">参考答案：{{ item.rightResult }}</div>
            <div class="answer">你的答案：{{ item.answer }}</div>
          </div>
          <div style="color: #5dcfe9; padding: 24px">解析</div>
          <div class="resolve">{{ item.subjectContent }}</div>
        </div>
        <div class="CW" v-else>
          <div class="CW">
            <div class="Wstate">{{ item.status }}</div>
            <div class="refer">参考答案：{{ item.rightResult }}</div>
            <div class="answer">你的答案：{{ this.answer }}</div>
          </div>
          <div>解析</div>
          <div class="resolve">{{ item.subjectContent }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Breadcrumb from "@/components/breadcrumb";
import { getDetail } from "@/api/news.js";
import { exam } from "@/api/study.js";
import axios from "@/router/axios";
export default {
  name: "honorDetail",
  components: {
    Breadcrumb,
  },
  data() {
    return {
      breadItems: {}, //面包屑组件传入的值
      title: "党风廉政题库",
      status: "1",
      questionNum: "90",
      finish: 0,
      progress: 40,
      selectRadio: "", //单选题
      TFradio: "", //判断题
      questionList: [],
      currentNum: "24",
      questiontotal: "90", //题库数量
      showA: false,
      total: 0, // 总页数
      currentPage: 1, // 当前页数
      pageSize: 20, // 每页显示多少条,
      qList: [],
      options: [],
      checkList: [], //多选题
    };
  },
  created() {
    this.setBreadItems();
    this.getPageData();
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    //添加面包屑
    setBreadItems() {
      if (this.$route.query.name == "党员学习") {
        this.breadItems = {
          智慧党建: "/partyBuild",
          党员学习: "/partyBuild/partyStudy",
          题库详情: "/partyBuild/studyManage/QDetail",
        };
      } else {
        this.breadItems = {
          智慧党建: "/partyBuild",
          学习管理: "/partyBuild/studyManage",
          学习详情: "/partyBuild/studyManage/QDetail",
        };
      }
    },
    getPageData(p) {
      axios
        .get("http://192.168.8.16:9000/zhxy-study/api/examSubject/findPage", {
          params: Object.assign(
            {
              current: this.currentPage,
              size: this.pageSize,
              menuId: this.$route.query.id,
            },
            p
          ),
        })
        .then((res) => {
          let arr = [];
          let data = res.data.data.records;
          data.map((i) => {
            arr.push({
              subjectTitle: i.subjectTitle,
              selectItem: [i.optionA, i.optionB, i.optionC, i.optionD],
              menuId: i.menuId,
              rightResult: i.rightResult,
              status: i.status,
              subjectContent: i.subjectContent,
              subjectType: i.subjectType,
            });
          });
          this.questionList = arr;
          this.total = res.data.data.total;
          this.listLoading = false;
          console.log(this.options);
        })
        .catch((err) => {
          this.listLoading = false;
        });
    },
    showAnwser() {
      this.showA = true;
    },
    //上一题
    lastQ(type) {
      this.$refs["carousel"][type]();
    },
    //下一题
    nextQ(type) {
      this.$refs["carousel"][type]();
    },
    //改变页码
    handleSizeChange(size) {
      this.pageSize = size;
      this.getPageData();
    },
    //改变当前页面
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      this.getPageData();
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
.bread {
  display: inline-block;
}
.back {
  float: right;
  line-height: 40px;
  margin-right: 64px;
}
.detail-box {
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
.finish1,
.progress {
  font-size: 10px;
  color: #999999;
  padding-left: 24px;
}
.finish1 {
  position: absolute;
  left: 120px;
  top: 0;
}
.progress {
  position: absolute;
  left: 220px;
  top: 0;
  height: 20px;
  width: 100%;
}
.pro {
  position: absolute;
  left: 100px;
  top: 2px;
  width: 227px;
}
.line {
  width: 100%;
  height: 1px;
  background-color: #ccc;
  margin-top: 24px;
}
.question {
  padding: 24px 0 0 24px;
  color: #333333;
  font-size: 14px;
}
.select {
  padding: 24px 0 0 24px;
  color: #333333;
  font-size: 14px;
}
.btn1 {
  margin: 46px 0 0 24px;
}
.questionNum2 {
  float: right;
  display: flex;
  flex-direction: row;
  text-align: center;
  padding-right: 24px;
}
.state {
  color: #5dcfe9;
  padding: 24px 0 0 24px;
}
.Wstate {
  color: #fa5552;
  padding: 24px 0 0 24px;
}
.CW {
  position: relative;
  height: 90px;
}
.refer {
  position: absolute;
  top: 48px;
  left: 24px;
}
.answer {
  position: absolute;
  top: 48px;
  left: 180px;
}
.resolve {
  padding: 0 0 0 24px;
}
</style>
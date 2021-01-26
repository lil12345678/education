<template>
  <div>
    <div class="home-top">
      <i class="icon el-icon-location"></i>
      <span class="top-title">智慧党建</span>
    </div>
    <div class="second-box">
      <div class="news-box">
        <div class="news-top">
          <div class="news-line"></div>
          <div class="news-title">党建新闻</div>
          <div class="news-more">更多</div>
        </div>
        <div class="list-box">
          <ul>
            <li class="newsItem" v-for="i in newsList" :key="i.id">
              <div class="circle"></div>
              <span class="">{{ i.news }}</span>
              <span class="news-date">{{ i.date }}</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="notice-box">
        <div class="news-top">
          <div class="news-line"></div>
          <div class="news-title">党务公告</div>
          <div class="news-more">更多</div>
        </div>
        <div class="list-box">
          <ul>
            <li class="noticeItem" v-for="i in noticeList" :key="i.id">
              <span>{{ i.title }}</span>
              <span class="date">{{ i.date }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="nav-box">
    
      <div class="box box1">
        <div class="img-box">
          <img
            class="nav-img"
            src="../../../../static/Icon/Icon—主体内容区/Icon—荣誉.png"
          />
        </div>
        <span class="nav-title">荣誉风采</span>
        <i class="icon el-icon-arrow-right"></i>
      </div>
      
      <div class="box box2">
        <div class="img-box img2">
          <img
            class="nav-img"
            src="../../../../static/Icon/Icon—主体内容区/Icon—文档.png"
          />
        </div>
        <span class="nav-title">工作文档</span>
        <i class="icon el-icon-arrow-right"></i>
      </div>
      <div class="box box3">
        <div class="img-box img3">
          <img
            class="nav-img"
            src="../../../../static/Icon/Icon—主体内容区/Icon—党建.png"
          />
        </div>
        <span class="nav-title">党风廉政</span>
        <i class="icon el-icon-arrow-right"></i>
      </div>
      <div class="box box4">
        <div class="img-box img4">
          <img
            class="nav-img"
            src="../../../../static/Icon/Icon—主体内容区/Icon—会议.png"
          />
        </div>
        <span class="nav-title">三会一课</span>
        <i class="icon el-icon-arrow-right"></i>
      </div>
      <div class="box box5">
        <div class="img-box img5">
          <img
            class="nav-img"
            src="../../../../static/Icon/Icon—主体内容区/Icon—法律.png"
          />
        </div>
        <span class="nav-title">党员维权</span>
        <i class="icon el-icon-arrow-right"></i>
      </div>
      <div class="box box6">
        <div class="img-box img6">
          <img
            class="nav-img"
            src="../../../../static/Icon/Icon—主体内容区/Icon—活动.png"
          />
        </div>
        <span class="nav-title">党群活动</span>
        <i class="icon el-icon-arrow-right"></i>
      </div>
      <div class="box box7">
        <div class="img-box img7">
          <img
            class="nav-img"
            src="../../../../static/Icon/Icon—主体内容区/Icon—评议.png"
          />
        </div>
        <span class="nav-title">民主评议与提案</span>
        <i class="icon el-icon-arrow-right"></i>
      </div>
      <div class="box box8">
        <div class="img-box img7">
          <img
            class="nav-img"
            src="../../../../static/Icon/Icon—主体内容区/Icon—党建.png"
          />
        </div>
        <span class="nav-title">工作文档</span>
        <i class="icon el-icon-arrow-right"></i>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Home",
  data() {
    return {
      newsList: [
        {
          id: 0,
          news: "[党建动态] 祭革命先烈吧忆光辉历程 讲初心使命",
          date: "2019-04-03",
        },
        {
          id: 1,
          news: "[党建动态] 祭革命先烈吧忆光辉历程 讲初心使命",
          date: "2019-04-03",
        },
        {
          id: 2,
          news: "[党建动态] 祭革命先烈吧忆光辉历程 讲初心使命",
          date: "2019-04-03",
        },
      ],
      noticeList: [
        {
          id: 0,
          title: "六月党课课表",
          date: "2019-04-03",
        },
        {
          id: 1,
          title: "六月党课课表",
          date: "2019-04-03",
        },
        {
          id: 2,
          title: "六月党课课表",
          date: "2019-04-03",
        },
      ],
    };
  },
};
</script>
<style lang="scss" scoped>
.home-top {
  height: 0.4rem;
  background-color: #fff;
  width: 100%;
  margin: 24px 0 0 24px;
}
.el-icon-location {
  padding: 16px;
}
.second-box {
  display: flex;
}
.news-box {
  width: 54%;
  height: 376px;
  background: #ffffff;
  box-shadow: 0px 3px 4px rgba(0, 72, 154, 0.04);
  margin: 24px 0 0 24px;
  border-radius: 8px;
}
.news-top {
  height: 40px;
  border-bottom: 2px solid #ccc;
}
.news-line {
  float: left;
  margin: 12px 0 0 24px;
  display: inline-block;
  height: 20px;
  width: 4px;
  background: linear-gradient(
    to bottom,
    rgb(138, 206, 252) 0%,
    rgb(13, 135, 248) 60%
  );
}
.news-title {
  float: left;
  margin: 12px 0 0 24px;
}
.news-more {
  float: right;
  margin: 12px 24px 0 0;
}
.circle {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #34c0e2;
  display: inline-block;
  margin: 0 12px;
}
.newsItem,
.noticeItem {
  line-height: 40px;
  height: 40px;
}
.noticeItem{
  margin-left:24px;
}
.news-date, .date{
 float:right;
 padding-right:24px;
}

.notice-box {
  flex: 1;
  height: 376px;
  background: #ffffff;
  margin: 24px 24px 0 24px;
  box-shadow: 0px 3px 4px rgba(0, 72, 154, 0.04);
  border-radius: 8px;
}
.nav-box{
display: flex;
 flex-wrap: wrap;
 margin:24px 0 0 24px;
}
.box {
  width: 23.4%;
  height: 126px;
  background: #ffffff;
  margin:0 24px 24px  0;
  border: 1px solid rgba(112, 112, 112, 0.0392156862745098);
  box-shadow: 0px 3px 4px rgba(0, 72, 154, 0.04);
}


.nav-title{
    margin:24px 0 0 24px;
    font-size:16px;
    color:#333;
}
.el-icon-arrow-right{
    margin-top:84px;
    font-size:16px;
}
.img-box {
  width: 110px;
  height: 126px;
  background-color: #f3d354;
  text-align: center;
}
.nav-img {
  margin-top: 24px;
}
.img2{
    background-color:#89C0FF;
}
.img3{
    background-color:#5DCFE9;
}
.img4{
background-color: #68CACB;
}
.img5{
    background-color: #FDAB96;
}
.img6{
    background-color:#C293F2;
}
.img7{
    background-color:#6AACF8;
}
.img8{
    background-color:#B0D887;
}

</style>
import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/layout/index'
import ContentLayout from '@/layout/contentLayout'

Vue.use(Router)

// const originalPush = Router.prototype.push
// Router.prototype.push = function push(location) {
//   return originalPush.call(this, location).catch(err => err)
// }

export default new Router(
  //  export default [  
  {
    routes: [
      {
        path: '/',
        name: 'login',
        component: () => import('@/pages/login/userlogin')
      },
      {
        path: '/product',
        name: 'product',
        component: () => import('@/pages/product/index')
      },
      {
        path: '/OA',
        name: 'OA',
        component: Layout,
        children: [
          {
            path: '/home',
            name: 'home',
            component: () => import('@/pages/OA/home/index')
          },
          {
            path: '/office',
            name: 'office',
            component: () => import('@/pages/OA/officeWork/index')
          },
          {
            "path": "/flow",
            "name": "Flow",
            component: () => import('@/pages/OA/flow/index')
          },
          {
            "path": "/task",
            "name": "Task",
            component: () => import('@/pages/OA/task/index')
          },
          {
            "path": "/property",
            "name": "Property",
            component: () => import('@/pages/OA/property/index')
          },
          {
            "path": "/edu",
            "name": "Edu",
            component: () => import('@/pages/OA/edu/index')
          },
          {
            "path": "/student",
            "name": "Student",
            component: () => import('@/pages/OA/student/index')
          },
          {
            path: '/partyBuild/fee',
            name: '党费管理',
            component: () => import('@/pages/OA/partyBuild/partyFee/index')
          },
          {
            "path": "/partyBuild/org",
            "name": "组织管理",
            component: () => import('@/pages/OA/partyBuild/org/index')
          },
          {
            path: '/partyBuild/partyInfo',
            name: '党员信息管理',
            component: () => import('@/pages/OA/partyBuild/partyInfo/index'),
          },
          {
            path: '/partyBuild/partyInfo/relChange',
            name: '党员关系转移',
            component: () => import('@/pages/OA/partyBuild/partyInfo/relChange'),
          },
          {
            path: '/partyBuild/partyInfo/field',
            name: '字段管理',
            component: () => import('@/pages/OA/partyBuild/partyInfo/field'),
          },
          {
            path: '/partyBuild/news/newsManage',
            name: '新闻管理',
            component: () => import('@/pages/OA/partyBuild/news/newsManage'),
          },
          {
            path: '/partyBuild/news',
            name: '党建新闻',
            component: () => import('@/pages/OA/partyBuild/news/index'),
          },
          {
            path: '/partyBuild/news/newAdd',
            name: '发布新闻',
            component: () => import('@/pages/OA/partyBuild/news/newAdd'),
          },
          {
            path: '/partyBuild/news/detail',
            name: '新闻详情',
            component: () => import('@/pages/OA/partyBuild/news/detail'),
          },
          {
            path: '/partyBuild/honor',
            name: '荣誉风采',
            component: () => import('@/pages/OA/partyBuild/honor/index.vue'),
          },
          {
            path: '/partyBuild/honor/honorSort',
            name: '荣誉风采管理',
            component: () => import('@/pages/OA/partyBuild/honor/honorSort'),
          },
          {
            path: '/partyBuild/honor/detail',
            name: '荣誉详情',
            component: () => import('@/pages/OA/partyBuild/honor/detail'),
          },
          {
            path: '/partyBuild/honor/addHonor',
            name: '上传荣誉',
            component: () => import('@/pages/OA/partyBuild/honor/addHonor'),
          },
          {
            path: '/partyBuild/partyStyle',
            name: '党风廉政',
            component: () => import('@/pages/OA/partyBuild/partyStyle/index'),
          },
          {
            path: '/partyBuild/partyStyle/styleSort',
            name: '党风管理',
            component: () => import('@/pages/OA/partyBuild/partyStyle/styleSort'),
          },
          {
            path: '/partyBuild/partyStyle/styleDetail',
            name: '通报详情',
            component: () => import('@/pages/OA/partyBuild/partyStyle/styleDetail'),
          },
          {
            path: '/partyBuild/partyStyle/addStyle',
            name: '发布通报',
            component: () => import('@/pages/OA/partyBuild/partyStyle/addStyle'),
          },
          {
            path: '/partyBuild/open',
            name: '校务公开',
            component: () => import('@/pages/OA/partyBuild/open/index'),
          },
          {
            path: '/partyBuild/open/openAdd',
            name: '校务新增',
            component: () => import('@/pages/OA/partyBuild/open/openAdd'),
          },
          {
            path: '/partyBuild/open/detail',
            name: '校务详情',
            component: () => import('@/pages/OA/partyBuild/open/detail'),
          },
          {
            "path": "/partyBuild/studyManage",
            name: "学习管理",
            component: () => import('@/pages/OA/partyBuild/studyManage/index'),
          },
              {
                path: '/partyBuild/studyManage/study',
                name: 'study',
                component: () => import('@/pages/OA/partyBuild/studyManage/study'),
              },
              {
                path: '/partyBuild/studyManage/addStudy',
                name: 'addStudy',
                component: () => import('@/pages/OA/partyBuild/studyManage/addStudy'),
              },
              {
                path: '/partyBuild/studyManage/questions',
                name: 'questions',
                component: () => import('@/pages/OA/partyBuild/studyManage/questions'),
              },
              
              {
                path: '/partyBuild/studyManage/QDetail',
                name: '题库详情',
                component: () => import('@/pages/OA/partyBuild/studyManage/QDetail'),
              },
              {
                path: '/partyBuild/studyManage/studyDetail',
                name: '学习详情',
                component: () => import('@/pages/OA/partyBuild/studyManage/studyDetail'),
              },
              {
                path: '/partyBuild/studyManage/test',
                name: 'test',
                component: () => import('@/pages/OA/partyBuild/studyManage/test'),
              },
              {
                path: '/partyBuild/studyManage/testDetail',
                name: 'testDetail',
                component: () => import('@/pages/OA/partyBuild/studyManage/testDetail'),
              },
              {
                path: '/partyBuild/studyManage/changeTestQ',
                name: 'changeTestQ',
                component: () => import('@/pages/OA/partyBuild/studyManage/changeTestQ'),
              },
              {
                path: '/partyBuild/studyManage/addTestHand',
                name: 'addTestHand',
                component: () => import('@/pages/OA/partyBuild/studyManage/addTestHand'),
              },
              {
                path: '/partyBuild/studyManage/newTestPlan',
                name: 'newTestPlan',
                component: () => import('@/pages/OA/partyBuild/studyManage/newTestPlan'),
              },
              {
                path: '/partyBuild/partyGroup',
                name: '党群活动',
                component: () => import('@/pages/OA/partyBuild/partyGroup/index'),
              },
              {
                path: '/partyBuild/partyGroup/activitySort',
                name: '党群管理',
                component: () => import('@/pages/OA/partyBuild/partyGroup/activitySort'),
              },
              {
                path: '/partyBuild/partyGroup/activityDetail',
                name: '活动详情',
                component: () => import('@/pages/OA/partyBuild/partyGroup/activityDetail'),
              },
              {
                path: '/partyBuild/partyGroup/addActivity',
                name: '活动申请',
                component: () => import('@/pages/OA/partyBuild/partyGroup/addActivity'),
              },
              {
                path: '/partyBuild/partyGroup/reservate',
                name: '会议室预约',
                component: () => import('@/pages/OA/partyBuild/partyGroup/reservate'),
              },
              {
                path: '/partyBuild/meeting',
                name: '三会一课',
                component: () => import('@/pages/OA/partyBuild/meeting/index.vue'),
              },
              {
                path: '/partyBuild/meeting/createMeet',
                name: '创建会议',
                component: () => import('@/pages/OA/partyBuild/meeting/createMeet'),
              },
              {
                path: '/partyBuild/meeting/meetMinute',
                name: '会议纪要',
                component: () => import('@/pages/OA/partyBuild/meeting/meetMinute'),
              },
              {
                path: '/partyBuild/meeting/detail',
                name: '会议详情',
                component: () => import('@/pages/OA/partyBuild/meeting/detail'),
              },
              {
                path: '/partyBuild/meeting/reservate',
                name: '预约会议',
                component: () => import('@/pages/OA/partyBuild/meeting/reservate'),
              },
              {
                path: '/partyBuild/partyStudy',
                name: '党员学习',
                component: () => import('@/pages/OA/partyBuild/partyStudy/index.vue'),
              },
              {
                path: '/partyBuild/partyStudy/lineStudy',
                name: 'lineStudy',
                component: () => import('@/pages/OA/partyBuild/partyStudy/lineStudy'),
              },
              {
                path: '/partyBuild/partyStudy/lineQuestion',
                name: 'lineQuestion',
                component: () => import('@/pages/OA/partyBuild/partyStudy/lineQuestion'),
              },
              {
                path: '/partyBuild/partyStudy/lineTest',
                name: '在线考试',
                component: () => import('@/pages/OA/partyBuild/partyStudy/lineTest'),
              },
              {
                path: '/partyBuild/partyStudy/testDetail',
                name: 'testDetail',
                component: () => import('@/pages/OA/partyBuild/partyStudy/testDetail'),
              },
        ]
      },
     

    ]
  }

)

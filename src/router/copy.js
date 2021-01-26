import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/layout/index'
import ContentLayout from '@/layout/contentLayout'

Vue.use(Router)

export default new Router(
  //  export default [  
  {
    routes: [
      {
        path: '/',
        name: 'login',
        component: () => import('@/pages/login/index')
      },
      {
        path: '/register',
        name: 'register',
        component: () => import('@/pages/login/reg')
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
        ]
      },
      {
        path: '',
        name: '智慧党建',
        component: Layout,
        children: [
          {
            path: '/partyBuild/partyPer',
            name: '党员信息管理',
            component: ContentLayout,
            children: [
              {
                path: '',
                name: '',
                component: () => import('@/pages/OA/partyBuild/partyInfo/index'),
              },
              {
                path: '/partyBuild/partyInfo/relChange',
                name: '党员关系转移',
                component: () => import('@/pages/OA/partyBuild/partyInfo/relChange'),
              },
              {
                path: '/partyBuild/partyInfo/field',
                name: '字段信息管理',
                component: () => import('@/pages/OA/partyBuild/partyInfo/field'),
              },
            ]
          },
          //党费管理目前没有三级菜单，没有用contentLayout,整个结构写在组件中
          {
            path: '/partyBuild/fee',
            name: '党费管理',
            component: () => import('@/pages/OA/partyBuild/partyFee/index')
          },
          {
            "path": "/partyBuild/news",
            "name": "党建新闻",
            component: ContentLayout,
            children: [
              {
                path: '',
                name: '',
                component: () => import('@/pages/OA/partyBuild/news/index'),
              },
              {
                path: '/partyBuild/news/newsList',
                name: '党建新闻',
                component: () => import('@/pages/OA/partyBuild/news/newsList'),
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
            ]
          },
          {
            "path": "/partyBuild/open",
            "name": "校务公开",
            component: ContentLayout,
            children: [
              {
                path: '',
                name: '',
                component: () => import('@/pages/OA/partyBuild/open/index'),
              },
              {
                path: '/partyBuild/open/newAdd',
                name: '校务新增',
                component: () => import('@/pages/OA/partyBuild/open/newAdd'),
              },
              {
                path: '/partyBuild/open/detail',
                name: '校务详情',
                component: () => import('@/pages/OA/partyBuild/open/detail'),
              },
            ]
          },
          {
            "path": "/partyBuild/study",
            "name": "学习管理",
            component: () => import('@/pages/OA/partyBuild/study/index')
          }, 
          {
            "path": "/partyBuild/partyGroup",
            "name": "党群活动",
            component: ContentLayout,
            children: [
              {
                path: '',
                name: '',
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
              }
            ]
          },
          {
            "path": "/partyBuild/org",
            "name": "组织管理",
            component: () => import('@/pages/OA/partyBuild/org/index')
          },
          {
            "path": "/partyBuild/meeting",
            "name": "三会一课",
            component: ContentLayout,
            children: [
              {
                path: '',
                name: '',
                component: () => import('@/pages/OA/partyBuild/meeting/index.vue'),
              },
              {
                path: '/partyBuild/meeting/createMeet',
                name: '创建会议',
                component: () => import('@/pages/OA/partyBuild/meeting/createMeet'),
              },
              // {
              //   path: '/partyBuild/honor/detail',
              //   name: '荣誉详情',
              //   component: () => import('@/pages/OA/partyBuild/honor/detail'),
              // },
              // {
              //   path: '/partyBuild/honor/addHonor',
              //   name: '上传荣誉',
              //   component: () => import('@/pages/OA/partyBuild/honor/addHonor'),
              // },
            ]
          },
          {
            "path": "/partyBuild/partyStudy",
            "name": "党员学习",
            component: ContentLayout,
            children: [
              {
                path: '',
                name: '',
                component: () => import('@/pages/OA/partyBuild/partyStudy/index.vue'),
              },
              {
                path: '/partyBuild/partyStudy/lineStudy',
                name: '在线学习',
                component: () => import('@/pages/OA/partyBuild/partyStudy/lineStudy'),
              },
              {
                path: '/partyBuild/partyStudy/lineQuestion',
                name: '在线题库',
                component: () => import('@/pages/OA/partyBuild/partyStudy/lineQuestion'),
              },
              {
                path: '/partyBuild/partyStudy/lineTest',
                name: '在线考试',
                component: () => import('@/pages/OA/partyBuild/partyStudy/lineTest'),
              },
            ]
          },
          {
            "path": "/partyBuild/partyStyle",
            "name": "党风廉政",
            component: ContentLayout,
            children: [
              {
                path: '',
                name: '',
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
              }
            ]
          },
          {
            path: '/partyBuild/honor',
            name: '荣誉风采',
            component: ContentLayout,
            children: [
              {
                path: '',
                name: '',
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
            ]
          },
        ]
      },

    ]
  }

)

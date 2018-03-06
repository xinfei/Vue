import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Main from './views/Main.vue'
import Users from './views/nav1/Users.vue'
import Roles from './views/nav1/Roles.vue'
import changePwd from './views/nav2/changePwd.vue'
import changePhoto from './views/nav2/changePhoto.vue'

import echarts from './views/charts/echarts.vue'

let routes = [
  {
    path: '/login',
    component: Login,
    name: '',
    hidden: true
  },
  {
    path: '/404',
    component: NotFound,
    name: '',
    hidden: true
  },
  {
    path: '/',
    component: Main,
    name: '数据列表',
    iconCls: 'fa fa-bar-chart',//图标样式class
    children: [
        { path: '/Users', component: Users, name: '用户列表' },
        { path: '/Roles', component: Roles, name: '角色列表' }
    ]
  },
  {
    path: '/',
    component: Main,
    name: '个人设置',
    iconCls: 'fa fa-id-card-o',
    children: [
      { path: '/changePwd', component: changePwd, name: '修改密码' },
      { path: '/changePhoto', component: changePhoto, name: '修改头像' }
    ]
  },
  {
    path: '/',
    component: Main,
    name: 'Charts',
    iconCls: 'fa fa-bar-chart',
    children: [
      { path: '/echarts', component: echarts, name: 'echarts' }
    ]
  },
  {
    path: '*',
    hidden: true,
    redirect: { path: '/404' }
  }
];

export default routes;
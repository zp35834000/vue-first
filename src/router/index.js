import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import App from '../App'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/helloWorld',
      component: HelloWorld
    },
    {
      path: '/easyuiDatagrid',
      component: r => require.ensure([], () => r(require('../page/easyui/datagrid')), 'easyuiDatagrid')
    },
    {
      path: '/app',
      component: App,
      children: [{
        path: '',
        component: r => require.ensure([], () => r(require('../page/home')), 'home')
      },
      {
        path: '/item',
        component: r => require.ensure([], () => r(require('../page/item')), 'item')
      },
      {
        path: '/score',
        component: r => require.ensure([], () => r(require('../page/score')), 'score')
      }]
    },
    {
      path: '/datagrid',
      component: r => require.ensure([], () => r(require('../page/simpleDatagrid/datagrid1')), 'datagrid')
    }
  ]
})

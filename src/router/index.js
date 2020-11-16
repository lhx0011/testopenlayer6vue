import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Test from '@/components/home/test'
import GisMap from '@/components/map/map1'
import OlMap from '@/components/map/olmap'
import Tree from '@/components/map/tree'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/test',
      name: 'test',
      component: Test
    },
    {
      path: '/map1',
      name: 'map1',
      component: GisMap
    },
    {
      path: '/olmap',
      name: 'OlMap',
      component: GisMap
    },
    {
      path: '/tree',
      name: 'Tree',
      component: GisMap
    },

  ]
})

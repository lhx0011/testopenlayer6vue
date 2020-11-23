import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Test from '@/components/home/test'
import GisMap from '@/components/map/map1'
import OlMap from '@/components/map/olmap'
// import Tree from '@/components/map/tree'
import HysxMap from '@/components/map/map'
// import Map3 from '@/components/map/map3'

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
      path: '/map',
      name: 'map',
      component: HysxMap
    },
    {
      path: '/olmap',
      name: 'OlMap',
      component: GisMap
    },
    // {
    //   path: '/tree',
    //   name: 'Tree',
    //   component: GisMap
    // },
    {
      path: '/map3',
      name: 'map3',
      component: GisMap
    },

  ]
})

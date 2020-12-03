import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Test from '@/components/home/test'
import GisMap from '@/components/map/map1'
import OlMap from '@/components/map/olmap'
// import Tree from '@/components/map/tree'
import HysxMap from '@/components/map/map'
import Track from '@/components/map/track'
import Station from '@/components/map/station'
import Equipment from '@/components/map/equipment'
import Line from '@/components/map/line'

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
    {
      path: '/track',
      name: 'track',
      component: Track
    },
    {
      path: '/station',
      name: 'station',
      component: Station
    },
    {
      path: '/equipment',
      name: 'equipment',
      component: Equipment
    },
    {
      path: '/line',
      name: 'line',
      component: Line
    },
  ]
})

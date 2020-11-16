<template>
<!--  <div>-->
    <!--//这个router-view是你路由跳转页面渲染的画布，相当于你想跳转哪个页面他会把你这个页面渲染到router-view上面，这个位置要看你布局了，因为我的这个是tabBar的布局所以我把这个放上面，哦对了这里有个小坑，就是Vue路由渲染，一定要被包括到一个div中或者其他标签中，千万别直接写在template中不要那个div标签，这样的话渲染不出来-->
<!--    <router-view />-->
<!--    <van-tabbar  route v-model="active" safe-area-inset-bottom>-->
<!--      <van-tabbar-item replace to="/"  icon="home-o" name="home">首页</van-tabbar-item>-->
<!--      <van-tabbar-item replace to="/record" icon="search" name="record">记录</van-tabbar-item>-->
<!--      <van-tabbar-item replace to="/mine" icon="friends-o" name="mine">我的</van-tabbar-item>-->
<!--    </van-tabbar>-->
<!--    <olmap />-->
<!--  </div>-->
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
// import olmap from './components/map/olmap.vue'
import test from './components/home/test.vue'

export default {
  name: 'app',
  // components: {
  //   test
  // },
  data(){
    return {
      active:"test",
      isActive:true,
    }
  },
  methods:{
  }
}
</script>

<style>
  #app{
    width: 100%;
    height: 100%;
  }
  .tab{
    display: flex;
    width: 100%;
    height: 48px;
    line-height: 48px;
    margin-bottom: 0px;
  }
  .tab-item{
    flex: 1;
    text-align: center;
  }


</style>

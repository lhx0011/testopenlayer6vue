<template>
  <div id="test">
    <h1>{{ msg }}</h1>
    This is home page
  </div>
</template>

<script>
    export default {
      data(){
        return {
          active:"test",
          isActive:true,
          msg: "test by lhx",
        }
      },
      methods:{
      }
    }
</script>

<style scoped>

</style>

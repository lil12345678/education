<template>
  <div class="main-box">
    <!-- <keep-alive> -->
      <router-view></router-view>
    <!-- </keep-alive> -->
    
    <!-- <Home></Home> -->
  </div>
</template>
<script>
import Home from '../pages/OA/home/index'
  export default {
      name:'Rightmain',
      components:{
        Home,
      },
    data () {
         return {
        }
     }
  }
</script>
<style lang="scss" scoped>

</style>
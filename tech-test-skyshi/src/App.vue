<script>
import NavBar from './components/NavBar.vue'
export default{
   components:{
    NavBar
   }
}
</script>

<template>
    <NavBar data-cy="header"/>
  <router-view/>
</template>


<template>
    <div class="container">
    <navigation-vue>
      <template #title>
        <a class="navbar-brand text-white">{{ restaurant_name.name }} Details</a>
      </template>
    </navigation-vue>
    <tab-vue />
    </div>
</template>

<script>
import NavigationVue from './NavigationVue.vue'
import TabVue from '@/components/TabVue.vue'
export default {
  data(){
    return{
      restaurant_name:[]
    }
  },
  components:{
        NavigationVue,
        TabVue
  },
  mounted() {
      this.restaurant_name = JSON.parse(localStorage.getItem('restaurant_name'))
  },
}
</script>

<style>

</style>
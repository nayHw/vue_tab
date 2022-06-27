<template> 
  <div class="container">
    <navigation-vue>
      <template #title>
        <a class="navbar-brand text-white">Restaurant List</a>
      </template>
      <template #action>
        <button class="btn btn-outline-info px-3 text-white"><i class="fa-solid fa-gear"></i>&nbsp;&nbsp;Setting</button>
      </template>
    </navigation-vue>
    <TableVue />
  </div>
</template>

<script>
import NavigationVue from '@/views/NavigationVue.vue'
import TableVue from '@/components/TableVue.vue'
export default {
  components:{
    NavigationVue,
    TableVue
  }
}
</script>

<style>

</style>

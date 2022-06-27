<template>
  <v-app id="app" class="container">
    <div class="mx-auto mb-3"> 
      <router-link to="/" class="mr-5">home</router-link>
      <router-link to="/list">Restaurant</router-link>
    </div>
    <router-view/>
  </v-app>
</template>


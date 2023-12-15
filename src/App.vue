<template>

   <!-- <router-view v-if="isLoggedIn"></router-view>
    <login-view v-else></login-view> -->
    <login-view />

  <!-- <router-view /> -->
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import LoginView from '@/views/user/LoginView.vue';

export default defineComponent({
  components: {
    LoginView
  },


})

</script>

<style lang="scss">
#app {
  font-family: 'IBM Plex Sans';
}
</style>

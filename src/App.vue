<template>
Logged:: {{ isLoggedIn }}

   <router-view v-if="isLoggedIn"></router-view>
    <login-view v-else></login-view>


    <!-- <login-view />

  <router-view /> -->
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import LoginView from '@/views/user/LoginView.vue';
import { get as getFromStore, load as loadFromStore } from '@/localStorage';

export default defineComponent({
  components: {
    LoginView
  },
  setup() {

    const isLoggedIn = computed(() => Boolean(getFromStore('logged')));
    console.log(' App.vue ', isLoggedIn.value);
    loadFromStore('logged')

    // .then((_) => {
    //   // isAuthLoading.value = false;
    // });

    return{
      isLoggedIn
    }

  }



})

</script>

<style lang="scss">
#app {
  font-family: 'IBM Plex Sans';
}
</style>

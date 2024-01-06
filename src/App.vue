<template>
<!-- Logged:: {{ isLoggedIn }} -->

   <!-- <router-view v-if="isLoggedIn"></router-view> -->
   <router-view v-if="Boolean(logged)"></router-view>
    <login-view v-else></login-view>

    <outlets></outlets> 
    <!-- <login-view />

  <router-view /> -->
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from 'vue';
import LoginView from '@/views/user/LoginView.vue';
import { get as getFromStore, load as loadFromStore } from '@/localStorage';



import { save as saveToStore } from '@/localStorage';
import { updateToken } from '@/api/users';

import Outlets from '@/components/common/Outlets.vue';

export default defineComponent({
  components: {
    LoginView,
    Outlets,

  },
  setup() {

    // const isLoggedIn = computed(() => Boolean(getFromStore('logged')));

    // const NINE_AND_HALF_MINUTES = 570000;
    const logged = computed(() => getFromStore('logged'))



    loadFromStore('logged')

    // .then((_) => {
    //   // isAuthLoading.value = false;
    // });

    const refreshToken = async() => {
      const response = await updateToken(logged.value.refresh_token);
      if (response !== undefined && response.status === 401) {
        console.error('error updating token!', response)
      } else if (response !== undefined && response.status === 200) {
        console.log('access token: ', logged.value.access_token);
       

        saveToStore('logged', {
          username: logged.value.username,
          id: response.data.id,
          isAdmin: logged.value.isAdmin,
          requiresReset: logged.value.requires_reset,
          access_token: response.data.access,
          refresh_token: response.data.refresh,
        });
        
        
      }
    }

    

    // onMounted(() => {
    //   setInterval(() => {
    //     if(!!logged.value) {
    //       // add note ::: it is not something that I particulary like so let's just demonstrate where you need to go in 
    //       // order to do it
    //       // what if user closes down the laptop and does not refresh the token????
    //       // refreshToken()
    //       console.log('access token: ', logged.value.access_token);
    //     }
        
    //   },NINE_AND_HALF_MINUTES)
    // })


    return{
      logged

    }

  }



})

</script>

<style lang="scss">
#app {
  font-family: 'IBM Plex Sans';
}
</style>

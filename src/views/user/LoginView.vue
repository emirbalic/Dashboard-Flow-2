<template>
  <div>
    <h1>This is login view</h1>
    <button class="button is-primary" @click="login">
      Login
    </button>
  </div>
</template>
    
<script lang="ts">
import { defineComponent, ref } from 'vue';
import { authenticate } from '@/api/authenicate';
import { ILoginCredentials } from '@/models/IUtilModels'

export default defineComponent({
  components: {
  },
  setup() {
    
    const isLoading = ref(false);
    const login = async () => {
      isLoading.value = true;
      console.info(' logging triggered !!!!')

      const body: ILoginCredentials = {
        username: "admin",
        password: "Pa$$w0rd",
      }
      const response = await authenticate(body);

      if (response !== undefined && response.status === 401) {
        console.warn('error logging !!!!', response)
        isLoading.value = false;
      } else if (response !== undefined && response.status === 200) {
        console.info(' logging successfull !!!!', response.data)
        isLoading.value = false;
      }
    };
    return {
      isLoading,
      login,
    };
  },
});
</script>

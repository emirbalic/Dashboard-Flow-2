<template>
  <div>
    <h1>This is login view</h1>
    <button class="button is-primary" @click="login">
      Login
    </button>
    <button  class="button is-cancel" @click="cleanStorage">
            Clear storage
          </button>
  </div>
</template>
    
<script lang="ts">
import { defineComponent, ref } from 'vue';
import { authenticate } from '@/api/authenicate';
import { ILoginCredentials } from '@/models/IUtilModels'

import { save as saveToStore } from '@/localStorage';
import { remove as removeFromoStore } from '@/localStorage';

export default defineComponent({
  components: {
  },
  setup() {


    const cleanStorage = () => {
      const clean =  removeFromoStore('logged')
    }

    const login = async () => {
      console.info(' logging triggered !!!!')

      const body: ILoginCredentials = {
        username: "admin",
        password: "Pa$$w0rd",
      }
      const response = await authenticate(body);

      if (response !== undefined && response.status === 401) {
        console.warn('error logging !!!!', response)
      } else if (response !== undefined && response.status === 200) {
        console.info(' logging successfull !!!!', response.data)
        saveToStore('logged', {
          username: response.data.username,
          isAdmin: response.data.is_admin,
          access_token: response.data.access,
          requiresReset: response.data.requires_reset,
        });
      }
    };
    return {
      cleanStorage,
      login,
    };
  },
});
</script>

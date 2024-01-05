<template>
  <div class="login">
    <form @submit.prevent="login" autocomplete="off">
      <p class="login-title">Order management reporting</p>
      <div class="input">
        <label for="login_username">Username</label>
        <input type="text" placeholder="Username..." id="login_username" v-model="input.username" />
      </div>
      <div class="input">
        <label for="login_password">Password</label>
        <input type="password" placeholder="Password..." id="login_password" v-model="input.password" />
      </div>
      <button type="submit" class="button is-primary" :disabled="!isValid">
        Login
      </button>
    </form>
  </div>
</template>
    
<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { authenticate } from '@/api/users';
import { ILoginCredentials } from '@/models/IUtilModels'

import router from '@/router';

import { save as saveToStore } from '@/localStorage';

export default defineComponent({
  // components: {
  // },
  setup() {

    const input = ref({
      username: '',
      password: '',
    });

    const isValid = computed(() => {
      return Object.values(input.value).every(Boolean);
    });

    const login = async () => {
      console.info(' logging triggered !!!!')
      const { username, password } = input.value;


      const body: ILoginCredentials = {
        username,
        password,
      }
      const response = await authenticate(body);

      if (response !== undefined && response.status === 401) {
        console.warn('error logging !!!!', response)
      } else if (response !== undefined && response.status === 200) {
        console.info(' logging successfull !!!!', response.data)
        saveToStore('logged', {
          username: response.data.username,
          id: response.data.id,
          isAdmin: response.data.is_admin,
          access_token: response.data.access,
          refresh_token: response.data.refresh,
          requiresReset: response.data.requires_reset,
        });
        //++
        router.push({
                name: 'orders',
            });
      }
    };
    return {
      input,
      isValid,
      login,
    };
  },
});
</script>

<style lang="scss">

.login {
  background-image: url('../../assets/login_background.jpg');
  background-size: cover;
  height: 100vh;
  width: 100%;
  overflow-y: scroll;
  display: flex;
  align-items: center;

  @include flex-v;
  min-height: 100vh;
  justify-content: center;
  align-items: center;

  >form {
    margin: 0 10% ;//!important
    padding: 30px 60px 80px;
    min-width: 480px;
    max-width: 480px;
    background-color: transparent;
    border: 1px solid #fff;
    border-radius: 20px;
    
    .login-title {
      margin: 10px auto 20px;
      color: #fff;
      font-size: 26px;
      font-weight: bold;
    }

    .input {
      @include flex-v;

      >label {
        margin-bottom: 2px;
        font-size: 22px;
        color: #fff;
      }

      >input {
        border-radius: 8px;
        max-width: 440px;
        border: 1px solid #fff;
        color: gray;
        width: 100%;
        padding: 16px;
      }
      // >button {
      //   max-width: fit-content;
      // }
    }

    @include flex-v;

    @include not-last-child {
      margin-bottom: 24px;
    }

    >.button {
      padding: 16px 24px;
    }
  }
}
</style>
@/api/users
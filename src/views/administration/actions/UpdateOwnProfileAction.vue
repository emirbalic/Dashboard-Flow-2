<template>
  <!--  -->

  <!-- -->
  <div class="admin-action"  >

    <div class="admin-action-title">
      <h3><b>Update your profile</b></h3>
    </div>
    <div class="admin-action-content">

      <form @submit.prevent="submitForm">
        <div>
          <label for="username">Username</label>
          <input required type="text" name="username" id="username" v-model.trim="username" />
        </div>
        <div>
          <label for="firstName">First Name</label>
          <input required type="text" name="firstName" id="firstName" v-model.trim="firstName" />
        </div>
        <div>
          <label for="lastName">Last Name</label>
          <input required type="text" name="lastName" id="lastName" v-model.trim="lastName" />
        </div>
        <div>
          <label for="email">Email</label>
          <input required type="text" name="email" id="email" v-model.trim="email" />
        </div>

        <button type="submit" class="button is-primary">
          <slot name="loader" v-if="isSubmitting">
            <loader :message="''" :type="'small'" :color="SMALL_LOADER_COLOR"></loader>
          </slot>
          <slot v-else>
            Save
          </slot>
        </button>

      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import { useStore } from 'vuex';

import router from '@/router';

import { showNotice } from '@/visuals';

import Loader from '@/components/common/Loader.vue';

import {SMALL_LOADER_COLOR} from '@/constants/colors'


export default defineComponent({
  components: {
    Loader
  },

  props: {
    user: {
      type: Object,
      required: true,
      default: null
    },
    // loadingUser: {
    //   type: Boolean,
    //   required: true
    // },
  },



  setup(props) {


    const isSubmitting = ref(false)
    // const loadingUser = ref(props.loadingUser)

    const user = ref(props.user)

    // console.log('here ist ', loadingUser);
    // console.log('isLoading ist ', isLoading.value);

    const store = useStore();

    const _username = ref(user.value.username);

    let username = ref(user.value.username);
    let firstName = ref(user.value.first_name);
    let lastName = ref(user.value.last_name);

    let email = ref(user.value.email);


    // watch(
    //   () => [user],
    //   () => {
    //     if (user === null) {
    //       isLoading.value === true;
    //     } else {
    //       isLoading.value === false;
    //     }
    //   }
    // );


    const submitForm = async () => {
      isSubmitting.value = true;

      const body = {
        username: username.value,
        first_name: firstName.value,
        last_name: lastName.value,
        email: email.value,
        _username: _username.value

      };


      let status = await store.dispatch('administration/updateOwnProfile', body);


      if (!status) {

        showNotice({
          props: {
            type: 'error',
            duration: 5000,
            message: `The user ${body.username} profile can not be updated at this time`,
          },
        });
        isSubmitting.value = false;

      } else {

        showNotice({
          props: {
            type: 'success',
            duration: 5000,
            message: `The user ${body.username} successfully updated`,
          },
        });
        isSubmitting.value = false;

        router.push({
          name: 'users-overview',
        });


      }
    };




    return {
      SMALL_LOADER_COLOR,

      email,
      firstName,
      isSubmitting,
      lastName,
      username,

      submitForm,
    };
  },
});
</script>

<style lang="scss" scoped >
@import "@/styles/components/administration.scss";
</style>
@/constants/colors
<template>
    <!-- <Modal> -->
      <div class="admin-action">
        <div class="admin-action-title">
          <h3><b>New User Properties</b></h3>
        </div>
        <div class="admin-action-content">
          <form @submit.prevent="submitForm">
            <div>
              <label for="username">Username*</label>
              <input
                required
                type="text"
                name="username"
                id="username"
                v-model.trim="username"
              />
            </div>
            <div>
              <label for="firstName">First Name*</label>
              <input
                required
                type="text"
                name="firstName"
                id="firstName"
                v-model.trim="firstName"
              />
            </div>
            <div>
              <label for="lastName">Last Name*</label>
              <input
                required
                type="text"
                name="lastName"
                id="lastName"
                v-model.trim="lastName"
              />
            </div>
            <div>
              <label for="email">Email*</label>
              <input
                required
                type="text"
                name="email"
                id="email"
                v-model.trim="email"
              />
            </div>
            <div>
              <label for="password">Password *</label>
              <input
                required
                id="password"
                v-model="password"
                type="password"
                name="password"
              />
            </div>
            <div>
              <label for="is-admin">Is Admin *</label>
              <div class="select">
                <select required id="is-admin" v-model="isAdmin" name="is-admin">
                  <option :value="1">Yes</option>
                  <option selected :value="0">No</option>
                </select>
              </div>
            </div>
           
              <button type="submit" class="button is-primary">
                Save
              </button>
            
          </form>
        </div>
      </div>
    <!-- </Modal> -->
  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { useStore } from 'vuex';
//   import { showNotice } from '@/services/view';
  
  export default defineComponent({
    // components: {
    //   Modal,
    // },
  
    // emits: ['close-modal'],
    // _, context
    setup() {
      const store = useStore();
      let username = ref('');
      let firstName = ref('');
      let lastName = ref('');
      let email = ref('');
      let isAdmin = ref(0);
      let password = ref('');

      const cleanForm = () => {
        username.value = '',
          firstName.value = '',
          lastName.value = '',
          email.value = '',
          isAdmin.value = 0,
          password.value = ''
      }
  
      const submitForm = async () => {
        const body = {
          username: username.value,
          firstName: firstName.value,
          lastName: lastName.value,
          email: email.value,
          is_staff: isAdmin.value,
          passwd: password.value,
        };
  
        let status = await store.dispatch('administration/addUser', body);

        if(status) {
          cleanForm()
        }
  
        // if (!status) {
        //   showNotice({
        //     props: {
        //       type: 'error',
        //       duration: 5000,
        //       message: `The user ${body.username} can not be created at this time`,
        //     },
        //   });
        // } else {
        //   closeModal();
        //   showNotice({
        //     props: {
        //       type: 'success',
        //       duration: 5000,
        //       message: `The user ${body.username} successfully created`,
        //     },
        //   });
        // }
      };
  
     
      return {
        email,
        firstName,
        isAdmin,
        lastName,
        password,
        username,
  
        submitForm,
      };
    },
  });
  </script>

<style lang="scss" scoped >
@import "@/styles/components/administration.scss";
</style>
  
<template>
      <div class="admin-action">
        <div class="admin-action-title">
          <h3><b>New User Properties</b></h3>
        </div>
        <div class="admin-action-content">
          
          <form @submit.prevent="submitForm">
            <div>
              <label for="username">Username*</label>
              <input
              readonly
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
            <!-- <div>
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
                <select required id="is-admin" v-model="isAdmin" name="is-admin">
                  <option :value="1">Yes</option>
                  <option selected :value="0">No</option>
                </select>
             </div> -->
           
              <button type="submit" class="button is-primary">
                Save
              </button>
            
          </form>
        </div>
      </div>
   </template>
  
  <script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { useStore } from 'vuex';
 
import router from '@/router';

import { IUser } from '@/models/IUser';

  
  export default defineComponent({

    props: {
        user: {
            type: Object,
            required: true
        },
    },



    setup(props) {
        // console.log(props.user);

        const user = ref(props.user)

        
      const store = useStore();
      let username = ref(props.user.username);
      let firstName = ref(props.user.first_name);
      let lastName = ref(props.user.last_name);
     
      let email = ref(props.user.email);
    //   let isAdmin = ref(props.user.is_staff);
    //   let password = ref('');

      const cleanForm = () => {
        username.value = '',
          firstName.value = '',
          lastName.value = '',
          email.value = ''
        //   isAdmin.value = 0,
        //   password.value = ''
      }
  
      const submitForm = async () => {
        const body = {
          username: username.value,
          firstName: firstName.value,
          lastName: lastName.value,
          email: email.value,
        //   is_staff: isAdmin.value,
        //   passwd: password.value,
        };
  
        let status = await store.dispatch('administration/addUser', body);

        if(status) {
          cleanForm()
        }

        router.push({
                name: 'users-overview',
            });
  
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
        lastName,
        username,
        // isAdmin,
        // password,
  
        submitForm,
      };
    },
  });
  </script>

<style lang="scss" scoped >
@import "@/styles/components/administration.scss";
</style>
  
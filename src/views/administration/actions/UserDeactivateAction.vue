<template>
  <div class="admin-action admin-action__small">
    <div class="admin-action-title">
      <h3>
        <b>
          Are you sure you want to deactivate your profile? 
        </b>
      </h3>
    </div>
    <div class="admin-action-content">
    
      <div>
        <button class="button is-primary" @click="deactivateProfile">
          Deactivate
        </button>
      </div>
    </div>
  </div>
</template>
  
<script lang="ts">
import { defineComponent } from 'vue';
import { deactivate } from '@/api/admin'

import { remove as removeFromStore } from '@/localStorage';

import router from '@/router';

import { showNotice } from '@/visuals';


export default defineComponent({
 
  setup() {

 

    const deactivateProfile = async () => {

      deactivate().then(()=> {
        removeFromStore('logged');
            //   api.cancel();
            router.push({
                name: 'login',
            });
      });




      // router.push({
      //         name: 'users-overview',
      //     });

      if (!status) {
        showNotice({
          props: {
            type: 'error',
            duration: 5000,
            // message: `The user ${body.username} can not be created at this time`,
          },
        });
      } else {
        // closeModal();
        showNotice({
          props: {
            type: 'success',
            duration: 5000,
            // message: `The user ${body.username} successfully created`,
          },
        });
      }
    };


    return {


      deactivateProfile,
    };
  },
});
</script>

<style lang="scss" scoped >
@import "@/styles/components/administration.scss";
</style>
  
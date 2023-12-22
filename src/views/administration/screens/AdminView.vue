
<template>
  <!-- <change-password-modal @close-modal="closeModal" v-if="isPasswordModalActive"></change-password-modal> -->

  <!-- @keyup.esc="closeModal" -->
  <!-- <div class="settings-screen" > -->
    <header>
      <h2 class="title">Admin area</h2>
    </header>
    <div class="container">
      <Tabs>
        <Tab title="Add new user">
          <!-- <p class="title">Add new user</p> -->
          <add-user-action></add-user-action>
        </Tab>
        <Tab title="Delete user">
          <p class="title">Delete user</p>
         
        </Tab>
        <Tab title="Reset user password">
          <p class="title">Reset user password</p>
        </Tab>
       
        <Tab title="Unblock user">
          <p class="title">Unblock user</p>
        </Tab>
       
        <Tab title="Update user activity">
          <p class="title">Update user activity</p>
        </Tab>
       
      </Tabs>
    </div>
  <!-- </div> -->
</template>
  
<script lang="ts">
import { defineComponent, ref } from 'vue';
// import { get as getFromStore } from '@/localStorage';

import Tab from '@/components/common/Tab.vue';
import Tabs from '@/components/common/Tabs.vue';
// import Modal from '@/components/common/Modal.vue';
//   import ChangePasswordModal from '../modals/ChangePasswordModal.vue';
import AddUserAction from '@/views/administration/actions/AddUserAction.vue'

export default defineComponent({
  components: {
    Tab,
    Tabs,
    AddUserAction
    //   ChangePasswordModal
  },
  setup() {
    //   const settings = ref({
    //     ...getFromStore('settings'),
    //   });

    // let isEditModalActive = ref(false);
    // let isPasswordModalActive = ref(false);

    // const openPasswordModal = () => {
    //   isPasswordModalActive.value = true;
    // };

    // const closeModal = () => {
    //   // isEditModalActive.value = false;
    //   isPasswordModalActive.value = false;
    // };

    return {
      // isEditModalActive,
      // isPasswordModalActive,
      // settings,

      // closeModal,
      // openPasswordModal,
    };
  },
});
</script>
<style lang="scss" scoped >
@import "@/styles/components/administration.scss";
// .container {
//   margin: 20px;
// }

// section {
//   // @include flex-v;
//   // flex-direction: row;
//   display: inline-block;
//   font-family: "IBM Plex Sans", sans-serif;
//   font-size: 10px;
//   max-width: 80%;
//   padding: 20px;
//   box-shadow: 6px 6px 20px -4px rgba(0, 0, 0, 0.3);
//   margin-bottom: 24px;

//   >header {
//     border-bottom: 1px solid #e0e0e0;
//     padding-bottom: 8px;
//     margin-bottom: 10px;

//     p {
//       // padding: 5px 0;
//       // align-items: center;
//       font-family: "IBM Plex Sans", sans-serif;
//       font-size: 14px;
//       font-weight: bold;
//     }
//   }

//   label {
//     padding: 5px 0;
//     font-size: 14px;
//     font-weight: 500;
//   }

//   select {
//     padding: 10px 0;
//     width: 100%;
//     border: 1px solid#E0E0E0;
//     margin: 10px 0;
//   }
// }

// // button {
// //   width: 100%;
// //   padding: 15px;
// // }
// .modal-action {
//   position: fixed;
//   background: white;
//   top: 50%;
//   left: 50%;
//   transform: translate(-50%, -50%);
//   width: 50%;
//   padding: 20px;
//   border-radius: 5px;

//   &-title {
//     border-bottom: 1px solid #bebebe;
//   }

//   &-content {
//     margin-top: 20px;

//     form {
//       display: grid;
//       grid-template-columns: repeat(2, minmax(100px, 1fr));
//       grid-gap: 20px;

//       div {
//         grid-column: span 1;

//         input,
//         select {
//           width: 100%;
//           height: 40px;
//           padding: 0 10px;
//         }
//       }

//       .form-btns {
//         grid-column: span 2;
//         display: flex;
//         justify-content: space-between;

//         button {
//           max-width: 120px;
//         }
//       }
//     }
//   }

//   &-btns {
//     margin-top: 20px;
//     display: flex;
//     justify-content: space-between;
//   }
// }
</style>
  





<!-- <template>This is administration</template>
<script lang="ts">
import { defineComponent } from 'vue';


export default defineComponent({
    setup(){}
})
</script>
<style></style> -->
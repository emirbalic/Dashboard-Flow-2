
<template>
  <!-- <change-password-modal @close-modal="closeModal" v-if="isPasswordModalActive"></change-password-modal> -->

  <!-- @keyup.esc="closeModal" -->
  <!-- <div class="settings-screen" > -->
    <header>
      <h2 class="title">Admin area</h2>
    </header>
    <div class="container">
      <Tabs>
        <Tab title="Unblock user">
          <p class="title">Unblock user</p>
        </Tab>
        <Tab title="Add new user">
          <add-user-action></add-user-action>
        </Tab>
        <Tab title="Delete user">
          <delete-user-action :users="users"></delete-user-action>
        </Tab>

        <Tab title="Reset user password">
          <p class="title">Reset user password</p>
        </Tab>
       
       
        <Tab title="Update user activity">
          <p class="title">Update user activity</p>
        </Tab>
       
      </Tabs>
    </div>
  <!-- </div> -->
</template>
  
<script lang="ts">
// import { defineComponent, ref } from 'vue';

import { computed, defineComponent, onMounted, ref } from 'vue';
import { useStore } from 'vuex';

// import { get as getFromStore } from '@/localStorage';

import Tab from '@/components/common/Tab.vue';
import Tabs from '@/components/common/Tabs.vue';
import { IUser } from '@/models/IUser';
//   import ChangePasswordModal from '../modals/ChangePasswordModal.vue';
import AddUserAction from '@/views/administration/actions/AddUserAction.vue'
import DeleteUserAction from '@/views/administration/actions/DeleteUserAction.vue'
import { get as getFromStore, remove as removeFromStore } from '@/localStorage';

export default defineComponent({
  components: {
    Tab,
    Tabs,
    AddUserAction,
    DeleteUserAction
  },
  setup() {
   

    const store = useStore();
    const loggedUser = computed(() => getFromStore("logged.username"));
    
    const users = computed(() => {
        let data = store.getters['administration/getUsers'];
        if (!data) return
        let filteredData = data.filter((x: IUser) => x.username !== loggedUser.value);
        return filteredData;
    });

    const updateList = async () => {
        return Promise.allSettled([
            store.dispatch('administration/setUsers')
        ])
    }
    onMounted(() => {
        updateList()
    })

    return {
      users
     
    };
  },
});
</script>
<style lang="scss" scoped >
@import "@/styles/components/administration.scss";

</style>


<template>

    <header>
      <h2 class="title">Admin area</h2>
    </header>
    <div class="container">
      <Tabs>
        <Tab title="Add new user">
          <add-user-action></add-user-action>
        </Tab>
        <Tab title="Delete user">
          <delete-user-action :users="users"></delete-user-action>
        </Tab>
        
        <Tab title="Unblock user">
          <unblock-user-action :blocked-users="blockedUsers"></unblock-user-action>
        </Tab>
        
        <Tab title="Reset user password">
          <reset-user-password-action :users="users"></reset-user-password-action>
        </Tab>
        
        <Tab title="Update user activity">
          <update-user-activity-action :users="users"></update-user-activity-action>
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
import UnblockUserAction from '@/views/administration/actions/UnblockUserAction.vue'
import ResetUserPasswordAction from '@/views/administration/actions/ResetUserPasswordAction.vue'
import UpdateUserActivityAction from '@/views/administration/actions/UpdateUserActivityAction.vue'

import { get as getFromStore } from '@/localStorage';

export default defineComponent({
  components: {
    Tab,
    Tabs,

    AddUserAction,
    DeleteUserAction,
    ResetUserPasswordAction,
    UnblockUserAction,
    UpdateUserActivityAction
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

    const blockedUsers = computed(() => {
      let data = users.value;
      let blockedUsers = data.filter((user: IUser) => user.is_blocked === true)
      return blockedUsers
    })

    const updateList = async () => {
        return Promise.allSettled([
            store.dispatch('administration/setUsers')
        ])
    }
    onMounted(() => {
        updateList()
    })

    return {
      blockedUsers,
      users
     
    };
  },
});
</script>
<style lang="scss" scoped >
@import "@/styles/components/administration.scss";

</style>

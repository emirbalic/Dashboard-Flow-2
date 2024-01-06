
<template>
    <header>
      <h2 class="title">User area</h2>
    </header>
    <div class="container">
      <Tabs>
        <Tab title="Update profile">
          <span v-if="user">
            <update-own-profile-action :user="user" v-if="!requiresReset" ></update-own-profile-action>
            <p v-else>{{NOT_AUTHORIZED}}</p>
          </span>
        </Tab>
        <Tab title="Update password" >
          <reset-own-password-action></reset-own-password-action>
        </Tab>



        <Tab title="Deactivate" >
          <user-deactivate-action v-if="!requiresReset"></user-deactivate-action>
          <p v-else>{{NOT_AUTHORIZED}}</p>
        </Tab>
      </Tabs>
    </div>
</template>
  
<script lang="ts">

import { computed, defineComponent, onMounted } from 'vue';
import Tab from '@/components/common/Tab.vue';
import Tabs from '@/components/common/Tabs.vue';
import ResetOwnPasswordAction from '@/views/administration/actions/ResetOwnPasswordAction.vue'
import UpdateOwnProfileAction from '@/views/administration/actions/UpdateOwnProfileAction.vue'
import UserDeactivateAction from '@/views/administration/actions/UserDeactivateAction.vue'

import { useStore } from 'vuex';

import { get as getFromStore } from '@/localStorage';
import { IUser } from '@/models/IUser';

export default defineComponent({
  components: {
    UserDeactivateAction,
    ResetOwnPasswordAction,
    Tab,
    Tabs,
    UpdateOwnProfileAction
  },
  setup() {
   
    const NOT_AUTHORIZED = 'You are not authorized to see this section, you have to update your password first'
    const store = useStore();

    const userId = computed(() => getFromStore("logged.id"));
    const setUser = async () => {

            return Promise.allSettled([
                store.dispatch('administration/setUser', userId.value)
            ])
        }

    const user = computed(() => {
        let user = store.getters['administration/getUser'];
        if (!user) return        
        return user;
    });

    const requiresReset = computed(() => getFromStore("logged.requiresReset"));


    const admins = computed(() => {
        let data = store.getters['administration/getUsers'];
        if (!data) return
        let filteredData = data.filter((x: IUser) => x.is_staff === true);
        return filteredData;
    });

    onMounted(() => {
      setUser()
        })

    return {
        NOT_AUTHORIZED,

        admins,
        requiresReset,

        user,
        // username
    };
  },
});
</script>
<style lang="scss" scoped >
@import "@/styles/components/administration.scss";

</style>

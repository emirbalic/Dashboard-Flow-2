
<template>
    <header>
      <h2 class="title">Admin area</h2>
    </header>
    <div class="container">
      <Tabs>
        <Tab title="Update password" >
          <reset-own-password-action></reset-own-password-action>
        </Tab>
        <Tab title="Update profile" >
          <p v-if="!requiresReset"  class="title">Update profile</p>
          <p v-else>{{  NOT_AUTHORIZED }}</p>
        </Tab>
        <Tab title="My profile">
          <p v-if="!requiresReset" class="title">My profile</p>
          <p v-else>{{NOT_AUTHORIZED}}</p>
        </Tab>
      </Tabs>
    </div>
</template>
  
<script lang="ts">

import { computed, defineComponent } from 'vue';
import Tab from '@/components/common/Tab.vue';
import Tabs from '@/components/common/Tabs.vue';
import ResetOwnPasswordAction from '@/views/administration/actions/ResetOwnPasswordAction.vue'


import { get as getFromStore } from '@/localStorage';

export default defineComponent({
  components: {
    ResetOwnPasswordAction,
    Tab,
    Tabs,
  },
  setup() {
   
    const NOT_AUTHORIZED = 'You are not authorized to see this section, you have to update your password first'
    const requiresReset = computed(() => getFromStore("logged.requiresReset"));

    return {
        NOT_AUTHORIZED,
        requiresReset,
    };
  },
});
</script>
<style lang="scss" scoped >
@import "@/styles/components/administration.scss";

</style>

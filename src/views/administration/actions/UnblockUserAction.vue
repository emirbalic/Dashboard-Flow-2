<template>
    <div class="admin-action admin-action__small">
        <div class="admin-action-title">
            <h3>
                <b>
                    Unblock user
                </b>
            </h3>
        </div>
        <div class="admin-action-content">
            <div class="single-select">
                <select id="select" v-model="user">
                    <option value="" disabled selected>Select User</option>
                    <option v-for="user in users" :key="user.id" :value="user.username">
                        {{ user.username }}
                    </option>
                </select>
            </div>
            <div>
                <button class="button is-primary" @click="unblockUser">
                    Unblock
                </button>
            </div>
        </div>
    </div>
</template>
  
<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useStore } from 'vuex';
import { IUser } from '@/models/IUser';

//   import { showNotice } from '@/services/view';
import router from '@/router';

export default defineComponent({

    props: {
        blockedUsers: {
            type: Array,
        },

    },

    setup(props) {

        const store = useStore();

        const user = ref('');
        const users = ref<IUser[]>(props.blockedUsers as IUser[])


        const unblockUser = async () => {
            await store.dispatch('administration/unblockUser', user.value);
            await store.dispatch('administration/setUsers')
            router.push({
                name: 'users-overview',
            });
        };


        // if (props.deletable) {
        //   let status = await store.dispatch('admin/deleteUser', { id: props.id });
        //   if (!status) {
        //     showNotice({
        //       props: {
        //         type: 'error',
        //         duration: 5000,
        //         message:
        //           `The user ${username} could not be deleted at this time, you can try again later`,
        //       },
        //     });
        //   } else {
        //     closeModal();
        //     showNotice({
        //       props: {
        //         type: 'success',
        //         duration: 5000,
        //         message: `The user ${username} successfully deleted`,
        //       },
        //     });
        //   }
        // }




        return {
            users,
            user,

            unblockUser,

        };
    },
});
</script>
<style lang="scss" scoped >
@import "@/styles/components/administration.scss";
</style>
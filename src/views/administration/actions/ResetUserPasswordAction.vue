<template>
    <div class="admin-action admin-action__small">
        <div class="admin-action-title">
            <h3>
                <b>
                    Reset user's password
                </b>
            </h3>
        </div>
        <div class="admin-action-content">
            <div class="single-select">
                <select id="select" v-model="username">
                    <option value="" disabled selected>Select User</option>
                    <option v-for="user in users" :key="user.id" :value="user.username">
                        {{ user.username }}
                    </option>
                </select>
            </div>


            <input type="password" v-model="password" placeholder="New password" />

            <div>
                <button class="button is-primary" @click="resetUserPassword">
                    Reset
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
        users: {
            type: Array,
        },

    },

    setup(props) {

        const store = useStore();
        const username = ref('');
        const password = ref('');
        const users = ref<IUser[]>(props.users as IUser[])


        const resetUserPassword = async () => {
            const body = {
                new_passwd: password.value,
                target_user: username.value
            };

            let status = await store.dispatch('administration/updateUserPassword', body);

            if (status) {

                router.push({
                    name: 'users-overview',
                });
            }
        };


        // if (props.deletable) {
        //   let status = await store.dispatch('admin/resetUserPassword', { id: props.id });
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
            username,
            users,
            password,

            resetUserPassword,

        };
    },
});
</script>
<style lang="scss" scoped >
@import "@/styles/components/administration.scss";
</style>
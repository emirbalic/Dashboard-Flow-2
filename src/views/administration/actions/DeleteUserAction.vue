<template>
    <div class="admin-action admin-action__small">
        <div class="admin-action-title">
            <h3>
                <b>
                    Delete user
                </b>
            </h3>
        </div>
        <div class="admin-action-content">
            <div class="single-select">
                <select id="select" v-model="userId">
                    <option value="" disabled selected>Select User</option>
                    <option v-for="user in users" :key="user.id" :value="user.id">
                        {{ user.username }}
                    </option>
                </select>
            </div>
            <div>
                <button class="button is-primary" @click="deleteUser">
                    Delete
                </button>
            </div>
        </div>
    </div>
</template>
  
<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue';
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

        const userId = ref('');
        const users = ref<IUser[]>(props.users as IUser[])


        const deleteUser = async () => {
            let status = await store.dispatch('administration/deleteUser', { id: userId.value });

            if (status) {

                router.push({
                    name: 'users-overview',
                });
            }
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
            userId,

            deleteUser,

        };
    },
});
</script>
<style lang="scss" scoped >
@import "@/styles/components/administration.scss";
</style>
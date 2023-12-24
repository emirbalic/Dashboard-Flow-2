<template>
    <div class="admin-action admin-action__small">
        <div class="admin-action-title">
            <h3>
                <b>
                    Update user activity status
                </b>
            </h3>
        </div>
        <div class="admin-action-content">
            <div class="single-select">

                <select id="select" v-model="user">
                    <option value='' disabled>Select User</option>
                    <option v-for="user in users" :key="user.id" :value="user">
                        {{ user.username }} - {{ user.is_active ? 'Active' : 'Not active' }}
                    </option>
                </select>

              


            </div>
            <!-- :disabled="disabled"-->
            <button class="button is-primary" @click="updateUserStatus">
                Update status
            </button>

        </div>
    </div>
</template>
  
<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
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

        const user = ref('');
        // const user = ref<IUser | string>('');
        const users = ref<IUser[]>(props.users as IUser[])


        // // add in UX
        // const disabled = ref(true);
        // watch(
        //     () => [user.value],
        //     () => {
        //         if (user.value) {
        //             // console.log('user here ', user.value);

        //             disabled.value = false
        //         } else {
        //             // console.log('user here ', user.value);
        //             disabled.value = true
        //         }
        //     }
        // );

        const updateUserStatus = async () => {
            // let body = {
            //     username: user.value.username,
            //     activity: !user.value.is_active
            // }


            let body = {
                //@ts-ignore
                username: user.value?.username,
                //@ts-ignore
                is_active: !user.value?.is_active
            }



            console.log(body);

            await store.dispatch('administration/updateUserActivityStatus', body);
            // await store.dispatch('administration/setUsers')
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
            // disabled,

            users,
            user,

            updateUserStatus




        };
    },
});
</script>
<style lang="scss" scoped >
@import "@/styles/components/administration.scss";
</style>
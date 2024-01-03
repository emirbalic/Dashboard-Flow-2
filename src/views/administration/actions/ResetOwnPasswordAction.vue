<template>
    <div class="admin-action admin-action__small">
        <div class="admin-action-title">
            <h3>
                <b>
                    Update user's password
                </b>
            </h3>
        </div>
        <div class="admin-action-content">



            <input type="password" v-model.trim="password" placeholder="New password" />
            <input type="password" v-model.trim="passwordRepeat" placeholder="Repeat password" />

            <div>
                <button class="button is-primary" @click="updateUserPassword">
                    Update
                </button>
            </div>
        </div>
    </div>
</template>
  
<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { useStore } from 'vuex';
import { IUser } from '@/models/IUser';

//   import { showNotice } from '@/services/view';
import router from '@/router';
// import { get as getFromStore } from '@/localStorage';
import { resetOwnPassword } from '@/api/admin';
import { get as getFromStore, remove as removeFromStore } from '@/localStorage';

export default defineComponent({

    props: {
        users: {
            type: Array,
        },

    },

    setup(props) {

        const store = useStore();

        const password = ref('')

        const passwordRepeat = ref('');


        const username = computed(() => getFromStore("logged.username"));

        const logout = () => {
      removeFromStore('logged');
    };

        const updateUserPassword = async () => {

            const body = {
                new_passwd: password.value,
                target_user: username.value
            };

            let requirmentsPattern = new RegExp(
                '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*\\W)'
            );
            let charRepeatPattern = new RegExp('(.)\\1\\1');

            if (!requirmentsPattern.test(password.value)) {
                console.log(`You need at least one uppercase letter, one lowercase letter, one number, one non-word character!`);
                return;
            }

            if (charRepeatPattern.test(password.value)) {
                console.log(`You can't repeat one character more than two times in succession!`);
                return;
            }

            if (password.value.length < 8) {
                console.log(`Password needs to be at least 8 characters long!`);
                return;
            }
            
            if (password.value !== passwordRepeat.value) {
                
                console.log(`Passwords have to match!`);
                return;
            }
           
            const status = await resetOwnPassword(body);
           
            if (status.status === 200) {
                logout()
                router.push({
                    name: 'login',
                });
            }
        };


        // if (props.deletable) {
        //   let status = await store.dispatch('admin/updateUserPassword', { id: props.id });
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
            password,
            passwordRepeat,

            updateUserPassword,

        };
    },
});
</script>
<style lang="scss" scoped >
@import "@/styles/components/administration.scss";
</style>
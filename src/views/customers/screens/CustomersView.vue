<template>
    <header>
        <div class="title">

            Customers / Customers
        </div>

    </header>


    <!-- @click="closeDropdown" -->
    <div class="body">


        <h3>System loaded {{ customers?.length }} customers</h3>

        <table>
            <thead>
                <tr>

                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Title</th>
                    <th>Gender</th>
                    <th>Address</th>
                    <th>City</th>
                    <th>Region</th>
                    <th>Postal code</th>
                    <th>Country</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <!-- <th>Actions</th> -->
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, i) in customers" :key="i">
                    <!-- <td>{{ item.id }}</td> -->
                    <!-- <td>{{ formatDate(item.order_date) }}</td> -->

                    <td>{{ item.first_name }}</td>
                    <td>{{ item.last_name }}</td>
                    <td>{{ item.title }}</td>

                    <td>{{ item.gender }}</td>
                    <td>{{ item.address }}</td>
                    <td>{{ item.city }}</td>
                    <td>{{ item.region }}</td>
                    <td>{{ item.postal_code }}</td>
                    <td>{{ item.country }}</td>
                    <td>{{ item.phone }}</td>
                    <td>{{ item.email }}</td>
                    <!-- <td>
                        <span>
                            <Block_Icon class="table_icon" @click="goToEdit(item.type_short, item.id, item.type)" />
                        </span>
                        <span style="margin-left: .8rem;" @click="() => openDeleteModal(item.id, item.id)">
                            <Unblock_Icon class="table_icon" />
                        </span>
                    </td> -->
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useStore } from 'vuex';
// import dayjs from 'dayjs';
import { loadCustomers } from '@/api/customers';
import Block_Icon from '@/assets/icons/Block_Icon.vue';
import Unblock_Icon from '@/assets/icons/Unblock_Icon.vue';
// import formatDate from '@/composables/util'

export default defineComponent({
    components: {
        Block_Icon,
        Unblock_Icon
    },
    setup() {

        const store = useStore();
        const customers = ref();

        const getOrders = async () => {


            // this is just because of pagination, originaly do the one line only
            let data: any = await loadCustomers();
            customers.value = data.results;
            // console.log(customers.value);


        }

        // const formatDate = (date: Date) => {
        //     return dayjs(date).format('DD/MM/YYYY');
        // };

        const goToEdit = (option: string, id: number, type: string) => {
            // router.push({
            //   name: 'rule-management-rules-details',
            //   params: {
            //     option,
            //     id,
            //     type
            //   }
            // })
        }

        const openDeleteModal = (id: string, title: string) => {
            // entityTitle.value = title;
            // isDeleteModalVisible.value = true;
            // ruleRecordIdToDelete.value = id;
        };

        getOrders();

        return {
            customers,
            // goToEdit,
            // openDeleteModal
        }
    }
})
</script>

<style lang="scss" scoped></style>
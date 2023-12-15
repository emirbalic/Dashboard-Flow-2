<template>
    <h1>Hello default</h1>
    <button @click="addOrder">Get orders in dashboard</button>
    
        <ol v-for="order in orders">
            <li>{{ new Date(order.order_date).toLocaleString('de-DE') }}</li>
            <li>{{ order.shipped_name }}</li>
            <li>{{ order.shipped_address }}</li>
        </ol>
    
</template>

<!--              'customer',
                  'product',
                  'order_date',
                  'required_date',
                  'shipped_date',
                  'shipped_via',
                  'shipped_name',
                  'shipped_address',
                  'shipped_city',
                  'shipped_region',
                  'shipped_postal_code',
                  'shipped_country' 
                -->

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { loadOrders } from '@/api/reporting';
// import dayjs from 'dayjs';

export default defineComponent({

    setup() {
        const orders = ref();

        const addOrder = async () => {


            // orders.value = await loadOrders({});
            console.log(orders.value);


        }

        return {
            addOrder,

            orders
        };
    }
})
</script>

<style></style>
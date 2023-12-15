<template>
    <modal @close="closeModal">
        <div class="modal-content">
            <div class="header">
                <div class="content">
                    <span class="title">Order properties</span>
                    <Close_Icon class="icon" @click="closeModal()"></Close_Icon>
                </div>
            </div>
            <!-- <error-message-header v-if="hasError" :message="errorMessage"></error-message-header> -->
            <label>
                <strong>
                    <small>
                        Product
                        <span class="validation-mark">*</span>
                    </small>
                </strong>
            </label>

            <select v-model="productId">
                <option value="" disabled selected>Select Product</option>
                <option v-for="product in products" :key="product.id" :value="product.id">
                    {{ product.product_name }}
                </option>
            </select>

            <label>
                <strong>
                    <small>

                        Customer
                        <span class="validation-mark">*</span>
                    </small>
                </strong>
            </label>
            <div class="content-wrapper">

                <select v-model="customerId">
                    <option value="" disabled selected>Select Customer</option>
                    <option v-for="customer in customers" :key="customer.id" :value="customer.id">
                        {{ customer.title }} {{ customer.first_name }} {{ customer.last_name }}
                    </option>
                </select>
            </div>

            <label>
                <strong>
                    <small>
                        Required date

                        <span class="validation-mark">*</span>
                    </small>
                </strong>
            </label>

            <input type="date" v-model="requiredDate" />
            <label>
                <strong>
                    <small>
                        Shipped Name

                        <span class="validation-mark">*</span>
                    </small>
                </strong>
            </label>
            <input type="text" v-model="shippedName" />
            <label>
                <strong>
                    <small>
                        Shipped Address

                        <span class="validation-mark">*</span>
                    </small>
                </strong>
            </label>
            <input type="text" v-model="shippedAddress" />
            <label>
                <strong>
                    <small>
                        Shipped City
                        <span class="validation-mark">*</span>
                    </small>
                </strong>
            </label>
            <input type="text" v-model="shippedCity" />
            <label>
                <strong>
                    <small>
                        Shipped Postal Code
                        <span class="validation-mark">*</span>
                    </small>
                </strong>
            </label>
            <input type="text" v-model="shippedPostalCode" />
            <label>
                <strong>
                    <small>
                        Shipped Country
                        <span class="validation-mark">*</span>
                    </small>
                </strong>
            </label>
            <input type="text" v-model="shippedCountry" />

            <div class="footer">
                <div class="content">
                    <button class="cancel" @click="closeModal()">CANCEL</button>
                    <button class="confirm" :disabled="!buttonEnable" @click="addNewRecord()">CONFIRM</button>

                </div>
            </div>
        </div>
    </modal>
</template>
  
<script lang="ts">
import { defineComponent, ref, onBeforeMount, watch, computed } from 'vue';

import Modal from '@/components/common/Modal.vue'
import { addNewOrder } from '@/api/reporting';


// import { showNotice } from '@/services/view';
// import Loader from '@/components/common/Loader.vue';
// import { get as getFromStore } from '@/services/store';

import { loadProducts } from '@/api/reporting';
import { loadCustomers } from '@/api/customers';
// import Down_Icon from '@/assets/icons/Down_Icon.vue';

//loadCustomers

// import ErrorMessageHeader from '@/components/common/ErrorMessageHeader.vue';


import Close_Icon from '@/assets/icons/Close_Icon.vue';
import { IOrder } from '@/models/IOrder';
import { useStore } from 'vuex';


export default defineComponent({
    components: {
        Close_Icon,
        // Down_Icon,

        // ErrorMessageHeader,
        // Loader,
        Modal,

    },
    emits: ['close-modal', 'update-list'],

    setup(_, context) {

        const buttonEnable = ref(false)


        // const customers = ref()
        // const products = ref()

        const customers = computed(() => {
            let data = store.getters['customerManagement/getCustomers'];
            if (!data) return
            return data;
        });

        const products = computed(() => {
            let data = store.getters['productManagement/getProducts'];
            if (!data) return
            return data;
        });



        // form
        const productId = ref('');
        const customerId = ref('');
        const requiredDate = ref('');
        const shippedName = ref('');
        const shippedAddress = ref('');
        const shippedCity = ref('');
        const shippedCountry = ref('');
        const shippedPostalCode = ref('');

        // const loggedUser = getFromStore('auth.username');
        const serviceKey = ref('')

        // let newRecord: Partial<IService> = {};

        const store = useStore();


        watch(
            () => [customerId.value, productId.value, requiredDate.value, shippedName.value, shippedAddress.value, shippedCity.value, shippedCountry.value, shippedPostalCode.value],
            () => {
                if (customerId.value === '' || productId.value === ''
                    || requiredDate.value === '' || shippedName.value === '' || shippedAddress.value === '' || shippedCity.value === ''
                    || shippedCountry.value === '' || shippedPostalCode.value === '') {
                    buttonEnable.value = false;
                } else {
                    buttonEnable.value = true;
                    //console.log('yes can!!!!!!');

                }
            }
        );

        const setDropdownData = async () => {



            return Promise.allSettled([
                store.dispatch('customerManagement/setCustomers', {}),
                store.dispatch('productManagement/setProducts', {}),
            ]);
        }

        ////OBSOLETE
        // const getCustomers = async () => {
        //     // store.dispatch('ruleManagement/setRules', {});
        //     customers.value = await loadCustomers();
        //     // console.log('customers downloaded', customers.value);

        // };
        // const getProducts = async () => {
        //     // store.dispatch('ruleManagement/setRules', {});
        //     products.value = await loadProducts();
        //     // console.log('products downloaded', products.value);
        // };


        const validateNewRecord = () => {
            if (customerId.value === '' || productId.value === ''
                || requiredDate.value === '' || shippedName.value === '' || shippedAddress.value === '' || shippedCity.value === ''
                || shippedCountry.value === '' || shippedPostalCode.value === '')
                return false;
            return true;
        };

        const addNewRecord = () => {

            // console.log("product id== ", productId.value);
            // console.log("customer id== ", customerId.value);
            // console.log("requiredDate id== ", requiredDate.value);
            // console.log("shippedName id== ", shippedName.value);
            // console.log("shippedAddress id== ", shippedAddress.value);
            // console.log("shippedCity id== ", shippedCity.value);
            // console.log("shippedCountry id== ", shippedCountry.value);
            // console.log("shippedPostalCode id== ", shippedPostalCode.value);

            if (validateNewRecord()) {

                let newOrderRecord: Partial<IOrder> = {};
                newOrderRecord.customerId = customerId.value;
                newOrderRecord.productId = productId.value;
                newOrderRecord.requiredDate = requiredDate.value;
                newOrderRecord.shippedName = shippedName.value;
                newOrderRecord.shippedAddress = shippedAddress.value;
                newOrderRecord.shippedCity = shippedCity.value;
                newOrderRecord.shippedCountry = shippedCountry.value;
                newOrderRecord.shippedPostalCode = shippedPostalCode.value;


                addNewOrder(newOrderRecord).then(() => {
                    closeModal();
                    updateList();
                });
            }


        };

        // const cleanModal = () => {
        //     description.value = '';
        //     serviceKey.value = ''
        // };

        const closeModal = () => {
            context.emit('close-modal');
        };

        const updateList = () => {
            context.emit('update-list');
        };

        onBeforeMount(() => {

            setDropdownData()
            // getCustomers()
            // getProducts()

        })



        return {
            buttonEnable,
            customers,
            customerId,
            products,
            productId,
            serviceKey,
            requiredDate,
            shippedName,
            shippedAddress,
            shippedCity,
            shippedCountry,
            shippedPostalCode,

            addNewRecord,
            closeModal,
            updateList



        };
    },
});
</script>
  

  
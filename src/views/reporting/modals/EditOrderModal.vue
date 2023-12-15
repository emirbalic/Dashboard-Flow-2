<template>
    <modal @close="closeModal">
        <div class="modal-content">
            <div>
                <div class="header">
                    <div class="content">
                        <span class="title">Service properties</span>
                        <Close_Icon class="icon" @click="closeModal()"></Close_Icon>
                    </div>
                </div>
                <label>
                    <strong>
                        Shipped Name:
                    </strong>
                </label>
                <input type="text" v-model="shippedName" />
                <label>
                    <strong>
                        Shipped Address:
                    </strong>
                </label>
                <input type="text" v-model="shippedAddress" />
                <label>
                    <strong>
                        Shipped Postal Code:
                    </strong>
                </label>
                <input type="text" v-model="shippedPostalCode" />
                <label>
                    <strong>
                        Shipped City:
                    </strong>
                </label>
                <input type="text" v-model="shippedCity" />
                <label>
                    <strong>
                        Shipped Country:
                    </strong>
                </label>
                <input type="text" v-model="shippedCountry" />
                <div class="footer">
                    <div class="content">
                        <button class="cancel" @click="closeModal();">
                            Cancel
                        </button>
                        <!-- -->
                        <button :disabled="!buttonEnable" class="confirm" @click="
                            handleUpdateOrder();
                        closeModal();">
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </modal>
</template>
  
<script lang="ts">
import { defineComponent, reactive, ref, watch } from 'vue';

import Modal from '@/components/common/Modal.vue';

import Close_Icon from '@/assets/icons/Close_Icon.vue';

export default defineComponent({
    components: {
        Close_Icon,
        Modal,
    },
    props: {
        shippedName: {
            type: String,
            required: true,
        },
        shippedAddress: {
            type: String,
            required: true,
        },
        shippedCity: {
            type: String,
            required: true,
        },
        shippedPostalCode: {
            type: String,
            required: true,
        },
        shippedCountry: {
            type: String,
            required: true,
        },


    },


    emits: ['close-modal', 'handle-edit'],

    setup(props, context) {

        // const serviceDescription = ref(props.serviceDescription)

        const buttonEnable = ref(false);

        // const shippedName = props.shippedName;

        const shippedName = ref(props.shippedName)
        const shippedAddress = ref(props.shippedAddress)
        const shippedPostalCode = ref(props.shippedPostalCode)
        const shippedCity = ref(props.shippedCity)
        const shippedCountry = ref(props.shippedCountry)
        // console.log(shippedName);


        const closeModal = () => {
            // console.log('im in modal and emitting...');
            // console.log('im in modal and emitting...');
            context.emit('close-modal');

        };

        // watch(
        //     () => serviceDescription.value,
        //     () => {
        //         if (serviceDescription.value !== props.serviceDescription) {
        //             buttonEnable.value = true;
        //         }
        //     }
        // );

        const editedOrder = reactive({})

        const handleUpdateOrder = () => {

            let response = {
                shippedName: shippedName.value,
                shippedAddress: shippedAddress.value,
                shippedPostalCode: shippedPostalCode.value,
                shippedCity: shippedCity.value,
                shippedCountry: shippedCountry.value,
            }
            // console.log('response >> ', response);

            Object.assign(editedOrder, response);
            editOrder(editedOrder);
        };

        watch(
            () => [shippedName.value, shippedAddress.value, shippedPostalCode.value, shippedCity.value, shippedCountry.value],
            () => {
                if (shippedName.value !== props.shippedName ||
                    shippedAddress.value !== props.shippedAddress ||
                    shippedPostalCode.value !== props.shippedPostalCode ||
                    shippedCity.value !== props.shippedCity ||
                    shippedCountry.value !== props.shippedCountry
                    ) {
                    buttonEnable.value = true;
                    console.log('changed ! >> ');
                }
            }
        );

        const editOrder = (editedOrder: any) => {
            context.emit('handle-edit', editedOrder);
        };

        return {
            buttonEnable,
            shippedName,
            shippedAddress,
            shippedCity,
            shippedPostalCode,
            shippedCountry,

            // serviceDescription,

            closeModal,
            handleUpdateOrder,
        };
    },
});

// src="@/styles/_rule-management-modal.scss"
</script>
  
<!-- <style lang="scss" scoped ></style> -->
  
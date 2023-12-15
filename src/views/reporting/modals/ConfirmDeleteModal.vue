<template>
    <modal @close="closeModal">
        <div class="modal-content">
            <div class="header">
                <div class="content">
                    <span class="title">Confirm delete</span>

                    <!-- <div class="close-wrapper" @click="closeModal()">
              <X_Icon></X_Icon>
            </div> -->
                    <Close_Icon class="icon" @click="closeModal()"></Close_Icon>
                </div>
            </div>
            <div class="body small">
                <!-- <error-message-header v-if="hasError" :message="errorMessage"></error-message-header> -->
                <!-- v-else -->
                <p>
                    Are you sure you want to delete {{ entityType }}
                    <strong>
                        {{ entityTitle }}
                    </strong>
                    ?
                </p>
            </div>
            <div class="footer">
                <div class="content">
                    <button class="cancel" @click="closeModal()">Cancel</button>
                    <button class="danger" @click="handleDeleteRecord()">Delete</button>
                </div>
            </div>
        </div>
    </modal>
</template>
  
<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import Modal from '@/components/common/Modal.vue';
import ErrorMessageHeader from '@/components/common/ErrorMessageHeader.vue';

import Close_Icon from '@/assets/icons/Close_Icon.vue';

export default defineComponent({
    components: {
        Close_Icon,
        ErrorMessageHeader,
        Modal,
        // X_Icon,
    },
    props: {
        entityType: {
            type: String,
        },
        entityTitle: {
            type: Number,
        },
        //   hasError: {
        //     type: Boolean,
        //     default: false
        //   },
        //   errorMessage: {
        //     type: String,
        //   },
    },
    emits: ['close-modal', 'handle-delete'],
    setup(props, context) {

        const entityType = ref(props.entityType)
        const entityTitle = ref(props.entityTitle)

        //   const hasError = computed(() => {
        //     return props.hasError
        //   });

        //   const errorMessage = computed(() => {
        //     return props.errorMessage
        //   });      

        const closeModal = () => {
            // console.log('please close');

            context.emit('close-modal');
        };
        const handleDeleteRecord = () => {
            context.emit('handle-delete');
        };

        return {
            entityType,
            entityTitle,
            // errorMessage,
            // hasError,

            closeModal,
            handleDeleteRecord,
        };
    },
});
</script>
  <!-- src="@/styles/_actionlist-modal.scss" -->
<style lang="scss" scoped ></style>
  
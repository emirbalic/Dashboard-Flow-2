<template>
    <!-- <div class="settings-screen"> -->
        <header>
            <div class="title">
                Reporting/Products
            </div>
        </header>


        <div class="body">
            <h1>Hi, this is products</h1>

        </div>
    <!-- </div> -->
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
    components: {

    },
    setup() {

        const store = useStore();


        return {

        }
    }
})
</script>

<style lang="scss" scoped></style>
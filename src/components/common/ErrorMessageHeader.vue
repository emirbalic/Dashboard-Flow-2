<template>
    <div class="message-wrapper">
        <Error_Icon class="icon"></Error_Icon>
        <p>{{ message }}</p>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Error_Icon from '@/assets/icons/Error_Icon.vue';

export default defineComponent({

    props:{
        message:{
            typeof: String,
            default: ""
        }
    },
    components:{
        Error_Icon
    },
})
</script>

<style lang="scss" scoped>
.message-wrapper{
    display: flex;
    flex-direction: row;
    margin-bottom: 20px !important;
    padding: 10px 15px;
    background-color: #F5DDDD;
    .icon{
        margin-top: 2px;
    }
    p{
        margin-left: 15px;
        font-family: 'IBM Plex Sans';
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        color: #F60C0C;
    }
}
</style>
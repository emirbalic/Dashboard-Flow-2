<template>
    <div class="tabs">
        <input v-for="(tab, i) in tabs" :key="i" type="radio" :id="tab" class="option" @click="selectedTab = tab; $emit('tabChange', tab)">
        <label v-for="(tab, i) in tabs" :key="i" :for="tab" :class="selectedTab === tab ? 'checked':''">{{ tab }}</label>
    </div>
    <slot></slot>
</template>

<script lang="ts">
import { defineComponent, provide, ref} from 'vue'
export default defineComponent({
    emits:['tabChange'],
    setup(_, {emit, slots }) {
        const tabs = ref(slots.default!().map((tab) => tab.props!.title))
        const selectedTab = ref(tabs.value[0])

        const changeTab = (tab: any) =>{
            emit('tabChange')
        }

        provide("selectedTab", selectedTab)
        return{
            selectedTab,
            tabs,

            changeTab
        }
    },
})
</script>

<style lang="scss" scoped>

.tabs{
    border-bottom: 1px solid #E0E0E0;
    margin-bottom: 24px;
    font-family: "IBM Plex Sans", sans-serif;

    .option{
        opacity: 0;
        width: 0px !important;
        margin: 16px 0;
    }
    label{
        padding: 12px 8px;
        font-family: "IBM Plex Sans", sans-serif;
        font-size: 14px;
        color: #2D4059;
        opacity: 0.75;
        margin-right: 24px;
        cursor: pointer;
    }
    .checked{
        border-bottom: 4px solid #1CAEA1;        
        opacity: 1;
    }
}
</style>
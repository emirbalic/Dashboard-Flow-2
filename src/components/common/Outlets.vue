<template>
  <!-- <div class="tmp">  v-if="hasOutlets"-->

    <div class="outlets">
      <!-- <section class="modals">
        <component
          v-for="outlet in modals"
          :key="outlet.outlet_id"
          :is="outlet.component"
          :id="outlet.outlet_id"
          v-bind="outlet.props"
        ></component>
      </section> -->
      <section class="notices">
        <component
          v-for="outlet in notices"
          :key="outlet.outlet_id"
          :is="outlet.component"
          :id="outlet.outlet_id"
          v-bind="outlet.props"
        ></component>
      </section>
    </div>
  <!-- </div> -->
  </template>
  
  <script lang="ts">
  import { computed, defineComponent } from 'vue';
  
  import { getOutlets } from '@/visuals';
  
  export default defineComponent({
    props: {
      outlets: {
        type: Array,
        default: () => [],
      },
    },
    setup() {
      const outlets = computed<any>(() => getOutlets());
      // const hasOutlets = computed(() => Boolean(outlets.value.length));

      // 
      
  
      const notices = computed(() =>
        outlets.value.filter((outlet: any) => outlet.type === 'notice')
      );
      // const modals = computed(() =>
      //   outlets.value.filter((outlet: any) => outlet.type === 'modal')
      // );
      
      // console.log("notices >> ", notices);
  
      return {
        // hasOutlets,
        notices,
        // modals,
      };
    },
  });
  </script>

<style lang="scss" scoped >
@import "@/styles/components/visuals.scss";
</style>
  
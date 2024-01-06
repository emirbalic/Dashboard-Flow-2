<template>
  <!-- :class="[iconType ? `is-${type}` : '']" -->
    <div class="notice">
      <header>
       
        <Info_Icon v-if="iconType==='info'"/>
        <Error_Icon v-else/>

      </header>
      <div class="body">
        {{ message }}
      </div>
      <!-- v-if="hasClose" -->
      <button class="close button"  href @click.prevent="close">
        OK
      </button>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, computed, onMounted, ref } from 'vue';
  
  import { hideOutlet } from '@/visuals';

  import Error_Icon from '@/assets/icons/Error_Icon.vue';
  import Info_Icon from '@/assets/icons/Info_Icon.vue';

  
  export default defineComponent({
    components: {
      Error_Icon,
      Info_Icon
    },
    props: {
      id: {
        type: String,
        required: true,
      },
      type: {
        type: String,
        default: '',
      },
      message: {
        type: String,
        required: true,
      },
      indefinite: {
        type: Boolean,
        default: false,
      },
      duration: {
        type: Number,
        default: 3000,
      },
      // hasClose: {
      //   type: Boolean,
      //   default: true,
      // },
    },
    setup(props) {
      const timer = ref();

      const close = () => {
        hideOutlet(props.id);
        timer.value && clearTimeout(timer.value);
      };
  
      const iconType = computed(
        () =>
          ({
            error: 'exclamation',
            success: 'info',
          }[props.type] || 'success')
      );
      onMounted(() => {
        if (!props.indefinite) {
          timer.value = setTimeout(close, props.duration);
        }
      });
  
      return {
        iconType,
        close,
      };
    },
  });
  </script>
  

  <style lang="scss" scoped >
@import "@/styles/components/visuals.scss";
</style>
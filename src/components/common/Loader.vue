<template>
  <div class="loader">
    <!-- <div :class="[loaderSize]"> -->
    <spinner :height="spinnerSize!" :width="spinnerSize!" :color="color"></spinner>
    <span v-if="message !== null">
      {{ message }}
    </span>
  </div>
</template>
  
<script lang="ts">

import { computed, defineComponent, ref } from 'vue';
import Spinner from './Spinner.vue';

export default defineComponent({
  components: {
    Spinner
  },
  props: {
    message: {
      type: [String],
      default: '',
      required: false,
    },
    type: {
      type: [String],
      required: true,
    },
    color: {
      type: [String],
      required: true,
    },
  },
  setup(props) {

    const color = ref(props.color)

    const spinnerSize = computed(() =>

    ({
      small: 30,
      large: 100
    }[props.type])

    )

    return {
      spinnerSize,
      color
    };
  },
});
</script>
  
<style scoped> .loader {

   text-align: center;
   margin: auto
 }
</style>
  
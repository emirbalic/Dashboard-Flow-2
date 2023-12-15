<template>
    <div class="modal" @keyup.esc="$emit('close')">
      <div @click="$emit('close')" class="modal-background"></div>
      <slot class="modal-body"></slot>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  
  export default defineComponent({
    emits: ['close'],
    setup() {},
  });
  </script>
  
  <style scoped>
  .modal {
    z-index: 10000;
  }
  </style>
  
  
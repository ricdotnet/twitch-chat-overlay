<template>
  <div class="container">
    <slot/>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss">
  .container {
    @apply bg-transparent px-5 py-3;
  }
</style>

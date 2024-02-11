<template>
  <template v-if="tmiState.messages.length">
    <div v-for="(msg, index) of tmiState.messages" :key="index">
      <div class="message">
        <div class="message__username">
          <span :style="[resolveUserColor(msg.tags)]">{{ msg.username }}:</span> <span class="message__message" v-html="msg.content"></span>
        </div>
      </div>
    </div>
  </template>
</template>

<script setup lang="ts">
  import { useTmiClient } from '../../hooks/useTmiClient';

  const [tmiState] = useTmiClient();

  function resolveUserColor(tags: any): string {
    return `color: ${tags.color}`;
  }

  // defineExpose({ tmiState });
</script>

<style lang="scss">
  .message {
    @apply bg-transparent text-lg;

    &__username {
      @apply mr-2;
    }

    &__message {
      @apply inline text-white;

      img {
        @apply w-10 ml-0.5;
      }
    }
  }
</style>

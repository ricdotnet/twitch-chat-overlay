<template>
  <template v-if="tmiState.messages.length">
    <div v-for="(msg, index) of tmiState.messages" :key="index">
      <div class="message">
        <div class="message__username" :style="[resolveUserColor(msg.tags)]">{{
            msg.username
          }}:
        </div>
        <div>{{ msg.content }}</div>
      </div>
    </div>
  </template>
</template>

<script setup lang="ts">
  import { useTmiClient } from './hooks/useTmiClient';

  const [tmiState] = useTmiClient();

  function resolveUserColor(tags: any): string {
    return `color: ${tags.color}`;
  }

  // defineExpose({ tmiState });
</script>

<style lang="scss">
  .message {
    @apply bg-white text-4xl flex;

    &__username {
      @apply mr-2;
    }

    &__message {
    }
  }
</style>

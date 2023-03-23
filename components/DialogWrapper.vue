<script setup lang="ts">
</script>

<template>
  <ClientOnly>
    <Teleport to="body">
      <Transition name="fade-in">
        <slot />
      </Transition>
    </Teleport>
  </ClientOnly>
</template>

<style scoped>
.fade-in-enter-active,
.fade-in-leave-active {
  transition: opacity 0.5s ease;
}

.fade-in-enter-from,
.fade-in-leave-to {
  opacity: 0;
}
</style>

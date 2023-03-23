<script setup lang="ts">
defineEmits<{
  (e: 'toggleMobileMenu'): void
}>()
</script>

<template>
  <div
    class="
  bg-app-2 h-12 flex px-4 py-2 lg:justify-center items-center text-xl sm:text-2xl text-app-4 relative
  "
  >
    <button class="flex items-center justify-center lg:hidden hover:text-app-4/70 cursor-pointer transition-all duration-300 outline-none" @click="$emit('toggleMobileMenu')">
      <Icon name="charm:menu-hamburger" size="1.6rem" />
    </button>
    <div class="flex-1 flex justify-center items-center">
      <NuxtLink
        :to="{
          name: 'index',
        }"
      >
        <div class="hover:text-app-4/70 hover:cursor-pointer transition-all duration-300">
          <Icon class="mr-2.5 w-6 h-6 sm:w-8 sm:h-8" name="ep:wind-power" />風向，疑？
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>

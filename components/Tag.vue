<script setup lang="ts">
defineProps<{
  tagName?: string
}>()
</script>

<template>
  <div class="py-[0.2rem] px-[0.7rem] text-sm bg-app-1 text-app-4 rounded-full cursor-pointer hover:text-app-4/[0.85] transition-all">
    <div v-if="tagName" class="flex items-center gap-1">
      <Icon name="akar-icons:cross" />
      {{ tagName }}
    </div>
    <div v-else class="flex items-center gap-1">
      <Icon name="ic:outline-add" size="1.2rem" />
      New Tag
    </div>
  </div>
</template>

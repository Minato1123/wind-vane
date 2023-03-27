<script setup lang="ts">
defineProps<{
  infoContent: string
  onlyRead?: boolean
}>()

defineEmits<{
  (e: 'handleCancel'): void
  (e: 'handleConfirm'): void
}>()
</script>

<template>
  <div class="w-full h-full bg-black/50 absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
    <div class="w-11/12 sm:w-[20rem] min-h-[10rem] border-app-4/50 border-2 bg-app-3 p-6 rounded-xl flex flex-col items-center justify-between">
      <div class="text-app-8">
        {{ infoContent }}
      </div>
      <div class="w-full flex justify-around">
        <button v-if="!onlyRead" class="bg-app-4 hover:bg-app-4/70 transition-all duration-200 text-app-3 px-4 py-1 rounded-lg" @click="$emit('handleCancel')">
          取消
        </button>
        <button class="bg-app-5 hover:bg-app-5/70 transition-all duration-200 text-app-8 px-4 py-1 rounded-lg" @click="$emit('handleConfirm')">
          確定
        </button>
      </div>
    </div>
  </div>
</template>

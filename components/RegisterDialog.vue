<script setup lang="ts">
import { OnClickOutside } from '@vueuse/components'
defineEmits<{
  (e: 'closeRegisterDialog'): void
  (e: 'switchToLoginDialog'): void
}>()
</script>

<template>
  <div class="w-full h-full bg-black/50 absolute inset-1/2 -translate-x-1/2 -translate-y-1/2">
    <OnClickOutside @trigger="$emit('closeRegisterDialog')">
      <div class="w-11/12 sm:w-[30rem] pt-5 pb-8 px-6 h-1/2 rounded-xl bg-app-3 absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col justify-between items-center">
        <div class="w-full flex justify-end items-center text-app-4">
          <Icon class="hover:text-app-8 transition-all duration-200 cursor-pointer" name="akar-icons:cross" size="1.5rem" @click="$emit('closeRegisterDialog')" />
        </div>
        <div class="text-app-8 text-2xl">
          註冊
        </div>
        <div class="w-5/6">
          <div class="text-app-8 mb-2">
            電子信箱
          </div>
          <input type="text" class="w-full bg-app-4  text-app-3 rounded-lg outline-none px-2 py-1">
        </div>
        <div class="w-5/6">
          <div class="text-app-8 mb-2">
            密碼
          </div>
          <input type="password" class="w-full bg-app-4  text-app-3 rounded-lg outline-none px-2 py-1">
        </div>
        <button class="underline text-app-4" @click="$emit('switchToLoginDialog')">
          登入
        </button>
        <button class="bg-app-5 text-app-8 rounded-lg outline-none px-4 py-1 hover:bg-app-5/70 hover:text-app-8/70 transition-all duration-200">
          註冊
        </button>
      </div>
    </OnClickOutside>
  </div>
</template>

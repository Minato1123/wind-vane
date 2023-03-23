<script setup lang="ts">
import { OnClickOutside } from '@vueuse/components'

const emit = defineEmits<{
  (e: 'openLoginDialog'): void
  (e: 'closeMobileMenu'): void
}>()

const isUserLogined = ref(false)

function handleClickLoginBtn() {
  emit('closeMobileMenu')
  emit('openLoginDialog')
}
</script>

<template>
  <OnClickOutside @trigger="$emit('closeMobileMenu')">
    <div v-if="isUserLogined" class="h-full p-4 bg-app-4/90 text-app-3 gap-4 shadow-2xl flex flex-col items-center">
      <button class="w-full flex justify-end items-center hover:text-app-8/80 transition-all duration-300 cursor-pointer" @click="$emit('closeMobileMenu')">
        <Icon name="mdi:arrow-collapse-left" size="1.5rem" />
      </button>
      <NuxtLink
        :to="{
          name: 'profile',
        }"
        @click="$emit('closeMobileMenu')"
      >
        <div class="flex items-center justify-center gap-4 hover:text-app-8/80 transition-all duration-300">
          <div class="bg-app-3 rounded-full w-12 h-12 flex items-center justify-center">
            <Icon class="text-app-8" name="ic:round-person" size="1.8rem" />
          </div>
          個人資料
        </div>
      </NuxtLink>
      <div class="h-[0.1rem] w-11/12 bg-app-3" />
      <NuxtLink
        :to="{
          name: 'responsedPost',
        }"
        class="hover:text-app-8/80 transition-all duration-300"
        @click="$emit('closeMobileMenu')"
      >
        已表態貼文
      </NuxtLink>
      <NuxtLink
        :to="{
          name: 'savedPost',
        }"
        class="hover:text-app-8/80 transition-all duration-300"
        @click="$emit('closeMobileMenu')"
      >
        已儲存貼文
      </NuxtLink>
      <button class="hover:text-app-8/80 transition-all duration-300" @click="$emit('closeMobileMenu')">
        登出
      </button>
      <a target="_blank" href="https://github.com/Minato1123" class="w-full flex justify-center items-center gap-3 mt-8 text-app-3 border-2 rounded-md border-app-3 border-dashed hover:text-app-8/80 transition-all duration-300 cursor-pointer p-2">
        GitHub
        <Icon name="bi:github" size="1.5rem" />
      </a>
    </div>
    <div v-else class="w-full h-full p-5 bg-app-4/90 shadow-2xl flex flex-col items-center gap-4">
      <button class="w-full flex justify-end items-center hover:text-app-8/80 transition-all duration-300 cursor-pointer" @click="$emit('closeMobileMenu')">
        <Icon name="mdi:arrow-collapse-left" size="1.5rem" />
      </button>
      <button class="w-full flex justify-center items-center gap-6 hover:text-app-8/80 transition-all duration-300 cursor-pointer" @click="handleClickLoginBtn">
        <div class="bg-app-3 rounded-full w-12 h-12 flex items-center justify-center">
          <Icon class="text-app-8" name="material-symbols:question-mark-rounded" size="1.5rem" />
        </div>
        登入／註冊
      </button>
      <a target="_blank" href="https://github.com/Minato1123" class="w-full flex justify-center items-center gap-3 mt-8 text-app-3 border-2 rounded-md border-app-3 border-dashed hover:text-app-8/80 transition-all duration-300 cursor-pointer p-2">
        GitHub
        <Icon name="bi:github" size="1.5rem" />
      </a>
    </div>
  </OnClickOutside>
</template>

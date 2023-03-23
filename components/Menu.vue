<script setup lang="ts">
defineEmits<{
  (e: 'openLoginDialog'): void
}>()
const isUserLogined = ref(false)
</script>

<template>
  <div class="bg-app-3 text-app-4 hidden lg:block rounded-xl p-3">
    <div v-if="isUserLogined" class="w-full flex flex-col gap-4">
      <NuxtLink
        class="w-full flex flex-col gap-2 items-center justify-center hover:text-app-8 transition-all duration-200"
        :to="{
          name: 'profile',
        }"
      >
        <div class="bg-app-4 rounded-full h-12 w-12 text-app-8 flex items-center justify-center">
          <Icon name="ic:round-person" size="2rem" />
        </div>
        <div>個人資料</div>
      </NuxtLink>
      <NuxtLink
        class="hover:text-app-8 transition-all duration-200"
        :to="{
          name: 'responsedPost',
        }"
      >
        已表態貼文
      </NuxtLink>
      <NuxtLink
        class="hover:text-app-8 transition-all duration-200"
        :to="{
          name: 'savedPost',
        }"
      >
        已儲存貼文
      </NuxtLink>
      <button class="hover:text-app-8 transition-all duration-200" @click="isUserLogined = false">
        登出
      </button>
    </div>
    <button v-else class="w-full flex flex-col gap-2 items-center justify-center cursor-pointer hover:text-app-8 transition-all duration-200 outline-none" @click="$emit('openLoginDialog')">
      <div class="bg-app-4 rounded-full h-12 w-12 text-app-8 flex items-center justify-center">
        <Icon name="material-symbols:question-mark-rounded" size="2rem" />
      </div>
      <div>登入／註冊</div>
    </button>
  </div>
</template>

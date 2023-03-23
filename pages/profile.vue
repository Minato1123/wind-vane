<script setup lang="ts">
useHead({
  title: '個人資料｜風向，疑？',
})
</script>

<template>
  <div class="bg-app-3 w-full sm:w-[30rem] min-h-[24rem] flex flex-col items-center justify-between py-8 rounded-xl m-auto mt-8">
    <div class="text-app-8 text-xl">
      個人資料修改
    </div>
    <div class="w-3/5">
      <div class="text-app-8 mb-2">
        *原電子信箱
      </div>
      <input type="text" class="w-full h-8 bg-app-4 text-app-3 rounded-lg outline-none pl-2">
    </div>
    <div class="w-3/5">
      <div class="text-app-8 mb-2">
        *新電子信箱
      </div>
      <input type="text" class="w-full h-8 bg-app-4 text-app-3 rounded-lg outline-none pl-2">
    </div>
    <button class="bg-app-5 text-app-8 rounded-lg py-1 px-4 outline-none hover:bg-app-5/70 hover:text-app-8/70 transition-all duration-200">
      儲存修改
    </button>
    <button class="text-app-7 underline">
      刪除帳號
    </button>
  </div>
</template>

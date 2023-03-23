<script setup lang="ts">
useHead({
  title: '首頁｜風向，疑？',
})
</script>

<template>
  <div class="h-full w-full py-4 flex flex-col items-center gap-8 overflow-y-auto">
    <SearchBar />
    <NewPost />
    <Post />
    <Post />
    <Post />
    <Post />
  </div>
</template>

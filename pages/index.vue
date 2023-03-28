<script setup lang="ts">
import { useUserStore } from '../stores/user'
import { useGetPosts } from '~~/composables/api/useGetPosts'

useHead({
  title: '首頁｜風向，疑？',
})
const { isLoggedin } = storeToRefs(useUserStore())
const { pending, data, refresh } = useGetPosts()
</script>

<template>
  <div class="h-full w-full pt-4 pb-12 flex flex-col items-center gap-8 overflow-y-auto">
    <div v-if="pending">
      Loading...
    </div>
    <div v-else class="flex flex-col items-center gap-8">
      <SearchBar />
      <NewPost v-if="isLoggedin" @refresh-page="refresh" />
      <div v-if="data" class="flex flex-col items-center gap-8">
        <Post
          v-for="post in data?.data"
          :key="post.id" :post="{
            postId: post.id,
            userId: post.userId,
            content: post.content,
            question: post.question,
            createdTime: post.createdTime,
          }"
          @refresh-page="refresh"
        />
      </div>
    </div>
    <div class="text-app-4/50 text-lg">
      沒有更多內容囉～
    </div>
  </div>
</template>

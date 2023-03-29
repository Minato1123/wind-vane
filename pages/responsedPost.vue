<script setup lang="ts">
import { useUserStore } from '../stores/user'
import { useGetPostsByResponse } from '~~/composables/api/useGetPostsByResponse'
useHead({
  title: '已表態貼文｜風向，疑？',
})

definePageMeta({
  middleware: 'auth',
})

const { userToken } = storeToRefs(useUserStore())
const { pending, data } = useGetPostsByResponse({
  token: userToken,
})
</script>

<template>
  <div class="h-full w-full py-4 flex flex-col items-center gap-8 overflow-y-auto">
    <div v-if="pending || data?.data == null || data.data.length === 0" class="text-app-4/50 text-xl my-auto">
      目前還沒有對任何貼文表態過呢！
    </div>
    <div v-else class="flex flex-col items-center gap-8">
      <Post
        v-for="post in data?.data" :key="post.id" :post="{
          postId: post.id,
          userId: post.userId,
          content: post.content,
          question: post.question,
          createdTime: post.createdTime,
        }"
      />
    </div>
  </div>
</template>

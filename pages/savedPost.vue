<script setup lang="ts">
import { useUserStore } from '../stores/user'

useHead({
  title: '已儲存貼文｜風向，疑？',
})

const { userToken } = storeToRefs(useUserStore())

const { pending, data, refresh } = useLazyFetch('/api/posts', {
  headers: [['access-token', userToken.value]],
  query: { type: 'savedPost' },
  method: 'GET',
})
</script>

<template>
  <div class="h-full w-full py-4 flex flex-col items-center gap-8 overflow-y-auto">
    <div v-if="pending || data?.data == null || data.data.length === 0" class="text-app-4/50 text-xl my-auto">
      目前沒有已儲存的貼文ㄛ！
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
        @refresh-saved-page="refresh"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useGetPostByPostId } from '~~/composables/api/useGetPostByPostId'

const route = useRoute()
const { pending, data } = useGetPostByPostId({ postId: route.params.postId as string })
</script>

<template>
  <div class="h-full w-full pt-4 pb-12 flex flex-col items-center gap-8 overflow-y-auto">
    <div v-if="pending">
      Loading...
    </div>
    <div v-else class="flex flex-col items-center gap-8">
      <div v-if="data?.data" class="flex flex-col items-center gap-8">
        <Post
          :post="{
            postId: data.data.id,
            userId: data.data.userId,
            content: data.data.content,
            question: data.data.question,
            createdTime: data.data.createdTime,
          }"
        />
      </div>
    </div>
  </div>
</template>

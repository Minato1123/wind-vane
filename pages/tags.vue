<script setup lang="ts">
// import { useGetPostsByTags } from '~~/composables/api/useGetPostsByTags'

// const tags: string[] = []
// const { pending, data } = useGetPostsByTags({
//   tags,
// })
</script>

<template>
  <div class="h-full w-full pt-4 pb-12 flex flex-col items-center gap-8 overflow-y-auto">
    <!-- <div v-if="pending">
      Loading...
    </div>
    <div v-else class="flex flex-col items-center gap-8">
      <div v-if="data?.data" class="flex flex-col items-center gap-8">
        <Post
          v-for="post in data?.data" :key="post.id" :post="{
            postId: post.id,
            content: post.content,
            question: post.question,
            createdTime: post.createdTime,
            positive: post.numOfPositive,
            negative: post.numOfNegative,
          }"
        />
      </div>
    </div> -->
  </div>
</template>

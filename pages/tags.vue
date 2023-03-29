<script setup lang="ts">
import { useGetPostsByTags } from '~~/composables/api/useGetPostsByTags'

const route = useRoute()
const tags = computed(() => String(route.query.tags))
const { pending, data, execute } = useGetPostsByTags({
  tags,
})

watch(tags, () => {
  execute()
})
</script>

<template>
  <div class="h-full w-full pt-4 pb-12 flex flex-col items-center gap-8 overflow-y-auto">
    <SearchBar />
    <div class="w-full pl-4 sm:pl-0 sm:w-[40rem] my-2 text-app-4 flex justify-start">
      以下是 <span class="text-app-6 mx-2">{{ tags }}</span> 的搜尋結果：
    </div>
    <div v-if="pending">
      Loading...
    </div>
    <div v-else class="w-full sm:w-[40rem] flex flex-col items-center gap-8">
      <div v-if="data?.data != null" class="w-full flex flex-col items-center gap-8">
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
  </div>
</template>

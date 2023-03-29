<script setup lang="ts">
import { useGetPostsByTags } from '~~/composables/api/useGetPostsByTags'

const route = useRoute()
const tags = computed(() => String(route.query.tags))

const root = ref(null)
const target = ref(null)
const isVisible = ref(false)

useIntersectionObserver(
  target,
  ([{ isIntersecting }]) => {
    isVisible.value = isIntersecting
  },
  { root },
)

const partNumber = ref(0)
const postPerPart = ref(3)
const isEndOfPost = ref(false)

interface PostType {
  id: string
  userId: number
  content: string | null
  question: string
  createdTime: string
  deleted: boolean
}

const postList = ref<PostType[]>([])
const { pending, data, execute } = await useGetPostsByTags({
  tags,
  partNumber,
  postPerPart,
})

postList.value.push(...data.value?.data ?? [])

watch(pending, () => {
  if (pending.value === true)
    return

  if (data.value == null || data.value.data == null)
    return

  if (data.value.data.length < 1) {
    isEndOfPost.value = true
    return
  }

  postList.value.push(...data.value.data)
})

watch(isVisible, () => {
  if (isVisible.value === false || isEndOfPost.value === true)
    return

  partNumber.value = partNumber.value + postPerPart.value
})

watch(tags, () => {
  execute()
})
</script>

<template>
  <div ref="root" class="h-full w-full pt-4 pb-12 flex flex-col items-center gap-8 overflow-y-auto">
    <SearchBar />
    <div class="w-full pl-4 sm:pl-0 sm:w-[40rem] my-2 text-app-4 flex justify-start">
      以下是 <span class="text-app-6 mx-2">{{ tags }}</span> 的搜尋結果：
    </div>
    <div class="w-full sm:w-[40rem] flex flex-col items-center gap-8">
      <div v-if="data?.data != null" class="w-full flex flex-col items-center gap-8">
        <Post
          v-for="post in postList" :key="post.id" :post="{
            postId: post.id,
            userId: post.userId,
            content: post.content,
            question: post.question,
            createdTime: post.createdTime,
          }"
        />
        <div ref="target" />
      </div>
    </div>
  </div>
</template>

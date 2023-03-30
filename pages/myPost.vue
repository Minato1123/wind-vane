<script setup lang="ts">
import { useUserStore } from '../stores/user'
import { useGetPostByUserId } from '~~/composables/api/useGetPostByUserId'
useHead({
  title: '我的貼文｜風向，疑？',
})

definePageMeta({
  middleware: 'auth',
})

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

const { userToken } = storeToRefs(useUserStore())

const postList = ref<PostType[]>([])
const { pending, data, refresh } = await useGetPostByUserId({
  token: userToken,
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
</script>

<template>
  <div ref="root" class="h-full w-full py-4 flex flex-col items-center gap-8 overflow-y-auto">
    <div v-if="postList.length === 0" class="text-app-4/50 text-xl my-auto">
      目前還沒有發過貼文喔！
    </div>
    <div v-else class="w-full flex flex-col items-center gap-8">
      <Post
        v-for="post in postList" :key="post.id" :post="{
          postId: post.id,
          userId: post.userId,
          content: post.content,
          question: post.question,
          createdTime: post.createdTime,
        }"
        @refresh-page="refresh"
      />
    </div>
    <div ref="target" />
  </div>
</template>

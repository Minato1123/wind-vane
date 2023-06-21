<script setup lang="ts">
import { useIntersectionObserver } from '@vueuse/core'
import { useUserStore } from '../stores/user'
import { useGetPosts } from '~~/composables/api/useGetPosts'

useHead({
  title: '首頁｜風向，疑？',
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

const { isLoggedin } = storeToRefs(useUserStore())

const postList = ref<PostType[]>([])
const { pending, data, refresh } = await useGetPosts({
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

  if (postList.value.length <= 0)
    return

  partNumber.value = partNumber.value + postPerPart.value
})

function handleNewPostRefresh() {
  postList.value = []
  partNumber.value = 0
  isEndOfPost.value = false
  refresh({ dedupe: true })
}
</script>

<template>
  <div ref="root" class="h-full w-full pt-4 pb-12 flex flex-col items-center gap-8 overflow-y-auto">
    <div class="w-full flex flex-col items-center gap-8">
      <SearchBar />
      <NewPost
        v-if="isLoggedin" @refresh-page="handleNewPostRefresh"
      />
      <div class="w-full flex flex-col items-center gap-8">
        <Post
          v-for="post in postList"
          :key="post.id" :post="{
            postId: post.id,
            userId: post.userId,
            content: post.content,
            question: post.question,
            createdTime: post.createdTime,
          }"
          @refresh-page="handleNewPostRefresh"
        />
      </div>
    </div>
    <div ref="target" class="text-app-4/50 text-lg">
      沒有更多內容囉～
    </div>
  </div>
</template>

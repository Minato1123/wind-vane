<script setup lang="ts">
import { useUserStore } from '../stores/user'

const props = defineProps<{
  post: {
    postId: string
    userId: number
    content: string | null
    question: string
    createdTime: string
  }
}>()

const emit = defineEmits<{
  (e: 'refreshPage'): void
  (e: 'refreshSavedPage'): void
}>()

const { userToken, userId, isLoggedin } = storeToRefs(useUserStore())
const deletePostCheck = ref(false)

const { pending: tagPending, data: tagData } = useLazyFetch('/api/tags', {
  query: {
    postId: props.post.postId,
  },
  method: 'GET',
})

const postedTime = computed(() => {
  const time = new Date(+props.post.createdTime)
  return `${time.getFullYear()}/${time.getMonth() + 1}/${time.getDate()} ${time.getHours()}:${time.getMinutes()}`
})

const { pending: responsePending, data: responseData, execute: responseExecute } = useLazyAsyncData(
  props.post.postId,
  () => $fetch(`/api/responses/${props.post.postId}`, {
    headers: [['access-token', userToken.value]],
    method: 'GET',
  }),
  {
    server: false,
    immediate: false,
  })

const { pending: checkSavedPending, data: checkSavedData, execute: checkSavedExecute } = useLazyAsyncData(`chechSaved-${props.post.postId}`, () => $fetch(`/api/savedPosts/${props.post.postId}`, {
  headers: [['access-token', userToken.value]],
  method: 'GET',
}), {
  server: false,
  immediate: false,
})

const response = ref<'positive' | 'negative' | null>(null)
const isSavedPost = ref<boolean | null>(null)

watch(isLoggedin, () => {
  if (isLoggedin.value) {
    checkSavedExecute()
    responseExecute()
  }

  else if (isLoggedin.value === false) {
    response.value = null
  }
}, {
  immediate: true,
})

watch(responsePending, () => {
  if (responsePending.value === false)
    response.value = responseData.value?.data?.response ?? null
})

watch(checkSavedPending, () => {
  if (checkSavedPending.value === false)
    isSavedPost.value = checkSavedData.value?.data?.isSavedPost ?? null
})

const { execute: responsePositiveExecute } = useLazyAsyncData(`response-positive-${props.post.postId}`, () => $fetch('/api/responses', {
  headers: [['access-token', userToken.value]],
  body: {
    postId: props.post.postId,
    response: 'positive',
  },
  method: 'POST',
}), {
  server: false,
  immediate: false,
})

const { execute: responseNegativeExecute } = useLazyAsyncData(`response-negative-${props.post.postId}`, () => $fetch('/api/responses', {
  headers: [['access-token', userToken.value]],
  body: {
    postId: props.post.postId,
    response: 'negative',
  },
  method: 'POST',
}), {
  server: false,
  immediate: false,
})

const { execute: changeResponseToPositiveExecute } = useLazyAsyncData(`change-response-to-positive-${props.post.postId}`, () => $fetch(`/api/responses/${props.post.postId}`, {
  headers: [['access-token', userToken.value]],
  body: {
    response: 'positive',
  },
  method: 'PATCH',
}), {
  server: false,
  immediate: false,
})

const { execute: changeResponseToNegativeExecute } = useLazyAsyncData(`change-response-to-negative-${props.post.postId}`, () => $fetch(`/api/responses/${props.post.postId}`, {
  headers: [['access-token', userToken.value]],
  body: {
    response: 'negative',
  },
  method: 'PATCH',
}), {
  server: false,
  immediate: false,
})

const { execute: deleteResponseExecute } = useLazyAsyncData(`delete-response-${props.post.postId}`, () => $fetch(`/api/responses/${props.post.postId}`, {
  headers: [['access-token', userToken.value]],
  method: 'DELETE',
}), {
  server: false,
  immediate: false,
})

function handleResponsePositive() {
  if (isLoggedin.value === false)
    return
  if (response.value == null)
    responsePositiveExecute()
  else if (response.value === 'positive')
    deleteResponseExecute()
  else
    changeResponseToPositiveExecute()

  responseExecute()
}

function handleResponseNegative() {
  if (isLoggedin.value === false)
    return
  if (response.value == null)
    responseNegativeExecute()
  else if (response.value === 'negative')
    deleteResponseExecute()
  else
    changeResponseToNegativeExecute()

  responseExecute()
}

const { data: positiveData } = useLazyFetch(`/api/numOfResponses/${props.post.postId}`, {
  query: {
    response: 'positive',
  },
  method: 'GET',
  watch: [response],
})

const { data: negativeData } = useLazyFetch(`/api/numOfResponses/${props.post.postId}`, {
  query: {
    response: 'negative',
  },
  method: 'GET',
  watch: [response],
})

const { execute: deletePostExecute } = useLazyAsyncData(`delete-post-${props.post.postId}`, () => $fetch(`/api/posts/${props.post.postId}`, {
  headers: [['access-token', userToken.value]],
  method: 'DELETE',
}), {
  server: false,
  immediate: false,
})

function handleDeletePost() {
  deletePostExecute()
  deletePostCheck.value = false
  emit('refreshPage')
}

const { pending: savePostPending, execute: savePost } = useLazyAsyncData(`save-post-${props.post.postId}`, () => $fetch('/api/savedPosts', {
  headers: [['access-token', userToken.value]],
  body: {
    postId: props.post.postId,
  },
  method: 'POST',
}), {
  server: false,
  immediate: false,
})

const { pending: deleteSavedPostPending, execute: deleteSavedPost } = useLazyAsyncData(`delete-saved-post-${props.post.postId}`, () => $fetch(`/api/savedPosts/${props.post.postId}`, {
  headers: [['access-token', userToken.value]],
  method: 'DELETE',
}), {
  server: false,
  immediate: false,
})

watch([savePostPending, deleteSavedPostPending], () => {
  if (savePostPending.value === false || deleteSavedPostPending.value === false) {
    checkSavedExecute()
    emit('refreshSavedPage')
  }
})
</script>

<template>
  <div class="w-full sm:w-[40rem] bg-app-3 sm:rounded-xl">
    <div class="bg-app-2 sm:rounded-tl-xl sm:rounded-tr-xl w-full h-10 flex items-center justify-between">
      <div class="sm:rounded-tl-xl sm:rounded-tr-xl sm:w-1/6 w-1/3 h-full bg-app-3 text-app-4 tracking-wider text-lg flex justify-center items-center">
        {{ post.postId }}
      </div>
      <div class="text-app-4 text-xs">
        {{ postedTime }}
      </div>
      <div class="flex items-center pr-2 text-lg">
        <div
          v-if="positiveData && positiveData.data && negativeData && negativeData.data && positiveData.data.numOfResponse > negativeData.data.numOfResponse"
          class="text-app-6 mr-4 flex items-center"
        >
          <Icon name="clarity:flag-solid" class="mr-2" />順風
        </div>
        <div
          v-else-if="positiveData && positiveData.data && negativeData && negativeData.data && positiveData.data.numOfResponse < negativeData.data.numOfResponse"
          class="text-app-7 mr-4 flex items-center"
        >
          <Icon name="clarity:flag-solid" class="mr-2" />逆風
        </div>
        <div v-else class="text-app-4 mr-4 flex items-center">
          <Icon name="fa6-regular:hand-peace" class="mr-2" />無風
        </div>
        <VDropdown :distance="6" placement="right-start" :hide-triggers="['click']">
          <button><Icon class="text-app-4 cursor-pointer hover:text-app-4/80" name="ic:outline-more-vert" /></button>
          <template #popper>
            <div class="p-1 flex flex-col justify-center items-center text-app-3">
              <button v-if="isLoggedin && isSavedPost === false" class="w-full px-4 py-2 hover:bg-app-4/30 hover:rounded-lg transition-all duration-300" @click="savePost()">
                儲存貼文
              </button>
              <button v-if="isLoggedin && isSavedPost === true" class="w-full px-4 py-2 hover:bg-app-4/30 hover:rounded-lg transition-all duration-300" @click="deleteSavedPost()">
                取消儲存
              </button>
              <button v-if="userId === post.userId" class="w-full px-4 py-2 hover:bg-app-4/30 hover:rounded-lg transition-all duration-300" @click="deletePostCheck = true">
                刪除貼文
              </button>
              <button v-if="userId !== post.userId" class="w-full px-4 py-2 hover:bg-app-4/30 hover:rounded-lg transition-all duration-300">
                檢舉
              </button>
            </div>
          </template>
        </VDropdown>
      </div>
    </div>
    <div class="p-4 w-full">
      <div class="text-app-4 pb-4 min-h-[4rem]" v-html="post.content" />
      <div v-if="tagData && !tagPending" class="text-app-8/50 text-sm pb-2 flex items-center gap-2">
        <div v-for="tag in tagData.data" :key="`tag-${tag.id}`" class="cursor-pointer hover:text-app-8/70 transition-all duration-300">
          #{{ tag.name }}
        </div>
      </div>
      <div class="bg-app-4 text-app-3 rounded-xl min-h-[4rem] flex items-center py-2 px-4">
        {{ post.question }}
      </div>
    </div>
    <div class="bg-app-4 mx-4 h-[0.1rem] m-auto" />
    <div class="flex text-app-4 py-2">
      <div
        class="hover:text-app-6 transition-all duration-200 w-2/6 flex justify-center items-center gap-3 cursor-pointer" :class="{
          'text-app-6': !responsePending && response === 'positive',
        }"
        @click="handleResponsePositive"
      >
        <Icon name="bx:bxs-like" size="1.5rem" />
        <span v-if="positiveData && positiveData.data">
          {{ positiveData.data.numOfResponse }}
        </span>
      </div>
      <div
        class="hover:text-app-7 transition-all duration-200 w-2/6 flex justify-center items-center gap-3 cursor-pointer" :class="{
          'text-app-7': !responsePending && response === 'negative',
        }"
        @click="handleResponseNegative"
      >
        <Icon name="bx:bxs-dislike" size="1.5rem" />
        <span v-if="negativeData && negativeData.data">
          {{ negativeData.data.numOfResponse }}
        </span>
      </div>
      <div class="hover:text-app-8 transition-all duration-200 w-2/6 flex justify-center items-center cursor-pointer">
        <Icon name="lucide:wind" size="1.5rem" />
      </div>
    </div>
    <DialogWrapper>
      <InfoDialog v-if="deletePostCheck" info-content="確定刪除此篇貼文？" :only-read="false" @handle-cancel="deletePostCheck = false" @handle-confirm="handleDeletePost" />
    </DialogWrapper>
  </div>
</template>

<script setup lang="ts">
import type { UseShareOptions } from '@vueuse/core'
import { useShare } from '@vueuse/core'
import { useUserStore } from '../stores/user'
import { useGetTagsByPostId } from '~~/composables/api/useGetTagsByPostId'
import { useGetUserResponseByPostId } from '~~/composables/api/useGetUserResponseByPostId'
import { useCheckPostSaved } from '~~/composables/api/useCheckPostSaved'
import { useRespondPositive } from '~~/composables/api/useRsepondPositive'
import { useRespondNegative } from '~~/composables/api/useRespondNegative'
import { useChangeResponseToPositive } from '~~/composables/api/useChangeResponseToPositive'
import { useChangeResponseToNegative } from '~~/composables/api/useChangeResponseToNegative'
import { useDeleteResponse } from '~~/composables/api/useDeleteResponse'
import { useGetPostPositiveCount } from '~~/composables/api/useGetPostPositiveCount'
import { useGetPostNegativeCount } from '~~/composables/api/useGetPostNegativeCount'
import { useDeletePost } from '~~/composables/api/useDeletePost'
import { useSavePost } from '~~/composables/api/useSavePost'
import { useDeleteSavedPost } from '~~/composables/api/useDeleteSavedPost'

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
const isOpenDeletePostCheckDialog = ref(false)
const isOpenReportDialog = ref(false)
const isOpenWarnLoginDialog = ref(false)

const { pending: tagPending, data: tagData } = useGetTagsByPostId({
  postId: props.post.postId,
})

const postedTime = computed(() => {
  const time = new Date(+props.post.createdTime)
  return `${time.getFullYear()}/${time.getMonth() + 1}/${time.getDate()} ${time.getHours()}:${time.getMinutes()}`
})

const { pending: responsePending, data: responseData, execute: responseExecute } = useGetUserResponseByPostId({
  token: userToken,
  postId: props.post.postId,
})

const { pending: checkSavedPending, data: checkSavedData, execute: checkSavedExecute } = useCheckPostSaved({
  token: userToken,
  postId: props.post.postId,
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
  if (responsePending.value === true)
    return

  response.value = responseData.value?.data?.response ?? null
})

watch(checkSavedPending, () => {
  if (checkSavedPending.value === false)
    isSavedPost.value = checkSavedData.value?.data?.isSavedPost ?? null
})

const { execute: respondPositiveExecute } = useRespondPositive({
  token: userToken,
  postId: props.post.postId,
})

const { execute: respondNegativeExecute } = useRespondNegative({
  token: userToken,
  postId: props.post.postId,
})

const { execute: changeResponseToPositiveExecute } = useChangeResponseToPositive({
  token: userToken,
  postId: props.post.postId,
})

const { execute: changeResponseToNegativeExecute } = useChangeResponseToNegative({
  token: userToken,
  postId: props.post.postId,
})

const { execute: deleteResponseExecute } = useDeleteResponse({
  token: userToken,
  postId: props.post.postId,
})

async function handleResponsePositive() {
  if (isLoggedin.value === false) {
    isOpenWarnLoginDialog.value = true
    return
  }

  if (response.value == null)
    await respondPositiveExecute()
  else if (response.value === 'positive')
    await deleteResponseExecute()
  else
    await changeResponseToPositiveExecute()

  responseExecute()
}

async function handleResponseNegative() {
  if (isLoggedin.value === false) {
    isOpenWarnLoginDialog.value = true
    return
  }

  if (response.value == null)
    await respondNegativeExecute()
  else if (response.value === 'negative')
    await deleteResponseExecute()
  else
    await changeResponseToNegativeExecute()

  responseExecute()
}

const { data: positiveData } = useGetPostPositiveCount({
  postId: props.post.postId,
  response,
})

const { data: negativeData } = useGetPostNegativeCount({
  postId: props.post.postId,
  response,
})

const { execute: deletePostExecute } = useDeletePost({
  postId: props.post.postId,
  token: userToken,
})

function handleDeletePost() {
  deletePostExecute()
  isOpenDeletePostCheckDialog.value = false
  emit('refreshPage')
}

const { pending: savePostPending, execute: savePost } = useSavePost({
  token: userToken,
  postId: props.post.postId,
})

const { pending: deleteSavedPostPending, execute: deleteSavedPost } = useDeleteSavedPost({
  token: userToken,
  postId: props.post.postId,
})

watch([savePostPending, deleteSavedPostPending], () => {
  if (savePostPending.value === false || deleteSavedPostPending.value === false) {
    checkSavedExecute()
    emit('refreshSavedPage')
  }
})

function handleTagNavigate(tag: string) {
  navigateTo({
    name: 'tags',
    query: {
      tags: tag,
    },
  })
}

function handlePostNavigate() {
  navigateTo(`/${props.post.postId}`)
}

const options = ref<UseShareOptions>({
  title: props.post.question,
  text: `${props.post.content}`,
  url: `http://localhost:3000/${props.post.postId}`,
})

const { share } = useShare(options)
const startShare = () => share().catch(err => err)
</script>

<template>
  <div class="w-full sm:w-[40rem] bg-app-3 sm:rounded-xl min-h-[20rem]">
    <div class="bg-app-2 sm:rounded-tl-xl sm:rounded-tr-xl w-full h-10 flex items-center justify-between">
      <div class="sm:rounded-tl-xl sm:rounded-tr-xl sm:w-1/6 w-1/3 h-full bg-app-3 text-app-4 hover:text-app-4/50 transition-all duration-300 cursor-pointer tracking-wider text-lg flex justify-center items-center" @click="handlePostNavigate">
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
              <button v-if="userId === post.userId" class="w-full px-4 py-2 hover:bg-app-4/30 hover:rounded-lg transition-all duration-300" @click="isOpenDeletePostCheckDialog = true">
                刪除貼文
              </button>
              <button v-if="userId !== post.userId" class="w-full px-4 py-2 hover:bg-app-4/30 hover:rounded-lg transition-all duration-300" @click="isOpenReportDialog = true">
                檢舉
              </button>
            </div>
          </template>
        </VDropdown>
      </div>
    </div>
    <div class="p-4 w-full">
      <div class="text-app-4 pb-4 min-h-[4rem]" v-html="post.content" />
      <div v-if="tagData && !tagPending" class="text-app-8/50 text-sm pb-2 flex items-center gap-2 flex-wrap">
        <div v-for="tag in tagData.data" :key="`tag-${tag.id}`" class="cursor-pointer hover:text-app-8/70 transition-all duration-300" @click="handleTagNavigate(tag.name)">
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
      <div class="hover:text-app-8 transition-all duration-200 w-2/6 flex justify-center items-center cursor-pointer" @click="startShare">
        <Icon name="lucide:wind" size="1.5rem" />
      </div>
    </div>
    <DialogWrapper>
      <InfoDialog v-if="isOpenDeletePostCheckDialog" info-content="確定刪除此篇貼文？" :only-read="false" @handle-cancel="isOpenDeletePostCheckDialog = false" @handle-confirm="handleDeletePost" />
    </DialogWrapper>
    <DialogWrapper>
      <InfoDialog v-if="isOpenReportDialog" info-content="確定檢舉此篇貼文？" :only-read="false" @handle-cancel="isOpenReportDialog = false" @handle-confirm="isOpenReportDialog = false" />
    </DialogWrapper>
    <DialogWrapper>
      <InfoDialog v-if="isOpenWarnLoginDialog" info-content="請先登入再進行操作喔！" :only-read="true" @handle-confirm="isOpenWarnLoginDialog = false" />
    </DialogWrapper>
  </div>
</template>

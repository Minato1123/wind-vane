<script setup lang="ts">
import { OnClickOutside } from '@vueuse/components'
import { useUserStore } from '../stores/user'
import { useAddPost } from '~~/composables/api/useAddPost'
import { useAddTag } from '~~/composables/api/useAddTag'
import { useAddTagsInPost } from '~~/composables/api/useAddTagsInPost'
const emit = defineEmits<{
  (e: 'refreshPage'): void
}>()
const { textarea, input } = useTextareaAutosize()
const { userToken } = storeToRefs(useUserStore())

const inputRef = ref<HTMLInputElement | null>(null)

watch(inputRef, () => {
  if (inputRef.value == null)
    return

  inputRef.value.focus()
})

const content = input
const question = ref('')
const tagList = ref<string[]>([])
const inputTag = ref('')
const isInputingTag = ref(false)

watch(() => question, () => question.value = question.value.replaceAll('\n', ''))
const bodyContent = computed(() => content.value.replaceAll('\n', '<br />'))

const { pending, data, execute } = useAddPost({
  token: userToken,
  content: bodyContent,
  question,
})

const { pending: addTagsPending, data: tagIdListData, execute: handleAddTag } = useAddTag({
  token: userToken,
  tags: tagList,
})

const tagIdList = ref<number[]>([])
const postId = ref<string>('')

const { pending: addTagsInPostPending, execute: handleAddTagInPost } = useAddTagsInPost({
  token: userToken,
  tagIdList,
  postId,
})

function handleSubmitPost() {
  if (question.value.trim() === '')
    return

  execute()
  handleAddTag()
}

watch(pending, () => {
  if (pending.value === true)
    return

  if (data.value?.success === false)
    return

  input.value = ''
  question.value = ''

  if (data.value == null || data.value.data == null)
    return

  postId.value = data.value.data.postId
})

watch(addTagsPending, () => {
  if (addTagsPending.value === true)
    return

  if (tagIdListData.value?.success === false)
    return

  if (tagIdListData.value == null || tagIdListData.value.data == null)
    return

  inputTag.value = ''
  tagList.value = []
  tagIdList.value = tagIdListData.value.data.tagIdList
  handleAddTagInPost()
}, {
  immediate: true,
})

watch(addTagsInPostPending, () => {
  if (addTagsInPostPending.value === true)
    return

  emit('refreshPage')
})

function addTag(e: KeyboardEvent) {
  if (e.isComposing)
    return

  tagList.value.push(inputTag.value)
  isInputingTag.value = false
  inputTag.value = ''
}
</script>

<template>
  <div class="w-full sm:w-[40rem] bg-app-3 sm:rounded-xl">
    <div class="bg-app-2 sm:rounded-tl-xl sm:rounded-tr-xl w-full h-10 flex items-center justify-between">
      <div class="sm:rounded-tl-xl sm:rounded-tr-xl w-2/5 sm:w-1/4 h-full bg-app-3 text-app-4 tracking-wider text-lg flex justify-center items-center gap-2">
        <Icon class="flex justify-center items-center" name="material-symbols:edit-square-outline-rounded" size="1.5rem" />新增貼文
      </div>
    </div>
    <div class="p-4 w-full">
      <textarea ref="textarea" v-model="input" placeholder="大風吹～ 吹什麼？" spellcheck="false" class="text-app-4 placeholder:text-app-4/50 mb-2 min-h-[5rem] w-full outline-none border-none bg-app-3 resize-none" />
      <div class="pb-2 flex items-center gap-2 flex-wrap">
        <OnClickOutside v-if="isInputingTag" @trigger="isInputingTag = false">
          <div class="py-[0.2rem] px-[0.7rem] text-sm text-app-4 bg-app-1 rounded-full flex items-center justify-between">
            <input ref="inputRef" v-model="inputTag" name="tag-input" class="bg-app-1 outline-none" @keydown.enter="addTag">
            <Icon name="ic:outline-new-label" size="1.2rem" class="cursor-pointer hover:text-app-4/50 transition-all duration-200" @click="addTag" />
          </div>
        </OnClickOutside>
        <Tag v-else @click="isInputingTag = true" />
        <Tag v-for="tag in tagList" :key="`tag-${tag}`" :tag-name="tag" />
      </div>
      <textarea v-model="question" rows="1" placeholder="主要問題" spellcheck="false" class="bg-app-4 text-app-3 placeholder:text-app-3/50 rounded-xl w-full flex items-center py-4 px-4 outline-none resize-none leading-normal" />
    </div>
    <div class="w-full flex items-center justify-end">
      <button class="flex items-center justify-center rounded-xl cursor-pointer bg-app-5 text-app-8 py-1 px-4 mx-4 mb-4 hover:bg-app-5/75 transition-all duration-300" @click="handleSubmitPost">
        測風向
      </button>
    </div>
  </div>
</template>
